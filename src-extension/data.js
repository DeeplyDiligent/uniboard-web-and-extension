import firebase from "firebase";
import he from "he";
import { transform } from "lodash";
import $ from "jquery";
/*global chrome*/

class Database {
  constructor() {
    console.log("constructor of data.js");
  }

  async getMoodleDataFromChromeStorage() {
    console.log("getting moodle data from chrome storage");
    let dataPromise = new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result) {
        let moodleBeastData = result["MoodleBeast"];
        let data = moodleBeastData;
        resolve(data);
      });
    });
    let moodleData = await dataPromise;

    let parseMoodleData = this.parseDataForApp(moodleData);

    console.log(parseMoodleData);
    return parseMoodleData;
  }

  async getSyncStatus(){
    let dataPromise = new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result) {
        let sendOnline = result["sendDataOnline"];
        resolve(sendOnline);
      });
    });
    return dataPromise;
  }

  parseDataForFirebase(moodleData) {
    var dataToSendOnline = { date: new Date() };

    Object.keys(moodleData).map(function(i, j) {
      let html = $(moodleData[i]["innerHTML"]);
      dataToSendOnline[i] = {};
      html.find("p .item-content-wrap").each(function() {
        let childrenIds = $(this)
          .parent()
          .parent()
          .parent()
          .children("ul")
          .children("li")
          .children("p")
          .toArray()
          .map(function(k) {
            return k.id;
          });

        let elemId = $(this)
          .parent()
          .parent()
          .attr("id");
        elemId = elemId ? elemId : "no_id";

        let imgHref = $(this)
          .siblings("img")
          .attr("src");
        imgHref = imgHref ? imgHref : null;

        let imgAlt = $(this)
          .siblings("img")
          .attr("alt");
        imgAlt = imgAlt ? imgAlt : null;

        let link = $(this)
          .parent()
          .attr("href");
        link = link ? link : null;

        dataToSendOnline[i][elemId] = {
          text: $(this).html(),
          children: childrenIds,
          imgAlt: imgAlt,
          img: imgHref,
          link: link
        };
      });
    });
    return dataToSendOnline;
  }

  parseDataForApp(rawData) {
    rawData = this.parseDataForFirebase(rawData);
    delete rawData["date"];
    let dict = {};
    for (const courseName in rawData) {
      const courseDict = rawData[courseName];
      dict[courseName] = this._parseCourse(courseDict);
    }
    return dict;
  }

  onUpdate(func) {
    let context = this;
    chrome.storage.onChanged.addListener(function() {
      console.log("doneupdate");
      context.getMoodleDataFromChromeStorage().then(x => {
        func(x);
      });
    });
    this.getMoodleDataFromChromeStorage().then(x => func(x));
  }

  async getDatabaseIdFromUserId(uid) {
    let id = await this.db
      .collection("authidLinking")
      .doc(uid)
      .get();
    return id.data().databaseID;
  }

  getAllAttachments(branchData){
    let allAttachments = branchData.assignments
    .concat(branchData.files)
    .concat(branchData.folders)
    .concat(branchData.forums)
    .concat(branchData.links)
    .concat(branchData.quizzes);
    return allAttachments;
  }

  transformToFlatDict(data) {
    let dataArray = [];
    transform(data, (_, value, key) => {
      let subject = this.shortenName(key);
      transform(value, (_, value, key) => {
        let allAttachments = this.getAllAttachments(value);
        allAttachments.map((value, key) => {
          value["subject"] = (subject);
          value['searchString'] = `${subject} ${value.name} ${subject}`
          dataArray.push(value);
        });
      });
    });
    return dataArray;
  }

  _parseCourse(courseDict) {
    let weeks = {};
    for (const id in courseDict) {
      const item = courseDict[id];
      if (id.startsWith("expandable")) {
        let items = item["children"].map(link_id =>
          this.__parseLink(courseDict[link_id])
        );
        let week = {
          name: he.decode(item["text"]),
          files: items.filter(x => x.linktype === "File"),
          folders: items.filter(x => x.linktype === "Folder"),
          assignments: items.filter(x => x.linktype === "Assignment"),
          quizzes: items.filter(x => x.linktype === "Quiz"),
          forums: items.filter(x => x.linktype === "Forum"),
          links: items.filter(
            x =>
              !["File", "Folder", "Quiz", "Assignment", "Forum"].includes(
                x.linktype
              )
          ),
          type: "week"
        };

        weeks[id] = week;
      }
    }
    return weeks;
  }

  __parseLink(linkDict) {
    let dict = {
      name: he.decode(linkDict["text"]),
      url: linkDict["link"],
      type: "link",
      linktype: linkDict["imgAlt"], // use alt-text
      iconLink: linkDict["img"]
    };
    return dict;
  }

  async _getDictFromDatabaseId(databaseId) {
    let x = await this.db
      .collection("dba")
      .doc(databaseId)
      .get();
    return x.data();
  }

  async _getRealtimeRefFromDatabaseId(databaseId) {
    let x = await this.db.collection("dba").doc(databaseId);
    return x;
  }

  setAuthStateChangedCallback(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  shortenName(nameOfSubject) {
    var matches = nameOfSubject.match(/\w{3}\d{4}/g);
    if (matches != null) {
      nameOfSubject = matches[0];
    }
    return nameOfSubject;
  }
}

const database = new Database();
//  Object.freeze(database);
export default database;
