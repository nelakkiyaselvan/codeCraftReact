import React, { Component } from 'react';
import rightChevron from '../img/chevron-right.png'
import backWhite from '../img/back-wh.png'

class PdtList extends Component {
      constructor(props) {
          super(props);
          this.state = {showBack: "",showIndicator: ""};
      }
    
    renderPdtDetail = (e) => {
    let target = e.currentTarget;
    if(!target.classList.contains('active')){
        let prevEle = target.parentElement.getElementsByClassName('active');
        if (prevEle.length)
            prevEle[0].classList.remove('active');
        target.classList.add('active');
        let imgDom = target.querySelector('.pdtImg');
        let pos = imgDom.clientHeight + imgDom.offsetTop - 20;
        let indicator = document.getElementById('indicator');
        indicator.style.top = pos + "px";
        let pdtTitle = target.getElementsByClassName('pdtTitle')[0];
        pdtTitle = pdtTitle ? pdtTitle.textContent : "";
        this.setState({showBack : "show", showIndicator : "show"});
        this.props.updateState({selectedPdt : target.getAttribute('identifier'), productTitle : pdtTitle});
        var preSku= document.querySelector('.skuClrCont.active input');
        if(preSku)
            preSku.click();
        target.scrollIntoView();
    }
    }

    gotoBack = () => {
    document.getElementById('rightPanel').classList.add('hide');
    document.getElementById('rightPanel').classList.remove('show');
    document.getElementsByClassName('pdtListDetail active')[0].classList.remove('active');
    this.setState({showBack : "", showIndicator: ""})
    // this.setState({selectedPdt:null});
    }

    constructPdtList = (data, index) => {
    if (data.name && data.image && data.identifier) {
        return (
                <div className="pdtListDetail" key={data.identifier + "_" + index} identifier={data.identifier} onClick={this.renderPdtDetail.bind(this)}>
                    <div className="pdtImg">
                        <img src={data.image} alt={"image" + index} />
                    </div>
                    <div className="pdtDetail">
                        <ul className="pdtDetailList">
                            <li className="pdtTitle">{data.name}</li>
                            {data.type ? <li className="pdtType"><span className="">{data.type.label} </span>{data.type.value}</li> : ''}
                        </ul>
                    </div>
                </div>
        );
    }
    }

    renderPdtList = (state) => {
    const noPdt = <div className="noDataFnd">No Products found...</div>;
    if(Object.keys(state.productList).length) {
        var pdtList = state.productList;
        if(pdtList.products && pdtList.products.length) {
            pdtList = pdtList.products.map((ele, idx) => this.constructPdtList(ele,idx));
            return pdtList;
            // this.setState({pdtListDom : pdtList})
        }
    } else {
        return noPdt;
    }
    }

    render() {
    const pdtListDom = this.renderPdtList(this.props.state);
    return(
        <div className="leftPanel panels">
        <div id="indicator" className={this.state.showIndicator}><img src={rightChevron} alt="Active_Item" /></div>
        <div className="pdtListWrapper">
            <div id="backBtn" className={this.state.showBack} onClick={this.gotoBack}>
            <img src={backWhite} alt="Back_Icon" />
            </div>
            <div className="pdtListCont">
            {pdtListDom}
            </div>
        </div>
    </div>
    )
    }
}
    
export default PdtList;