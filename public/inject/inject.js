// TODO:
//     - Run only once every 6 hours. If the database has been updated less than 6 hours ago, dont run it! (Also tell users about this)
//     - Cancelling currently doesnt stop UI

cancelled = false;
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    closeLabel: "Close"
});


function remove(array, element) {
    return array.filter(el => el !== element);
}

function countUnique(array){
    return Array.from(new Set(array)).length;
}

function backgroundExpandAll(){
    var allSubjects = [];
    navigationLinks.each(function () {
        if ($(this).attr('title') != null) {
            allSubjects.push($(this).attr('title'));
        }
    });
    expand(allSubjects,function(){});
}

function expandAndCheck(subjects) {

    function progressBar() {
        var progressBarAndCancel = $('#progress-value');
        progressBarAndCancel.html("");
        $('#progress-value').append('<div style="text-align:center" id="progress-bar"></div>')
        var progressBar = $('#progress-bar');
        progressBarAndCancel.append("<br/><button type='button' id='cancel-loading' style='display:block; margin:auto'>Cancel/Change Subjects</button>")
        $('#cancel-loading').click(function(){
            // clearTimeout(loadSubjects);
            cancelled = true;
            $('#subjects-div').show();
            $('#loader').hide();
            // clearInterval(progressBarInterval);
        });
        $( "#subjectselector" ).on( "timeouts", function( event, timeouts ) {
            progressBar.html("Branches left to expand: " + countUnique(timeouts));
        });

    }
    

    if (subjects == null) {
        subjects = [];
    } else {
        $('#subjects-div').hide();
        $('#loader').show();
        navigation.hide();
        $('<div id="takeOverNav">Please Wait...</div>').insertAfter(navigation)
        progressBar();
    }    

    // var loadSubjects = window.setTimeout(doneLoading, 10000)

    function doneLoading(subjectsattr){
        // clearTimeout(loadSubjects);
        navigation.show();
        $('#takeOverNav').hide();
        $('#subjects-div').show();
        $('#loader').hide();
        $('#success-synopsis').show();
        $('#success-synopsis a').click(function(){
            modal.close();
        })
        window.setTimeout(function(){
            $('#success-synopsis').fadeOut();
        },10000); 

        subjects.forEach(function (i) {
            subjectsattr[i]["innerHTML"] = $("#" + subjectsattr[i]["id"])
                .parent()
                .children("ul")
                .html()
        });

        modal.close();

        chrome
            .storage
            .local
            .set({
                MoodleBeast: subjectsattr
            }, function () {
                console.log('committed innerHTML + other attributes to database:');
                console.log(subjectsattr);
            });
    }

    //from expandsubjects.js
    expand(subjects,doneLoading);

}

function showSubjectSelector(subjectsSelected) {
    var allSubjects = [];
    id = 0;
    navigationLinks.each(function () {
        if ($(this).attr('title') != null) {
            allSubjects.push({
                "id": $(this).attr('title'),
                text: $(this).attr('title'),
                value: $(this).attr('title')
            });
            id += 1;
        }
    });
    chrome
        .storage
        .local
        .set({
            allSubjectList: allSubjects
        }, function () {});
    $("#loader").hide();
    $('<div id="subjects-div"></div>').appendTo('#synopsis');
    $('#subjects-div').append("<div id='success-synopsis' style='text-align:center; display:none'>&#10004; Data Stored. <a href='#'>Click Here</a> to close this popup!</div><br/>");
    $('#subjects-div').append("<div style='text-align:center'>What subjects are you doing this semester?</div><" +
            "br />");
    //VALUE IS DIFFERENT FROM THE THING SHOWN!
    $('#subjects-div').append("<div style='display:table;margin:0 auto;width:100%'><select class='js-example-basic-multip" +
            "le js-states form-control js-programmatic-multi-set-val' id='subjects_select' mu" +
            "ltiple='multiple' name='subjects'></select></div>");
    $('#subjects-div').append("<br/><button type='button' id='saveSelection'style='display:block; margin:auto'>" +
            "Save</button> <br/><br/>");
    $(".js-example-basic-multiple.js-states.form-control").select2({data: allSubjects, width:'100%'});
    $('.js-example-basic-multiple.js-states.form-control').select2();
    $('.js-example-basic-multiple.js-states.form-control')
        .val(subjectsSelected)
        .trigger('change');
        $('.select2-container').attr('style','width:100%!important');

    $("#saveSelection").click(saveSelection);
}

function saveSelection(){
    $('#subjects-div').hide();
    $('#loader').show();
    htmlOutput = ($(".js-example-basic-multiple.js-states.form-control").select2('data'));
    selectedSubjects = [];

    htmlOutput.forEach(function (i) {
        selectedSubjects.push(i['text']);
    });

    console.log(selectedSubjects);
    chrome
        .storage
        .local
        .set({
            "subjectsSelected": selectedSubjects
        }, function () {
            expandAndCheck(selectedSubjects);
        });
}

function renderPage(){
     
    // set content
    modal.setContent('<div id="subjectselector"></div>');    
    // modal.close();
    $('#page > *').hide();
    $('#page').css({padding:"0px", position: "fixed", height: "100%"});
    $('#page-wrapper').css({paddingBottom:"0px",marginBotton:"0px"});
    $('#page-wrapper::after').css({content:"none"});
    $('#page-footer').css({display:"none"}); 
    //floating change subjects button
    $('#page-wrapper').append('<div id="floatingdivs" style="display:flex;position: fixed;transform: translateX(50%); height: 60px; z-index:10000;top: 5px; right: 50%;"></div>')
    $('#floatingdivs').append('<a href="#" id="changesubjects" style="width: 150px; height:60px; background-color: #0C9; color: #FFF; border-radius: 50px; text-align: center; box-shadow: 2px 2px 3px #999;" class="float"><div style="margin-top:17px">Change Subjects</div></a>')
    $('#floatingdivs').append('<a href="#" id="refresh" style="margin-left:15px;width: 110px; height:60px; background-color: #0C9; color: #FFF; border-radius: 50px; text-align: center; box-shadow: 2px 2px 3px #999;" class="float"><div style="margin-top:17px">Refresh</div></a>')
    $('#page').css({width:$('body').width()});
    setInterval(function(){ $('#page').css({width:$('body').width(),height:$('body').height()-72}); }, 200);
    $('#changesubjects').click(function(){
        modal.open()
    });
    $('#refresh').click(function(){
        if (window.confirm("Did you know?\n\nThere's no need to refresh manually, the page is automatically updated every 3 hours! If you still wish to proceed, press OK.")){
            modal.open()
            saveSelection();
        }
    });
    // add a button if modal doesnt have button already
    if ($('.tingle-btn--primary').length === 0){
        modal.addFooterBtn('Minimize', 'tingle-btn tingle-btn--primary', function() {
            // here goes some logic
            modal.close();
        });
    }

    $("#page").append('<iframe id="pageaction"  style="width:100%; border:none" height="100%" src="'+ chrome.extension.getURL('index.html')+'"></iframe>')
    synopsisbox = "<div id='synopsis'class='card mb-3' style='padding:20px 20px;display:none;background: radial-gradient(circle, rgba(241,240,255,1) 0%, rgba(228,251,244,1) 100%);box-shadow: inset 0px 0px 6px 0px rgba(0,0,0,0.75);'>"+
    "<div id='logo' style='display: -webkit-box;width: fit-content;margin: auto; margin-bottom: 20px;'><a href='"+chrome.extension.getURL('index.html')+"'><img style='width:40px' "+
    "src='"+chrome.extension.getURL('img/icon.png')+"' /></a><h1 style='margin-left:25px;text-shadow:0px 0px 9px #ffbd81'><a style='color:#f98012;' href='"
    +chrome.extension.getURL('index.html')+"'>Synopsis</a></h1></div>"
    +"<div id='app'><div id='loader'><div style='text-align:center'>Please Wait...</div>"
        +"<img style='height:100px; margin:auto; display:block' src=" + chrome.extension.getURL('img/spinner.gif') + 
            " /><div id='progress-value' style='text-align:center'>Loading...</div>" +
            "</div></div></div>"
    
    $(synopsisbox).appendTo("#subjectselector");
    $('#synopsis').slideDown();
}

function autoCreateNavbar(isCustomisePage){
    $("#app").html("");
    wait = '<h5 id="waitForRedirect" style="text-align:center">Please Wait...Redirecting</h5>';
    $(wait).appendTo('#app');
    console.log(isCustomisePage);
    console.log(navigationLinks.length);
    if (!isCustomisePage){
        //switch to customise page first
        $('#page-header .singlebutton button').last().click()
    } else if(isCustomisePage && navigationLinks.length === 0) {
        //then find session key and add block
        sessKey = $("input[name='sesskey']").first().val();
        window.location = "?bui_addblock&sesskey="+sessKey+ "&bui_addblock=navigation";
    } else if (isCustomisePage && navigationLinks.length != 0) {
        //then go back to non customise page
        $('#page-header .singlebutton button').last().click()
    }

}

function showSetup(){
    startSetupButton = '<div style="text-align:center">Welcome! Please click the button below to start the setup. It will redirect you quite a few times so please be patient.</div>'+
    '<br /><button id="startButton" style="display:block;margin:auto">Start</button>';
    $('#app').html("");
    $(startSetupButton).appendTo('#app');
    $('#startButton').click(function(){
        chrome.storage.local.set({isSettingUp:true},function(){
            $('#page-header .singlebutton button').last().click();
        });
    });
}

function refreshPageIfNotLoggedIn(){
    console.log('Checking if we are signed in...')
    $.ajax({
        url: 'https://lms.monash.edu/my/',
        context: document.body
    }).done(function(data) {
        if(data.includes("postLoginSubmitButton")){
            parent.location.href=parent.location.href
        }
    });
}

chrome
    .extension
    .sendMessage({}, function (response) {
        renderPage();
        var readyStateCheckInterval = setInterval(function () {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                //navigation object
                //newmoodle
                navigationLinks = $("section[role='navigation'] a");
                navigation = $("section[role='navigation'] .content");
                isCustomisePage = $('#page-header .singlebutton button').html()==="Customise this page"?false:true;
                isAMoodlePage = $('#page-header .singlebutton button').length>0
                
                if ((navigationLinks.length === 0|| (isCustomisePage))&&isAMoodlePage){
                    modal.open();
                    // autoCreateNavbar(isCustomisePage);
                    chrome.storage.local.get("isSettingUp", function(data){
                        console.log(data['isSettingUp']);
                        if (data['isSettingUp']){
                            autoCreateNavbar(isCustomisePage);
                        } else {
                            showSetup();
                        }
                     });
                } else {
                    chrome.storage.local.set({isSettingUp:null});
                    chrome.storage.local.get(null, function (result) {
                        subjectsSelected = result['subjectsSelected'];
                        if (subjectsSelected == null) {
                            modal.open();
                            showSubjectSelector([]);
                            backgroundExpandAll();
                        } else if (subjectsSelected != null) {
                            showSubjectSelector(subjectsSelected);
                            if (result['MoodleBeast']){
                                date = result['MoodleBeast'][Object.keys(result['MoodleBeast'])[0]]['dateCreated']
                                diffDays = moment.duration(moment(new Date()).diff(date)).asDays();
                                if(diffDays<0.125){
                                    return false
                                };
                            }
                            expandAndCheck(subjectsSelected);
                        }
                    });
                }
                setInterval(refreshPageIfNotLoggedIn, 30*1000);
            }
        }, 10);
    });
