import React from 'react';
import axios from 'axios';
import DataHelper from '../DataHelper';



import ItemBox from './ItemBox';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.cateId !== prevProps.match.params.cateId) {
            this.indexItems();
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems() {
        const cateId = this.props.match.params.cateId;
        let url = DataHelper.baseURL()+'/items/'
        if (cateId) {
            url = DataHelper.baseURL()+'/categorys/'+cateId+'/items/'
        }
        axios.get(url)
            .then((response) => {
                const items = response.data;
                this.setState({
                    items: items
                })
            });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key ={item.id} item={item}/>
                 )
        });
        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;