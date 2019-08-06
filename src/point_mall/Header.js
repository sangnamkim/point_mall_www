import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios'
import DataHelper from '../DataHelper';
import { autorun } from 'mobx';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cates: []
        };
    
        const helper = new DataHelper();
        autorun(() => {
            console.log('header' + helper.authToken);
        });
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
    
    render() {
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
                    <Link to="/me/items">Myitems</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}

export default Header;
