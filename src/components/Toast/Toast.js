import React from 'react';
import {ToastContainer} from 'react-toastify';

export class Toast extends React.Component {
    render() {
        return (
            <ToastContainer
                position="top-right"
                type={this.props.type ? this.props.type : "success"}
                style={{marginTop: '55px'}}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />)
    }
}