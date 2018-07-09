import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {

    render() {
        const totalPrice = this.props.cart.reduce((sum, item) => sum + item.price*item.quantity, 0);
        const shipping = (totalPrice) ? 3.99 : 0; 
        const beforeTax = totalPrice + shipping;
        const tax = beforeTax * .01;
        const grandTotal = beforeTax + tax;

        return (
            <div>
                <h5>Order Summary</h5>
                <p>Item ordered: {this.props.quantity}</p>
                <table className="price-detail">
                    <tbody>
                        <tr>
                            <td>Item Price:</td>
                            <td>${totalPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping & Handling: </td>
                            <td>${beforeTax.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Total Before Tax:</td>
                            <td>${shipping.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Estimated Tax:</td>
                            <td>${tax.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Total:</td>
                            <td>${grandTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                {this.props.children}
            </div>
        );
    }
}

export default Cart;