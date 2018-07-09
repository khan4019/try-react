import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './Product.css';

class Product extends Component {
    render() {
        const prod = this.props.prod;
        return (
            <div className="product-container">
                <div>
                    <img src={prod.img} alt=""/>
                </div>
                <div>
                    <h4 className="product-name">{prod.name}</h4>
                        <p><small>by: {prod.seller}</small></p>
                    <div className="product-info">
                        <div className="order">                        
                            <p>${prod.price}</p>
                            <p><small>only {prod.stock} left in stock - order soon</small></p>
                            <button onClick={() => this.props.addToCart(prod.id)}>Add to Cart</button>
                        </div>
                        <div className="features">
                            <StarRatingComponent
                                name="product star"
                                value={prod.rating}
                                emptyStarColor='lightgray'
                                editing={false}
                            ></StarRatingComponent>
                            <h5>Features</h5>
                            <ul>
                                {prod.features.map(ftr => <li key={ftr.name}>{ftr.name}: <strong>{ftr.value}</strong></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;