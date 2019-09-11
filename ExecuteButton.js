import React from 'react';
import ReactDOM from 'react-dom';

export default class ExecuteButton extends React.Component{

    constructor(props) {
      	super(props);
    }

    render() {
        return this.props.isRunning
            ? 'Loading ...'
            : ( <button type="button" className={"btn btn-info " + this.props.cssClass}
                onClick={() => this.props.onClick()}>{this.props.buttonText}</button>
              )
    }
}