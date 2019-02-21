import React, { Component } from "react";
import LinkButton from "../../styledComponents/linkButton";

class NoAttachments extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-col">
        <a
          className="mx-auto mt-6"
          target="_blank"
          rel="noopener noreferrer"
          href={this.props.attachments.link}
        >
          <LinkButton text="Click Here to go visit Moodle" />
        </a>
        <div
          className="text-center text-grey-light mt-10 text-3xl"
          style={{ flexGrow: "1" }}
        >
          Nothing To See Here
        </div>
      </div>
    );
  }
}

export default NoAttachments;
