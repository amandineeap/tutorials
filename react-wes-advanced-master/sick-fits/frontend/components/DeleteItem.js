import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION= gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends Component {
    update = (cache, payload) => {
        // manually update client cache to match server

        // read cache for item
        const data = cache.readQuery({query: ALL_ITEMS_QUERY});
        console.log(data);

        // filter deleted item out of the page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);

        // put items back
        cache.writeQuery({query: ALL_ITEMS_QUERY, data});
    };
    render() {
        return (
            <Mutation 
                mutation={DELETE_ITEM_MUTATION} 
                variables={{ id: this.props.id}}
                update={this.update}
                >

            {(deleteItem, {error}) => (
                <button onClick={() => {
                   if(confirm('are you sure you want to delete this')){
                       deleteItem().catch(err => alert(err.message));
                   } 
                }}>{this.props.children}</button>
            )}
            </Mutation>
        )
    };
}

export default DeleteItem;