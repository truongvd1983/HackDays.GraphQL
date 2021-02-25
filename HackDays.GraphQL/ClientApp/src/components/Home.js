import React, { Component } from 'react';
import axios from 'axios'
import { CarouselImages } from './CarouselImages';
import { ProductList } from './ProductList'
import { Link } from 'react-router-dom';
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateData();
    }

    render() {

        return (
            <div>
                <CarouselImages/>
                {
                    this.state.loading
                        ? <p><em>Loading...</em></p> :
                        <div className="flashSale">
                            <h2>
                                FLASH SALE!!!
                                <small className="float-right"><Link to="/product/add" >Add new</Link></small>    
                            </h2>
                            <ProductList products={this.state.products} />
                        </div>
                }
            </div>
        );
    }

    async populateData() {
        const body = {
            query: `query {
              products {
                id,
                name,
                code,
                imageUrl,
                price
              }
            }`,
            variables: {}
        }

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data.data.products, loading: false })
            })
    }
}