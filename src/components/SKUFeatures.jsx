import React, { Component } from 'react';

class SkuFeatures extends Component {

    selectMode = (e) => {
        let curEle = e.currentTarget;
        if(!curEle.classList.contains('active')){
            let prevEle = document.getElementsByClassName('modes active')[0];
            if(prevEle)
                prevEle.classList.remove('active');
            curEle.classList.add('active');
            let demoEle =  document.getElementsByClassName('quickDemoCont')[0];
            let volume = curEle.getElementsByClassName('modeVolume')[0].textContent.trim();
            let diskMov = volume.split('%').join('');
            let halfLength = 154/100;
            let startFrom = 283;
            let degree = (diskMov >= 0 && diskMov <= 100) ? startFrom + Math.round(halfLength * diskMov) : startFrom;
            demoEle.scrollIntoView();
            document.getElementById("swipeBall").style.transform = 'rotate(' + degree + 'deg)';
            document.querySelector(".scrollerWrap .leftScroller").style.width = volume;
            this.props.updateState({volume : diskMov});
        }
    }

    constructModes = (skus,curSku,selPdt) => {
        let curEle = skus.filter(ele => ele.identifier === selPdt).pop();
        if(curSku) {
            var data = curEle.skus.filter( clr => clr.color === curSku).pop();
            data = data.mode ? data.mode : [];
            var modeDom = data.map((ele,idx) => {
                return (
                    <div className="modes mornMode" key={ele.label + "_" + idx} onClick={this.selectMode}>
                        <div className="modeDetail">
                            <div className="modeImg" id={ele.label}></div>
                            <span className="modeTitle">{ele.label}</span>
                        </div>
                        <div className="modeDetail">
                            <div className="modeVolume modeTitle">{ele.value}</div>
                            <div className="modeAvail modeImg"></div>
                        </div>
                    </div>
                )
            });
            return modeDom;
        } else {
            return ("");
        }
    }

    render() {
        let selPdt = this.props.selPdt;
        let data = this.props.data;
        let curSku = this.props.curSku;
        const modeDom = this.constructModes(data,curSku,selPdt);
        return (
            <div className="modeList" selpdt={this.props.selPdt}>
                {modeDom}
            </div>
        )
    }
}

export default SkuFeatures;