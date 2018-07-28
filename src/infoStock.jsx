import React, { Component } from 'react';
import { Table, Grid, Row, Col, Well } from 'react-bootstrap';

class InfoStock extends Component {
    constructor(props) {

        super(props);
        this.state = {
            shares: 45,
            four1kValue: 2142.70,
            stockPrice: 0,
            stockAccountValue: 0,
            vestedAccountsValue: 0,
            conversionRate: 0
        }
    }

    fetchStockInfo() {
        fetch('https://api.iextrading.com/1.0/stock/info/price', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(stockPrice => {
                console.log('info stock price', stockPrice);
                this.setState({ stockPrice: stockPrice })
                this.setState({stockAccountValue: stockPrice * this.state.shares})
                this.setState({vestedAccountsValue: this.state.stockAccountValue + this.state.four1kValue});
            })
            .catch(error => console.log(error));
    }

    fetchBahtConversion() {
        fetch('https://free.currencyconverterapi.com/api/v6/convert?q=USD_THB&compact=ultra', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(conversionRate => {
            console.log('used to baht conversion', conversionRate.USD_THB);
            this.setState({conversionRate: conversionRate.USD_THB})
        })
        .catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchStockInfo()
        this.fetchBahtConversion()
    }

    render() {
        return (
            <Grid>
                <Row className="">
                    <Col md={6}>
                        <Well>
                            <h1>Stocks that will vest</h1>
                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Shares</th>
                                        <th>Price</th>
                                        <th>Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>INFO</td>
                                        <td>{this.state.shares}</td>
                                        <td>{this.state.stockPrice}</td>
                                        <td>${this.state.stockAccountValue}</td>
                                    </tr></tbody>
                            </Table>
                        </Well>
                    </Col>
                    <Col md={6}>
                        <Well>
                            <h1>401(K) that will vest</h1>
                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>401(k) Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${this.state.four1kValue}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Well>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="text-center">Total Value if you wait</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-white">
                                            ${Number(this.state.vestedAccountsValue).toFixed(2)} USD
                                        </td>
                                        <td className="text-white">
                                        ${Number(this.state.vestedAccountsValue * this.state.conversionRate).toFixed(2)} Baht
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Well>
                    </Col>
                </Row>
            </Grid>

        )
    }
}

export default InfoStock;