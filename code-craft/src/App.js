import React, { Component } from 'react';
import './css/App.css';
import { productList } from './productList';
import { productSKUs } from './productList';
import rightChevron from './img/chevron-right.png'
import backWhite from './img/back-wh.png'
import plusImg from './img/plus-dk.png'

/*import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pdtListDom: [], productList: productList, productSKUs: productSKUs, selectedPdt: null}
  }
//   getProductList = () => {
//     fetch("https://d167y3o4ydtmfg.cloudfront.net/541/studio/assets/v1565363154118_293994083/productJSON.json")
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 this.setState({
//                     isLoaded: true,
//                     response: result,
//                     responseLength: result.length,
//                     success: true
//                 });
//             },
//             (error) => {
//                 if(productList && Object.keys(productList).length) {
//                   this.setState({
//                       isLoaded: true,
//                       productList: productList,
//                       success: true
//                   });
//                 }
//             }
//         )
//   }


  render() {
    return (
        <div class="wrapper">
            <div class="leftWrapper">
                <PdtList this={this} />
            </div>
            <div class="rightWrapper">
                {this.state.selectedPdt ? <PdtDetails this={this} identifier={this.state.selectedPdt} /> : ""}
            </div>
        </div>
    );
  }
}


class PdtList extends Component {

  renderPdtDetail = (e) => {
    let target = e.currentTarget;
    if(!target.classList.contains('active')){
        let prevEle = target.parentElement.getElementsByClassName('active');
        prevEle.length ? prevEle[0].classList.remove('active') : '';
        target.classList.add('active');
        document.getElementById('backBtn').style.display = "block";
        let imgDom = target.querySelector('.pdtImg');
        let pos = imgDom.clientHeight + imgDom.offsetTop - 20;
        let indicator = document.getElementById('indicator');
        indicator.style.display = "block";
        indicator.style.top = pos + "px";
        indicator.classList.add('show');
        document.querySelector('.pdtListDetail.active .pdtImg').offsetTop
        let pdtTitle = target.getElementsByClassName('pdtTitle')[0];
        pdtTitle = pdtTitle ? pdtTitle.textContent : "";
        this.props.this.setState({selectedPdt : target.getAttribute('identifier'), productTitle : pdtTitle});
        var preSku= document.querySelector('.skuClrCont.active input');
        if(preSku)
            preSku.click();
        target.scrollIntoView();
    }
  }

  gotoBack = () => {
    document.getElementById('indicator').classList.remove('show');
    document.getElementById('rightPanel').style.display = "none";
    document.getElementById('backBtn').style.display = "none";
    document.getElementsByClassName('pdtListDetail active')[0].classList.remove('active');
    // this.setState({selectedPdt:null});
  }

  constructPdtList = (data) => {
    if (data.name && data.image && data.identifier) {
        return (
                <div class="pdtListDetail" identifier={data.identifier} onClick={this.renderPdtDetail.bind(this)}>
                    <div class="pdtImg">
                        <img src={require(data.image)} />
                    </div>
                    <div class="pdtDetail">
                        <ul class="pdtDetailList">
                            <li class="pdtTitle">{data.name}</li>
                            {data.type ? <li class="pdtType"><span class="">{data.type.label} </span>{data.type.value}</li> : ''}
                        </ul>
                    </div>
                </div>
        );
    }
  }

  renderPdtList = (props) => {
    if(Object.keys(props.state.productList).length) {
        if (!props.state.pdtListDom.length) {
            var pdtList = props.state.productList;
            if(pdtList.products && pdtList.products.length) {
                var pdtList = pdtList.products.map(this.constructPdtList);
                props.setState({pdtListDom : pdtList})
            }
        } else {
            return (props.state.pdtListDom);
        }
    } else {
      return (
        <div class="noDataFnd">No skus found...</div>
      )
    }
  }

  render() {
    return(
      <div class="leftPanel panels">
      <div id="indicator"><img src={rightChevron} /></div>
      <div class="pdtListWrapper">
          <div id="backBtn" onClick={this.gotoBack}>
            <img src={backWhite} />
          </div>
          <div class="pdtListCont">
            {this.renderPdtList(this.props.this)}
          </div>
      </div>
    </div>
    )
  }
}

class PdtDetails extends Component {
    constructor(props) {
        super(props);
        // this.state = { value: 20, min:25, max: 75 };
        this.state = {selectedSKU : ""}
    }

    // handleChange = value => {
    //     console.log(`Changed value ${value}`);
    //     this.setState({ value });
    // };
 
    // handleChangeRange = event => {
    //     this.setState({
    //         value: event.target.valueAsNumber,
    //     });
    // };

    toggleDetail = (e) => {
        let pdtDetailEle = document.getElementById('deviceDetWrap');
        if(e.currentTarget.checked) {
            pdtDetailEle.style.display = "block";
        } else {
            pdtDetailEle.style.display = "none";
        }
    }

    renderPdtDetails = () => {
        let selectedPdt = document.getElementsByClassName('pdtListDetail active')[0];
        let pdtId = selectedPdt ? selectedPdt.getAttribute('identifier') : '';
        if(pdtId) {
            var skuDom = this.constructSkus(pdtId);
            let rghtPanel = document.getElementById('rightPanel');
            rghtPanel ? rghtPanel.style.display = "block" : '';
            return skuDom;
        }
    }

    skuClick = (e) => {
        let curSku = e.currentTarget;
        let parentEle = curSku.parentElement;
        let prevSku = document.getElementsByClassName('skuClrCont active')[0];
        this.resetMode();
        if(curSku.checked && !parentEle.classList.contains('.active')) {
            if(prevSku) {
                prevSku.querySelector('input').checked = false;
                prevSku.classList.remove('active');
            }
            curSku.closest('.skuClrCont').classList.add('active');
            document.querySelectorAll('.featureCont , .quickDemoCont').forEach(ele => {
                if(ele)
                    ele.classList.remove('disabled');
            });
            this.setState({selectedSKU:parentEle.parentElement.getAttribute('skuclr')})
        } else {
            prevSku.classList.remove('active');
            this.setState({selectedSKU:""})
        }
    }

    resetMode = () => {
        document.querySelectorAll('.featureCont , .quickDemoCont').forEach(ele => {
            if(ele)
                ele.classList.add('disabled');
        });
        let selectedMode = document.getElementsByClassName('modes active')[0];
        selectedMode ? selectedMode.classList.remove('active') : '';
        let resetDoms = document.querySelectorAll('#swipeBall,.leftScroller');
        if(resetDoms.length) {
            resetDoms.forEach(ele => {
                ele.removeAttribute('style')
            });
        }
        document.getElementById('volume').textContent = 0;
    }

    constructSkus = (id) => {
        let pdtSkus = productSKUs.length ? productSKUs : [];
        var curEle = pdtSkus.filter((ele) => ele.identifier == id ).pop();

        if(curEle && curEle.skus && curEle.skus.length) {
            let skus = curEle.skus;
            var skuCont = skus.map(data => {
                return (
                    <div class="skuClrCont" skuclr={data.color}>
                        <label class="colorSku">
                        <input type="checkbox" onClick={this.skuClick} />
                        <span class="selected" style={{backgroundColor: data.color}}></span>
                        </label>
                    </div>
                    );
            });

            return (
                skuCont
            );
        } else {
            return (
                <div class="noDataFnd">No skus found...</div>
            )
        }
    }

    render() {
    // const { value } = this.state.value;
    // const { min } = this.state.min;
    // const { max } = this.state.max;
    const skuDom = this.renderPdtDetails();
        return(
            <div id="rightPanel" class="panels">
                <div class="rgtPanelWrap">
                    <div class="panelTitle">Devices<span id="addDevice"><img src={plusImg} /></span></div>
                    <div class="pdtTitleCont">
                        <h3 class="productTitle">{this.props.this.state.productTitle}</h3>
                        <div class="toggleCont">
                            <label class="toggleBtn">
                                <input id="togBtn" type="checkbox" defaultChecked onClick={this.toggleDetail} />
                                <span class="toggleDot"></span>
                            </label>
                        </div>
                    </div>
                    <div id="deviceDetWrap">
                        <div class="deviceSkuCont">
                            <div class="skuTitle">
                                <span class="deviceSkuTitle">Shades</span>
                                <div class="titleBorder"></div>
                            </div>
                            <div class="deviceSkus">{skuDom}</div>
                        </div>
                        <div class="featureCont disabled">
                            <div class="skuTitle">
                                <span class="deviceSkuTitle">Mode</span>
                                <div class="titleBorder"></div>
                            </div>
                            {this.state.selectedSKU ? <SkuFeatures this={this} /> : ""}
                        </div>
                        <div class="quickDemoCont disabled">
                            <div class="skuTitle">
                                <span class="deviceSkuTitle">Intensity</span>
                                <div class="titleBorder"></div>
                            </div>
                            <div class="scrollerWrap">
                                <div id="swipeBall"></div>
                                <div class="leftScroller">
                                    <div class="scrollerCont">
                                    <div class="scroller"></div>
                                    </div>
                                </div>
                                <div class="rightScroller">
                                    <div class="scrollerCont">
                                        <div class="scroller"></div>
                                    </div>
                                </div>
                                <span id="volume">0</span>
                            </div>
                        </div>
                        {/* <CircleSlider value={value} min={min} max={max} onChange={this.handleChange} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

class SkuFeatures extends Component {

    selectMode = (e) => {
        let curEle = e.currentTarget;
        if(!curEle.classList.contains('active')){
            let prevEle = document.getElementsByClassName('modes active')[0];
            prevEle ? prevEle.classList.remove('active') : '';
            curEle.classList.add('active');
            let demoEle =  document.getElementsByClassName('quickDemoCont')[0];
            let volume = curEle.getElementsByClassName('modeVolume')[0].textContent.trim();
            let diskMov = volume.split('%').join('');
            let halfLength = 154/100;
            let startFrom = 283;
            let degree = (diskMov >= 0 && diskMov <= 100) ? startFrom + Math.round(halfLength * diskMov) : startFrom;
            // let degree = (50 > diskMov) ? (360 - 25) : ((50 == diskMov) ? 360 : (360 + 78));
            demoEle.scrollIntoView();
            document.getElementById("swipeBall").style.transform = 'rotate(' + degree + 'deg)';
            document.querySelector(".scrollerWrap .leftScroller").style.width = volume;
            document.getElementById('volume').textContent = diskMov;
        }
    }

    constructModes = (skus,curSku,curThis) => {
        let curEle = skus.filter(ele => ele.identifier == curThis.props.this.state.selectedPdt).pop();
        if(curSku) {
            var data = curEle.skus.filter( clr => clr.color == curSku).pop();
            data = data.mode ? data.mode : [];
            var modeDom = data.map(ele => {
                return (
                    <div class="modes mornMode" onClick={this.selectMode}>
                        <div class="modeDetail">
                            <div class="modeImg" id={ele.label}></div>
                            <span class="modeTitle">{ele.label}</span>
                        </div>
                        <div class="modeDetail">
                            <div class="modeVolume modeTitle">{ele.value}</div>
                            <div class="modeAvail modeImg"></div>
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
        let curThis = this.props.this;
        let data = curThis.props.this.state.productSKUs
        let curSku = curThis.state.selectedSKU;
        const modeDom = this.constructModes(data,curSku,curThis);
        return (
            <div class="modeList" selpdt={this.props.this.props.this.state.selectedPdt}>
                {modeDom}
            </div>
        )
    }
}

export default App;
