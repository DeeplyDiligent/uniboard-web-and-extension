import React, { Component } from 'react';

class NoAttachments extends Component {
    state = {  }
    render() { 
        return ( 
    <div className="mt-4 flex flex-col">
        <a className="text-center text-grey-darker mt-3" href={this.props.attachments.link}> Click Here to go visit Moodle.</a>
        <div className="text-center text-grey-light mt-10 text-3xl" style={{flexGrow: "1"}}>Nothing To See Here</div>
    </div> );
    }
}
 
export default NoAttachments;