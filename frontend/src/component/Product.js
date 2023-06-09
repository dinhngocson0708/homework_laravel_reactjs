import React from "react";
import axios from "axios";

import "../css/product.css"
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      id: null,
      Name: "",
      Price: "",
      Image: "",
      Description: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/getProduct_one")
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  
  render() {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
              {this.state.product.map((product) => (
                <div class="col">
                  <div className="containers">
                  <div class="product-card">
                      <div class="badge">Neu</div>
                      <div class="product-tumb">
                        <img src={`http://localhost:8000/source/image/product_one/${product.image}`}></img>
                      </div>
                      <div class="product-details">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <div class="product-bottom-details">
                          <div class="product-links">
                            <a href=""><i class="fa fa-heart"></i></a>
                            <a href=""><i class="fa fa-shopping-cart"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
            </div>
              ))}
            </div>
    );
  }
}
