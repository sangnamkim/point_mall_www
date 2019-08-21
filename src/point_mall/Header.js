import { Link } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject('httpService','authStore', 'itemStore','history')
@observer
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
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

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'search') {
            this.setState({
                searchText: target.value
            });
        }
    }

    search = () => {
        this.props.history.push('/tags/' + this.state.searchText);
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
                        authStore.isLoggedIn &&
                        <Link to="/me/history">History</Link>
                    }
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
                    <input
                        style={{marginLeft: '1em'}}
                        value={this.state.searchText}
                        onChange={this.onInputChanged}
                        type="text"
                        name="search"/>
                    <button onClick={this.search}>Search</button>
                </div>
            </header>
        );
    }
}


export default Header;
