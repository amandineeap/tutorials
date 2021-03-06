import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import Error from './ErrorMessage';
import {perPage} from '../config';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
        itemsConnection{
            aggregate{
                count
            }
        }
    }
`;

class Pagination extends Component {
    render() {
        return (
          
              
            <Query query={PAGINATION_QUERY} >
                {({data, loading, error}) => {
                    const count = data.itemsConnection.aggregate.count;
                    const pages = Math.ceil(count / perPage);
                    const page = this.props.page;

                    if(error) <Error error={error}></Error>
                    if(loading) <p>Loading...</p>
                    return (
                        <PaginationStyles data-test="pagination">
                            <Head>
                                <title>Sick Fits | Page {page} of {pages}</title>
                            </Head>
                            <Link 
                                prefetch
                                href={{
                                pathname: 'items',
                                query: {page: page -1 }
                            }}>
                            <a className="prev" aria-disabled={page<=1}>Prev</a>
                            </Link>
                            <p>Page {page} of {pages}</p>
                            <p>{count} Items Total</p>
                            <Link 
                                prefetch
                                href={{
                                pathname: 'items',
                                query: {page: page +1 }
                            }}>
                            <a className="next" aria-disabled={page >= pages}>Next</a>
                            </Link>
                        </PaginationStyles>
                )}}
            </Query>
           
        );
    }
}

export default Pagination;
export { PAGINATION_QUERY };