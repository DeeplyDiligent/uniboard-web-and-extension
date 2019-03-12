import React, { Component } from 'react';
import UnitBoard from './unitBoard';
import PerfectScrollbar from "react-perfect-scrollbar";


class UnitBoards extends Component {
    constructor(props){
        super(props)
    }
  
    render() {
        return ( 
            <PerfectScrollbar className="flex flex-grow max-w-full px-2">
            {Object.keys(this.props.data).map((key, index) => {
                return <UnitBoard unitData={this.props.data[key]} unitName={key} unitCode={key.unitCode} key={key} number={index}/>
            })}
            <div>&nbsp;</div>
            </PerfectScrollbar>
         )
    }
}

//height: 'calc(100% - 68px)
 
export default UnitBoards;