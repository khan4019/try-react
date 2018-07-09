import React, { Component } from 'react';
import Cart from '../Cart/Cart';
import CartProduct from '../CartProduct/CartProduct';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utility/local-storage';
import fakeData from '../../fakeData';
import giphy from '../../images/giphy.gif';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartQuantity:0,
            orderPlaced: false
        }
    }
    
    componentDidMount() {
        const savedCart = getDatabaseCart();
        const ids = Object.keys(savedCart);
        const addedProds = fakeData.filter(item => ids.includes(item.id));
        const cartQuantity = ids.reduce((sum, id) => sum + savedCart[id], 0);
        const cart = addedProds.map(prod => {
            const item = {
                id: prod.id, 
                price: prod.price, 
                quantity:savedCart[prod.id],
                name: prod.name
            };
            return item;
        })
        this.setState({cart, cartQuantity});        
    }

    handleDelete = (id) =>{
        const selected = this.state.cart.find(item => item.id === id);
        const remaining = this.state.cart.filter(item => item.id !== id);
        const cartQuantity = this.state.cartQuantity - selected.quantity;
        this.setState({cart:remaining, cartQuantity});
        removeFromDatabaseCart(id);
    }

    placeOrder =()=>{
        this.setState({cart:[], cartQuantity: 0, orderPlaced: true});
        processOrder();
    }
    
    render() {
        let happyImage = null;
        if(this.state.orderPlaced){
            happyImage = <img src={giphy} alt=""/>
        }
        return (
            <div className="shop-container">
               <div className="shop">
                {
                    this.state.cart.map(prod=><CartProduct key={prod.id} prod={prod} handleDelete={this.handleDelete}></CartProduct>)
                }
                <div className="order-complete">
                    {happyImage}
                </div>
               </div>
               <div className="cart">
                    <Cart cart={this.state.cart} quantity={this.state.cartQuantity}>
                        <button onClick={this.placeOrder}>Place Order</button>
                    </Cart>
               </div>
            </div>
        );
    }
}

export default Review;