import React from 'react';
import StepZilla from 'react-stepzilla'
import Step2 from "../routes/contact/subviews/Step2";
import {Step1} from "../routes/contact/subviews/Step1";

//import {Modal, Form, FormControl, FormGroup, HelpBlock, Button, ControlLabel} from 'react-bootstrap';


export class User extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'PAUL IRISH',
            phone: '762.888.176-92',
            price: '2.000',
            qty:'12',
            purpose:'COMPRAR UNA BIKE'
        };

    }

    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        this.sampleStore = {
            ...this.sampleStore,
            ...update,
        }
    }

    render() {
        const steps =
            [
                {name: 'SIMULE', component: <Step1/>},
                { name: 'PREENCHA O CADASTRO',component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                { name: 'REVISE SEU PEDIDO', component: <Step1/>},
                { name: 'FINALIZE O PEDIDO', component: <Step1/>}

            ]
       return (
            <div className="preview__header" style={{background:'#313031'}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="preview__block" style={{marginLeft:'15%'}}>
                            <div>
                                <label className="preview__title">ME CHAMO:</label>
                            </div>
                            <div>
                                <label className="preview__object ">{this.state.name}</label>
                            </div>
                            <div>
                                <label className="preview__title">CPF:</label>
                                <label className="preview__title" style={{color:'#fff'}}>{this.state.phone}</label>
                            </div>
                        </div>
                        <span className="preview__space_first " ></span>
                        <div className="preview__block">
                            <div>
                                <label className="preview__title">PRECISO DE:</label>
                            </div>
                            <div>
                                <label className="preview__object">R$: </label>
                                <label className="preview__object ">{this.state.price}</label>
                            </div>
                        </div>
                        <span className="preview__space "></span>
                        <div className="preview__block">
                            <div>
                                <label className="preview__title">QUERO PAGAR EM:</label>
                            </div>
                            <div>
                                <label className="preview__object ">{this.state.qty}</label>
                                <label className="preview__object"> VEZES</label>
                            </div>
                        </div>
                        <span className="preview__space "></span>
                        <div className="preview__block">
                            <div>
                                <label className="preview__title">PARA:</label>
                            </div>
                            <div>
                                <label className="preview__object ">{this.state.purpose}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{marginLeft:'25%'}}>
                            <StepZilla steps={steps} stepsNavigation={true} showNavigation={false} startAtStep={1} />
                    </div>
                </div>
            </div>
        )
    }

};
