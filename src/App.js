import React, { Component } from 'react';
import './css/App.css';
import { productList } from './productListData';
import { productSKUs } from './productListData';
import PdtList from './components/ProductList';
import PdtDetails from './components/ProductDetail';

/*import ReactDOM from "react-dom";
import { CircleSlider } from "react-circle-slider";*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { productList: productList, productSKUs: productSKUs, selectedPdt: null}
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

  updateState = (dataJSON) => {
    this.setState(dataJSON);
  }

  render() {
    return (
        <div className="wrapper">
            <div className="leftWrapper">
                <PdtList state={this.state} updateState={this.updateState}/>
            </div>
            <div className="rightWrapper">
                {this.state.selectedPdt ? <PdtDetails this={this} identifier={this.state.selectedPdt} /> : ""}
            </div>
        </div>
    );
  }
}

export default App;
