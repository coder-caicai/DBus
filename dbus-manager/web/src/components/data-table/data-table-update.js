var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var B = require('react-bootstrap');
var Tab = require('fixed-data-table');
var TF = require('../common/table/tab-frame');
var Select = require('../common/select');
var Table = require('../common/table/default-table');
var store = require('./data-table-store');

var ReactDOM = require('react-dom');

var cells = require('../common/table/cells');
var Column = Tab.Column;
var Cell = Tab.Cell;
var TextCell = cells.TextCell;

var UpdateTable = React.createClass({
    mixins: [Reflux.listenTo(store, "_onStatusChange")],
    getInitialState: function() {
        var state = store.initState();
        return state;
    },
    componentDidMount: function() {
        store.actions.initialLoad();
        ReactDOM.findDOMNode(this.refs.physicalTableRegex).value = this.props.location.state.passParam.physicalTableRegex;
        ReactDOM.findDOMNode(this.refs.outputBeforeUpdateFlg).value = this.props.location.state.passParam.outputBeforeUpdateFlg;

    },

    _onStatusChange: function(state) {
        this.setState(state);
    },
    handleSubmit: function() {
        var formdata = {
            id: 0,
            physicalTableRegex: ReactDOM.findDOMNode(this.refs.physicalTableRegex).value,
            outputBeforeUpdateFlg: ReactDOM.findDOMNode(this.refs.outputBeforeUpdateFlg).value
        };
        store.actions.handleSubmit(formdata);
        this.props.history.pushState({
            passParam: "after update"
        }, "/data-table");
    },
    comeBack: function() {
        this.props.history.pushState({
            passParam: "come back"
        }, "/data-table");
    },
    render: function() {
        var tableName = this.props.location.state.passParam.tableName;
        return (
            <div className="container-fluid">
                <div className="row header">
                    <h4 className="col-xs-12">update table</h4>
                    <h4 className="col-xs-12">{tableName}</h4>
                </div>
                <div className="row body">
                    <div className="col-xs-6">
                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label for="physicalTableRegex" className="col-sm-2 control-label">PTRegex</label>
                                <div className="col-sm-10">
                                    <input className="form-control" ref="physicalTableRegex"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="inputDesc" className="col-sm-2 control-label">Before update</label>
                                <div className="col-sm-10">
                                    <select className="form-control" ref="outputBeforeUpdateFlg">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-default" onClick={this.comeBack}>Back</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UpdateTable;
