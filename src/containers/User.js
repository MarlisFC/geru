import React from 'react';
import StepZilla from 'react-stepzilla'
import Step2 from "../routes/contact/subviews/Step2";
import {Step1} from "../routes/contact/subviews/Step1";
import {  FormGroup,Row,Col, ControlLabel,Grid} from 'react-bootstrap';



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
                { name: 'SIMULE', component: <Step1/>},
                { name: 'PREENCHA O CADASTRO',component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                { name: 'REVISE SEU PEDIDO', component: <Step1/>},
                { name: 'FINALIZE O PEDIDO', component: <Step1/>}

            ]
        return (
            <Grid className="preview__container" style={{maxWidth:'100%'}}>
                <FormGroup style={{background:'#313031',marginBottom:'0px'}}>
                    <Row  className="preview_row" >
                        <Col md={2}  sm={2} >
                            <FormGroup>
                                <ControlLabel className="preview__title">ME CHAMO:</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="preview__object ">{this.state.name}</ControlLabel>
                            </FormGroup>
                            <ControlLabel className="preview__title">CPF:</ControlLabel>
                            <ControlLabel className="preview__title" style={{color:'#fff'}}>{this.state.phone}</ControlLabel>
                        </Col>
                        <Col md={2}  sm={2} >
                            <FormGroup>
                                <ControlLabel className="preview__title">PRECISO DE:</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="preview__object">R$: </ControlLabel>
                                <ControlLabel className="preview__object ">{this.state.price}</ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col md={2}  sm={2} >
                            <FormGroup>
                                <ControlLabel className="preview__title">QUERO PAGAR EM:</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="preview__object ">{this.state.qty}</ControlLabel>
                                <ControlLabel className="preview__object"> VEZES</ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col md={3}  sm={2} >
                            <FormGroup>
                                <ControlLabel className="preview__title">PARA:</ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="preview__object ">{this.state.purpose}</ControlLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row  style={{background:'#EAE8DC'}}>
                        <Col md={12}  sm={4}>
                            <StepZilla steps={steps} stepsNavigation={true} showNavigation={false} startAtStep={1} />
                        </Col>

                    </Row>
                </FormGroup>
            </Grid>

        )
    }

};
