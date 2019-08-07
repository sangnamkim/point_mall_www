import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios'
import DataHelper from '../DataHelper';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject('authStore')
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
        axios.get(DataHelper.baseURL()+'/categorys/')
            .then((response) => {
                const cates = response.data;
                this.setState({
                    cates: cates
                })
            });
        }



    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }
    
    render() {
        const { authStore } = this.props;
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
                    <Link to="/cart/items">Cart</Link>
                    {
                       authStore.IsLoggedIn && <Link to="/me/items">My Items</Link>
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
