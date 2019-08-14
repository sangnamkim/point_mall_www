import { Link } from 'react-router-dom';
import React from 'react';
import DataHelper from '../DataHelper';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject('httpService','authStore', 'itemStore')
@observer
class Header extends React.Component {

    helper = new DataHelper();
    constructor(props) {
        super(props);
        this.state = {
            cates: []
        };
    }

    componentDidMount() {
        this.indexCates();
    }

    indexCates() {
        this.props.httpService.indexCates()
            .then(cates => {
                this.setState({
                    cates
                })
            });
        }



    logout = () => {
        const { authStore, itemStore } = this.props;
        authStore.deleteToken();
    }
    
    render() {
        const { authStore, itemStore } = this.props;
        const cates = this.state.cates.map((cate) => {
            return (
                <Link key={cate.id} to={'/cate/' + cate.id}>{cate.title}</Link>
                 )
        });
        return(
            <header>
                <Link to="/">PointMall</Link>
                {cates}
                <div className="header-right">
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                       authStore.IsLoggedIn?
                       <Link to="/me/items">My Items</Link>:
                            <Link to="/register">Register</Link>
                    }
                    {
                        authStore.IsLoggedIn ?
                            <Link to='#' onClick={this.logout}>Logout</Link> :
                            <Link to="/login">Login</Link>
                    }
                </div>
            </header>
        );
    }
}


export default Header;
