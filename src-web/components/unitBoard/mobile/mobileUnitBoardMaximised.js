import React, { Component } from 'react';
import database from '../../../data';
import WeekCard from '../weekCard';
import RenderLogo from '../../../renderLogo';
class MobileUnitBoardMaximised extends Component {
    state = {  }
    render() { 
        const colorList = [
            "#3e49bb",
            "mediumseagreen",
            "#c5009e",
            "#009888",
            "#682cbf",
            "#50342c",
            "#20B2AA"
          ];
        var borderColor = colorList[this.props.number]
        return ( 
            <div style={{minWidth:"250px", overflow:'hidden', borderRadius:'6px', borderColor:borderColor}} 
                className='flex flex-1 max-w-sm overflow-hidden shadow-lg m-4 bg-white border-b-8 flex-col' >
                <div className="flex justify-between content-center px-6 py-3 bg-white border-b border-grey-light flex-no-shrink" onClick = {this.props.minimizeItems} >
                    <div className="flex">
                    <div style={{ width: "33px" }}>
                        <RenderLogo color={borderColor} />
                    </div>
                        <span className=" text-3xl font-semibold ml-4">{database.shortenName(this.props.unitName)}</span>
                    </div>
                    <div className="flex mt-2">
                        <i className="text-xl text-grey-dark fas fa-chevron-up"></i>
                    </div>
                </div>
                <div className="px-4 py-2" style={ {overflowY: 'scroll'}}>
                    {Object.keys(this.props.unitData).map((key, _)=>{
                        let value = this.props.unitData[key];
                        return <WeekCard weekName={value.name} data={value} unitName={this.props.unitName} 
                        key={key} branchId={key} color={borderColor}/>
                    })}
                </div>
            </div> 
        );
    }
}
 
export default MobileUnitBoardMaximised;