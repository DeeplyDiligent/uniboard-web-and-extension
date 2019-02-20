import React, { Component } from 'react';
import Attachments from './attachments/attachments';
import TodoApp from './todoList/todoList'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import posed from 'react-pose';
import NoAttachments from './attachments/noAttachments';

const Box = posed.div({
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    })

class Sidebar extends Component {
    state = { isVisible : false, data: null}

    componentDidMount(){
        this.setState({isVisible:true})
    }

    render() {
        
        // console.log(this.db.collection('dba').doc('eGlJZRO3B
        let weekData = this.props.data[this.props.match.params.id][this.props.match.params.branchid];
        const styles = {};
        styles.sidebar = {right:0, zIndex:'1000', overflow:'scroll'}
        styles.sidebarBackground = {rgba:'(0,0,0,0)'}
        if(weekData){
           let totalFiles = (weekData.files.length + weekData.assignments.length + weekData.quizzes.length + weekData.folders.length + weekData.links.length + weekData.forums.length)
            return (
                <div className="w-full h-full absolute" >
                <Link to='/home'> 
                    <div className="sidebarBackground h-full" style={styles.sidebarBackground}></div>
                </Link>
                <Box pose={this.state.isVisible ? 'visible' : 'hidden'} className="sidebarContent fixed bg-white max-w-sm rounded h-full shadow-lg px-8 py-4 w-full lg:w-1/3 h-full" style={styles.sidebar}>                    
                        <Link to='/home'>
                        <div className="text-right pb-2 text-3xl">
                        <i className="fas fa-times"></i></div>
                        </Link>
                        <div className="text-2xl font-bold">{this.props.match.params.id}</div>
                        {/* <div className="text">{this.props.match.params.id}</div> */}
                        <div className="bg-red-light brow my-4"></div>
                        <a href={weekData.link} target="_blank" className = "text-md text-grey-darker flex no-underline hover:text-grey-dark">
                            <div className="flex-grow">{weekData.name}</div>
                            <div>Open Moodle <i className="fas fa-external-link-alt"></i></div>
                        </a>
                        <div className="mt-4">
                            {(weekData.files && weekData.files.length) ? <Attachments attachments={weekData.files} heading={"FILES"} icon={"fas fa-file"}/>: false}
                            {(weekData.assignments && weekData.assignments.length) ? <Attachments attachments={weekData.assignments} heading={"ASSIGNMENTS"} icon={"fas fa-clipboard"}/>: false}
                            {(weekData.quizzes && weekData.quizzes.length) ? <Attachments attachments={weekData.quizzes} heading={"QUIZZES"} icon={"fas fa-question-circle"}/>: false}
                            {(weekData.folders && weekData.folders.length) ? <Attachments attachments={weekData.folders} heading={"FOLDERS"} icon={"fas fa-folder"}/>: false}
                            {(weekData.links && weekData.links.length) ? <Attachments attachments={weekData.links} heading={"LINKS"} icon={"fas fa-link"}/>: false}
                            {(weekData.forums && weekData.forums.length) ? <Attachments attachments={weekData.forums} heading={"FORUMS"} icon={"fas fa-comment"}/>: false}
                            
                            {totalFiles ? false : <NoAttachments attachments={weekData}/>}
                        </div>
                        {/* <TodoApp/> */}
                    </Box>
                </div>
                
            );
        }
        else {
            return false;
        }
    }
}
 
export default Sidebar;