import React from 'react';
import {Switch, Route} from 'react-router-dom';




export class Container extends React.Component {
    render() {
        return (
            <div>
                <Message/>
                <Switch>
                    <Route exact path="/payments/new" name="Payments List" component={PaymentFormPage}/>
                </Switch>
            </div>
        )
    }
}