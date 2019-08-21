import React from 'react';
import { inject } from 'mobx-react';
import ItemBox from './ItemBox';

@inject('httpService')
class TagItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            items: []
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.tag !== prevProps.match.params.tag) {
            this.indexItmes();            
        }
    }

    indexItems() {
        const tag = this.props.match.params.tag
        this.props.httpService.indexTagItems(tag)
            .then(items => {
                this.setState({
                    items
                })
            })
    }
    render() {
        const items = this.state.items.map((item) => {
            return(
                <ItemBox key={item.id} item={item}/>
            )
        })
        return(
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}

export default TagItems;