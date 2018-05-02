import React , { Component } from 'react';
import {Container} from "./Container";
import {User} from "./User";
import {Header} from "./Header";



class Layout extends Component {
    render() {
        return (
            <div >
                <Header/>
                <div>
                    <div>
                        <Container/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Layout;
