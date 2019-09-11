import React from 'react';
import ReactDOM from 'react-dom';
import NodeItem from './NodeItem.js'

export default class NodeList extends React.Component{
    constructor(props) {
  		super(props);
  	}

  	render() {
  	    const items = this.props.nodes.map((node) =>
          <NodeItem key={node.id} node={node} env={this.props.env} ref={node.id} />
        );
        return (
        	  <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th></th>
                  </tr>
                </thead>
                  <tbody>
                     {items}
                  </tbody>
            </table>
        );
  	}
};
