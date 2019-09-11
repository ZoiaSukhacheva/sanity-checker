import React from 'react';
import ReactDOM from 'react-dom';
import ExecuteButton from './ExecuteButton.js'
import ResultBox from './ResultBox.js'

export default class NodeItem extends React.Component{

    constructor(props) {
       	super(props);
      	this.state = {hasResult: false, result: {}, isRunning: false};
        this.node = props.node;
        this.handleResultChange = this.handleResultChange.bind(this);
    }

    handleResultChange() {
        this.setState({hasResult: false, isRunning: true});
        this.execute(this.props.env, this.node.id, response => {
            this.setState({hasResult: true, result: response.entity, isRunning: false});
        });
    }

    execute(env, nodeId, callback) {
        var rest, mime, client;
        rest = require('rest'),
        mime = require('rest/interceptor/mime');
        client = rest.wrap(mime);
        client({ path: '/sanity/check/'+env+'/'+nodeId, method: 'POST'})
            .then(callback);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.node.id}</th>
                <td>{this.node.description}<br/>
                    <span id={this.node.id}>
                        <ResultBox show={this.state.hasResult} result={this.state.result} />
                    </span>
                </td>
                <td>{this.node.tags}</td>
                <td><ExecuteButton onClick={this.handleResultChange} ref='executeButton'
                    isRunning={this.state.isRunning} buttonText='Execute' /></td>
            </tr>
        );
    }
}