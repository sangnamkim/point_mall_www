import React from 'react';
import ItemBox from './ItemBox';
import { inject } from 'mobx-react';

@inject('httpService')
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
        console.log(this.props.match.params.cateId);
        
        this.props.httpService.indexItems(this.props.match.params.cateId)
            .then(items => {
                this.setState({
                    items
                });
            });
    }

    render() {
        console.log(this.state.items);
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