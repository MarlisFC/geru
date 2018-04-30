import React from 'react';
import {isArray} from 'lodash';
export class ReBootSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valueKey: "value", labelKey: 'label', open: false, options: this.props.options ? this.props.options : []};
    }

    onChange(e) {
        // console.log(this.refs.selectReBootSelect);
        //this.props.loadData(e);
    }

    componentDidMount() {
        this.props.loadData();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            options: nextProps && nextProps.options ? nextProps.options : [],
        });
    };

    render() {
        return (
            <div className="form-group">
                <div className="input-group" style={{width: '70%'}}>
                    <select  ref="selectReBootSelect" onChange={(e)=>{this.props.onChange(e)}}>
                       {
                            (isArray(this.state.options) && this.state.options.length > 0) ?
                                this.state.options && this.state.options.map((itm, i) => {
                                    return <option key={i}
                                                   value={itm[this.state.valueKey]}>{itm[this.state.labelKey]}</option>
                                })
                                : <option/>
                        }
                    </select>
                </div>

            </div>
        )
    }
}