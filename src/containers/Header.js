import React from 'react';
import {Link} from 'react-router-dom';

//import ServerNotifications from "../components/ServerNotifications/ServerNotifications";

export const Header = () => {
    return (
        <div className="preview__header">

            <div className="preview__logo">
                <img src="assets/logo/logo_geru.png"/>
            </div>

            <div className="preview__actions">
                <div className="preview__action">
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
                </div>
            </div>

        </div>
    )
};
