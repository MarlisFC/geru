import React from 'react';
import {Switch,Route} from 'react-router-dom'
import ContactList from "../routes/contact/subviews/ContactList";
import {User} from "./User";

export class Container extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" name="User" component={User}/>
                    <Route exact path="/contact_list/" name="Contact List" component={ContactList}/>
                </Switch>
            </div>
        )
    }
}