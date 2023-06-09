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
                  <div class="card">
                    <div class="content-1">
                        <img src={`http://localhost:8000/source/image/product/${product.image}`}></img>
                       
                    </div>
                    <div class="content-2">
                        <div class="branding">
                            <span>{product.name}</span>
                        </div>
                        <div class="ratings">
                            <span><i class="fas fa-star"></i></span>
                            <span><i class="fas fa-star"></i></span>
                            <span><i class="fas fa-star"></i></span>
                            <span><i class="fas fa-star"></i></span>
                            <span><i class="fas fa-star"></i></span>
                        </div>
                        <div class="color">
                            <h3>Color</h3>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="price">
                            <h3>USD 12,995</h3>
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
