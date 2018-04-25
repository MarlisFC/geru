import React from 'react';
import {  FormGroup} from 'react-bootstrap';


//import ServerNotifications from "../components/ServerNotifications/ServerNotifications";

export const Header = () => {
    return (
        <FormGroup className="preview__header">

            <FormGroup className="preview__logo">
                <img src="assets/logo/logo_geru.png"/>
            </FormGroup>

            <FormGroup className="preview__actions">
                <FormGroup className="preview__action">
                    <a href="">
                        <i className="e-icon "></i>
                        <span>COMO FUNCIONA</span>
                    </a>
                    <a href="">
                        <i className="e-icon "></i><span>PRIVACIDADE</span>
                    </a>
                    <a href="">
                        <i className="e-icon "></i><span>AJUDA</span>
                    </a>
                </FormGroup>
            </FormGroup>

        </FormGroup>
    )
};
