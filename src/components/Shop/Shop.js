import React, { Component } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css'
import fakeData from '../../fakeData';
import {addToDatabaseCart} from '../../utility/local-storage';
import {Link} from 'react-router-dom';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            cart: [],
            cartQuantity: 0
        }
    }
    
    componentDidMount() {
        const first10 = fakeData.slice(0,10);
        this.setState({products:first10})
    }

    addToCart = (id) => {
        const currentCart = this.state.cart;
        const selected = currentCart.find( item => item.id === id);
        const others = currentCart.filter(item => item.id !== id);
        const product = this.state.products.find(item => item.id === id);
        const quantity = (selected) ? selected.quantity + 1 : 1;
        const cartItem = {id, quantity, price:product.price};
        const cart = [...others, cartItem];
        const cartQuantity = this.state.cartQuantity + 1;
        this.setState({cart, cartQuantity});
        addToDatabaseCart(id, quantity);
    }

    handleSearch = (event) =>{
        const search = event.target.value.toLowerCase();
        const selected = fakeData.filter( prod => (prod.name + prod.category).toLocaleLowerCase().includes(search));
        this.setState({products:selected});
    }
    
    render() {
        return (
            <div>
                <div className="search-container">
                    <input onChange={this.handleSearch} placeholder="Type here to search" type="text"/>
                    <span>{this.state.cartQuantity}</span>
                </div>
                <div  className="shop-container">
                    <div className="shop">
                        {
                            this.state.products.map(prod => <Product key={prod.id} prod={prod} addToCart={this.addToCart}></Product> )
                        }
                    </div>
                    <div className="cart">
                        <Cart quantity={this.state.cartQuantity} cart={this.state.cart}>
                            <Link to="/review">
                                <button>Review Order</button>
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;