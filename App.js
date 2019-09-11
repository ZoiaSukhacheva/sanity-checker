import React from 'react';
import ReactDOM from 'react-dom';
import NodeList from './NodeList.js'
import ExecuteButton from './ExecuteButton.js'
import EnvironmentSelect from './EnvironmentSelect.js'
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

class App extends React.Component{
    constructor(props) {
      	super(props);
      	this.state = {env: 'staging', environments: [], nodes: [], services: [], noCheckNodes: [], activeTab: 1};
      	this.handleExecuteAll = this.handleExecuteAll.bind(this);
      	this.handleTabSelect = this.handleTabSelect.bind(this);
    }

    onEnvChange() {
        this.setState({env: this.refs.envSelect.refs.env.value});
    }

    componentDidMount() {
        var rest, mime, client;
        rest = require('rest'),
        mime = require('rest/interceptor/mime');
        client = rest.wrap(mime);
        client({ path: 'http://localhost:4000/environments' }).then(response => {
          this.setState({
            env: response.entity.includes(this.state.env) ? this.state.env : response.entity[0],
            environments: response.entity
          });
        });
        client({ path: 'http://localhost:4000/nodes'}).then(response => {
          this.setState({
            nodes: response.entity
          });
        });
        client({ path: 'http://localhost:4000/services' }).then(response => {
          this.setState({
            services: response.entity
          });
        });
    }

    handleExecuteAll() {
        const nodeItems = this.refs['nodeList'+this.state.activeTab].refs;
        for(var nodeId in nodeItems) {
            nodeItems[nodeId].handleResultChange();
        };
    }

    handleTabSelect(activeTab) {
      if(activeTab == 3) {
        var rest, mime, client;
        rest = require('rest'),
        mime = require('rest/interceptor/mime');
        client = rest.wrap(mime);
        client({ path: 'http://localhost:4000/not-implemented-nodes'}).then(response => {
          this.setState({
            noCheckNodes: response.entity
          });
        });
      }
      this.setState({ activeTab });
    }

    render() {
        return (
            <div>
                <div className="row">
                   <div className="col-sm-9" style={{padding: "20px 0 0 50px"}}>
                       <h1>Sanity Check Tool</h1>
                   </div>
                   <div className="form-horizontal col-xs-3">
                    <div className="form-group col-sm-10">
                       <label htmlFor="env">&nbsp;</label>
                       <EnvironmentSelect onChange={this.onEnvChange.bind(this)} ref='envSelect'
                       environments={this.state.environments}
                       defaultEnv={this.state.env} />
                    </div>
                    <div className="form-group col-sm-10">
                       <ExecuteButton isRunning={false}
                        onClick={this.handleExecuteAll} ref='executeAllButton'
                        cssClass='form-control' buttonText='Execute All' />
                    </div>
                   </div>
                </div>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleTabSelect} id="nodeLists">
                  <Tab eventKey={1} title="Legacy">
                     <NodeList env={this.state.env} ref='nodeList1' nodes={this.state.nodes} />
                  </Tab>
                  <Tab eventKey={2} title="MicroServices">
                     <NodeList env={this.state.env} ref='nodeList2' nodes={this.state.services}/>
                  </Tab>
                  <Tab eventKey={3} title="Nodes with no check implemented">
                     <NodeList env={this.state.env} ref='nodeList3' nodes={this.state.noCheckNodes}/>
                  </Tab>
                </Tabs>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
