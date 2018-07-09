import React, { Component } from 'react';
import './CartProduct.css';

class CartProduct extends Component {
    render() {
        const prod = this.props.prod;
        return (
            <div className="cart-item">
                <h4 className="product-name">{prod.name}</h4>
                <p>Quantity: {prod.quantity}</p>
                <button onClick={() => this.props.handleDelete(prod.id)}>Remove</button>
            </div>
        );
    }
}

export default CartProduct;