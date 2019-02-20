import React, { Component } from 'react';
import {isMobileOnly} from 'react-device-detect';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as firebase from "firebase/app";


class Navbar extends Component {
    state = {}
    constructor(props){
        super(props);
        this.state.expandedClass = "hidden";        
    }

    logout = () => {
        firebase.auth().signOut();
    }
    
    expandNavbar = () => {
        this.newClass = this.state.expandedClass ==="hidden"?"block":"hidden";
        this.setState({expandedClass:this.newClass})
    }
    
    render() { 
        this.expandedItemsAllClasses = "w-full "+this.state.expandedClass+" flex-grow lg:flex lg:items-center lg:w-auto"
        let logXButton = (<Link to="/login" className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light mr-6">
            <NavBarButton text="Login" />
        </Link>);
        let searchButton = false;
        let homeAndAboutButton = false

        if(this.props.loggedIn){
            logXButton = (<a href='javascript:void(0);' onClick = {this.logout} className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light mr-6">
                <NavBarButton text="Logout" />
            </a>);
            searchButton = (<button className="flex items-center px-3 py-2 ml-2 border rounded text-purple border-purple hover:text-purple-lighter hover:border-purple-lighter">
                <Link to='/home/search' className="text-purple">
                    <i className="fas fa-search fill-current"></i>
                </Link>
            </button>)
            homeAndAboutButton = (
            <React.Fragment>
                <Link to="/app" className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light">
                    <NavBarButton text="App" />
                </Link>
                <Link to="/about" className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light">
                    <NavBarButton text="About" />
                </Link>
            </React.Fragment>)
        }
        return (
            <nav className="flex items-center justify-between flex-wrap bg-white p-4 shadow-md bg-black sticky w-full flex-no-shrink" style={{zIndex:"500", top:"0px"}} >
                <Link to="/" className="flex items-center flex-no-shrink text-purple mr-6">
                    <img className="w-48 ml-1"  src={process.env.PUBLIC_URL + "/uniboard-2.svg"} />                    
                </Link>                
                <div className="flex lg:hidden">
                    {searchButton}                    
                    <button onClick = {this.expandNavbar} className="flex items-center px-3 py-2 ml-2 border rounded text-purple border-purple hover:text-purple-lighter hover:border-purple-lighter">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>

               

                <div className={this.expandedItemsAllClasses}>
                    <div className="text-sm lg:flex-grow">
                    {/* was in here before */}
                    </div>
                    <div>
                    {/* <Link to="/home/sidebar/todolist" className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light">
                        <NavBarButton text="Todo List" />
                    </Link> */}
                    {homeAndAboutButton}
                    <a href="https://chrome.google.com/webstore/detail/synopsis-your-moodle-hero/ikffeebmjnccffbijpcnlhadgdebadmc" className="block lg:inline-block lg:mt-0 text-purple hover:text-purple-light">
                        <NavBarButton text="Get The Extension" />
                    </a>
                    {logXButton}
                    </div>
                </div>
            </nav>
        );
    }
}

const NavBarButton = (props) => (
    <button className="bg-white hover:bg-purple-lightest text-purple font-bold py-1 px-3 rounded mt-3 lg:mt-0 focus:outline-none">
        {props.text}
    </button>
)
 
export default Navbar;