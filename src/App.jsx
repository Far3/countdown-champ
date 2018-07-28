import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
import InfoStock from './infoStock.jsx';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: 'November 16, 2018',
            newDeadline: ''
        }
    }

    changeDeadline() {
        this.setState({ deadline: this.state.newDeadline })
    }
    render() {
        return (
            <div className="app">
                <h1>3 year Anniversary</h1>
                <div className="app-title">{this.state.deadline}</div>
                <div>
                    <Clock
                        deadline={this.state.deadline}
                    />
                </div>
                <Form inline>
                    <FormControl
                        className="deadline-input"
                        placeholder="New Date"
                        onChange={event => this.setState({ newDeadline: event.target.value })}
                    />
                    <Button onClick={() => this.changeDeadline()}>Submit</Button>
                </Form>
                <div>
                    <InfoStock />
                </div>
            </div>
        )
    }
}

export default App;