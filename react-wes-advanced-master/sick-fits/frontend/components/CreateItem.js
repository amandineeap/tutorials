import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $image: String
        $largeImage: String
        $price: Int!
    ){
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ){
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
         title: '',
         description: '',
         image: '', 
         largeImage: '',
         price: 0
    }
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        // console.log(val);
        this.setState({[name]: val})
    }
    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'advanced-react-wes');
    
        const res = await fetch('https://api.cloudinary.com/v1_1/amandineeap/image/upload', {
          method: 'POST',
          body: data,
        });
        const file = await res.json();
        this.setState({
          image: file.secure_url,
          largeImage: file.eager[0].secure_url,
        });
      }
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {
                    (createItem, { loading, error }) => (
                        <Form onSubmit={async e => {
                            e.preventDefault();
                            const res = await createItem();
                            console.log(res);
                            Router.push({
                                pathname: '/item',
                                query: {id: res.data.createItem.id }
                            });
                        }}
                            data-test="form"
                        >
                            <Error error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="file">
                                    Image 
                                    <input 
                                        type="file" 
                                        id="file" 
                                        name="file" 
                                        placeholder="'Upload an Image'" 
                                        required 
                                        onChange={this.uploadFile}    
                                    />
                                    {this.state.image  != null ?  <img src={this.state.image}/> : null}
                                </label>
                                <label htmlFor="title">
                                    Title 
                                    <input 
                                        type="text" 
                                        id="title" 
                                        name="title" 
                                        placeholder="Title" 
                                        required 
                                        value={this.state.title}
                                        onChange={this.handleChange}    
                                    />
                                </label>
                                <label htmlFor="price">
                                    Price 
                                    <input 
                                        type="number" 
                                        id="price" 
                                        ndame="price" 
                                        placeholder="Price" 
                                        required 
                                        value={this.state.price}
                                        onChange={this.handleChange}    
                                    />
                                </label>
                                <label htmlFor="description">
                                    Description 
                                    <textarea 
                                        type="text" 
                                        id="description" 
                                        name="description" 
                                        placeholder="Enter A Description" 
                                        required 
                                        value={this.state.description}
                                        onChange={this.handleChange}    
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </fieldset>
                        </Form>
                    )}
            </Mutation>
            
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };