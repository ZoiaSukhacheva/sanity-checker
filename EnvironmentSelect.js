import React from 'react';
import ReactDOM from 'react-dom';

export default class EnvironmentSelect extends React.Component{
    constructor(props) {
  		super(props);
  	}

  	render() {
  	    const options = this.props.environments.map((env) =>
            <option key={env}>{env}</option>
        );
        return ( <select className="form-control col-sm-1" ref='env' value={this.props.defaultEnv}
                    onChange={this.props.onChange.bind(this)}>
                        {options}
                 </select>
        );
  	}
};
