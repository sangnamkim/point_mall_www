import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ItemBox from './ItemBox';
import DataHelper from '../DataHelper';


class Cartitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems = () => {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems);
        }
        this.setState({
            cartItems
        });
    }

    purchase = () => {
        const items = [] ;
        for(let cartItem of this.state.cartItems) {
           items.push({
               item_id: cartItem.item.id,
               count: cartItem.count
           })
        }
        axios.post(
            DataHelper.baseURL()+'/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            localStorage.removeItem('cart_items');
            this.props.history.push('/me/items');
        });
    }
        




    purchaseNextItem(itemsQueue) {
        if (itemsQueue.length < 1) {
            localStorage.setItem('cart_items','[]');
            this.props.history.push('/me/items');
    } else {
        const itemId = itemsQueue.shift();
        axios.post(
            DataHelper.baseURL()+'/items/' + itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            this.purchaseNextItem(itemsQueue) ;
        }) ;
    }
}


    render() {
        const items = this.state.cartItems.map((cartItem) => {
            const item = cartItem.item;
            return (
                <ItemBox key={item.id}
                    item={item}
                    count={cartItem.count} />
            )
        });
        console.log(items);
        return (
            <div id="container">
                <h1>장바구니</h1>
                <button onClick={this.purchase}>구입</button>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default withRouter(Cartitems);