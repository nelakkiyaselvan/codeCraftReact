import React, { Component } from 'react';
import SkuFeatures from '../components/SKUFeatures';
import { productSKUs } from '../productListData';
import plusImg from '../img/plus-dk.png'

class PdtDetails extends Component {
    constructor(props) {
        super(props);
        // this.state = { value: 20, min:25, max: 75 };
        this.state = {selectedSKU : "",showDetails : "show"}
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

    updateState = (dataJSON) => {
        this.setState(dataJSON);
    }

    toggleDetail = (e) => {
        if(e.currentTarget.checked) {
            this.setState({showDetails : "show"});
        } else {
            this.setState({showDetails : ""});
        }
    }

    renderPdtDetails = () => {
        let selectedPdt = document.getElementsByClassName('pdtListDetail active')[0];
        let pdtId = selectedPdt ? selectedPdt.getAttribute('identifier') : '';
        if(pdtId) {
            var skuDom = this.constructSkus(pdtId);
            let rghtPanel = document.getElementById('rightPanel');
            if (rghtPanel) {
                rghtPanel.classList.remove('hide');
                rghtPanel.classList.add('show');
            } 
            // rghtPanel.style.display = "block";
            // document.getElementById('rightPanel').classList.add('show');
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
        if (selectedMode) 
            selectedMode.classList.remove('active');
        let resetDoms = document.querySelectorAll('#swipeBall,.leftScroller');
        if(resetDoms.length) {
            resetDoms.forEach(ele => {
                ele.removeAttribute('style')
            });
        }
        this.setState({volume : 0});
    }

    constructSkus = (id) => {
        let pdtSkus = productSKUs.length ? productSKUs : [];
        var curEle = pdtSkus.filter((ele) => ele.identifier === id ).pop();

        if(curEle && curEle.skus && curEle.skus.length) {
            let skus = curEle.skus;
            var skuCont = skus.map((data, idx) => {
                return (
                    <div className="skuClrCont" key={data.color + "_" + idx} skuclr={data.color}>
                        <label className="colorSku">
                        <input type="checkbox" onClick={this.skuClick} />
                        <span className="selected" style={{backgroundColor: data.color}}></span>
                        </label>
                    </div>
                    );
            });

            return (
                skuCont
            );
        } else {
            return (
                <div className="noDataFnd">No skus found...</div>
            )
        }
    }

    render() {
    // const { value } = this.state.value;
    // const { min } = this.state.min;
    // const { max } = this.state.max;
    const skuDom = this.renderPdtDetails();
        return(
            <div id="rightPanel" className="panels">
                <div className="rgtPanelWrap">
                    <div className="panelTitle">Devices<span id="addDevice"><img src={plusImg} alt="Add_to_Cart" /></span></div>
                    <div className="pdtTitleCont">
                        <h3 className="productTitle">{this.props.this.state.productTitle}</h3>
                        <div className="toggleCont">
                            <label className="toggleBtn">
                                <input id="togBtn" type="checkbox" defaultChecked onClick={this.toggleDetail} />
                                <span className="toggleDot"></span>
                            </label>
                        </div>
                    </div>
                    <div id="deviceDetWrap" className={this.state.showDetails}>
                        <div className="deviceSkuCont">
                            <div className="skuTitle">
                                <span className="deviceSkuTitle">Shades</span>
                                <div className="titleBorder"></div>
                            </div>
                            <div className="deviceSkus">{skuDom}</div>
                        </div>
                        <div className="featureCont disabled">
                            <div className="skuTitle">
                                <span className="deviceSkuTitle">Mode</span>
                                <div className="titleBorder"></div>
                            </div>
                            {this.state.selectedSKU ? <SkuFeatures curSku={this.state.selectedSKU} selPdt={this.props.this.state.selectedPdt} data={this.props.this.state.productSKUs} updateState={this.updateState} /> : ""}
                        </div>
                        <div className="quickDemoCont disabled">
                            <div className="skuTitle">
                                <span className="deviceSkuTitle">Intensity</span>
                                <div className="titleBorder"></div>
                            </div>
                            <div className="scrollerWrap">
                                <div id="swipeBall"></div>
                                <div className="leftScroller">
                                    <div className="scrollerCont">
                                    <div className="scroller"></div>
                                    </div>
                                </div>
                                <div className="rightScroller">
                                    <div className="scrollerCont">
                                        <div className="scroller"></div>
                                    </div>
                                </div>
                                <span id="volume">{this.state.volume}</span>
                            </div>
                        </div>
                        {/* <CircleSlider value={value} min={min} max={max} onChange={this.handleChange} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default PdtDetails;