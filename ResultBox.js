import React from 'react';
import ReactDOM from 'react-dom';

export default class ResultBox extends React.Component{

    render() {
        if(!this.props.show) {
            return '';
        }
        var isSuccess = this.props.result.success;
        const labelClass = isSuccess ? 'label label-success' : 'label label-danger';
        const labelText = isSuccess ? 'Passed' : 'Failed';
        return  <div>
                <span className={labelClass}>{labelText}</span>&nbsp;
                <span className='text-info' dangerouslySetInnerHTML={{__html: this.props.result.message}} />
                </div>;
    }
}