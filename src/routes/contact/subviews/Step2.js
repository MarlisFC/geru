import React from 'react';
import {isEmpty} from 'lodash';
import { FormControl, FormGroup, Button,Row,Col, ControlLabel} from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import {formatSQLFormat} from "../../../utils/DateUtils";
import {ActionRequest} from "../../../utils/Request"
import {MASKS, METHODS, REGULAR_EXPRESSIONS} from "../../../config/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaskedTextInput from 'react-text-mask';




class Step2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            errors: {},
            object: {
                number: '',
                date: '',
                by: '',
                sex: ''
            },
            valid: false,
            redirectToEditContact: false,
            send:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.addContact = this.addContact.bind(this);
    }


    componentDidMount() {}

    componentWillUnmount() {}



    handleChange = (e) => {
        const object = this.state.object;
        object[e.target.id] = e.target.value;
        console.log(e.target);

        this.setState({object}, () => {
            this.validateInput();
        });
    };

    handleFocus = (e) => {
        e.target.className='preview__block_focus';
    };

    validateInput = () => {
        let errors = {};
        if (!this.state.object.number) {
             errors.number = "number";
        }
        let date = this.state.object.date;
        if (date && date.toString().length) {
            if (!date.match(REGULAR_EXPRESSIONS.DATE)) {
                errors.date = "date";
            }
        }
        else
            errors.date="date";

        if (!this.state.object.by) {
            errors.by = "by";
        }
        if (!this.state.object.sex) {
            errors.sex = "sex";
        }
        console.log(errors);
        this.setState({valid: isEmpty(errors), errors});
    };

    handleChangeSex= (sex) => {
        let object=this.state.object;
        object.sex= sex;
        this.setState({object},() => {
            this.validateInput();
        });
    };
    handleChangeDate = (date) => {
        let object = this.state.object;
        object['date'] = date;//moment(date).format("L").toString();
        this.setState({object},() => {
            this.validateInput();
        });
    };



    addContact(){
        const { dispatch } = this.props;
        let url = 'http://5ade474bbf932f0014d11a7e.mockapi.io/geru';
        let object=this.state.object;

        ActionRequest(url, METHODS.POST, (info) => {
            this.setState({object: info}, () => {
                toast.success("The contact was created correctly");
            })
        }, object) ;
    }

    render(){const CONTACT_FORM  =(<div> <ToastContainer autoClose={5000} />

        <FormGroup style={{background:'#fff'}}>
            <Row >
                <Col  md={12} style={{textAlign:'center'}}>
                    <FormGroup className="preview__title_label" style={{paddingTop:'30px'}}>
                        <ControlLabel >DADOS PESSOAIS</ControlLabel>
                    </FormGroup>
                </Col>
            </Row>
            <Row   style={{textAlign:'center'}}>
                <Col md={4}></Col>
                <Col md={4} >
                    <FormGroup style={{display:'flex',justifyContent:'center',margin:'30px 30px'}}>
                        <FormGroup >
                            <div>
                                <ControlLabel className="preview__title_contact">NUMERO DO RG</ControlLabel>
                            </div>
                            <div>
                                <FormControl
                                    type="text"
                                    id="number"
                                    value={this.state.object ? this.state.object.number : ''}
                                    className={this.state.errors['number']?"preview__block_error":"preview__block_normal"}
                                    onChange={this.handleChange}
                                    onClick={this.handleFocus}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="preview__title_contact">DATA DE EMISSAO </ControlLabel>
                            <div className="preview__inline_block">
                                <ControlLabel className="preview__label" style={{marginTop:'10px'}} ></ControlLabel>
                                <MaskedTextInput
                                    mask={MASKS.DATE}
                                    placeholder="##/##/####"
                                    guide={true}
                                    value={this.state.object.date}
                                    id="date"
                                    className={this.state.errors['date']?"preview__block_error":"preview__block_normal"}
                                    onChange={this.handleChange}
                                    onClick={this.handleFocus}
                                />
                            </div>

                        </FormGroup>

                        <FormGroup style={{marginRight: '40px'}}>
                            <ControlLabel className="preview__title_contact">ORGAO EXPEDIDOR</ControlLabel>
                            <div className="preview__inline_block">
                                <ControlLabel className="preview__label" style={{marginTop:'10px'}} ></ControlLabel>
                                <FormControl
                                    type="text"
                                    id="by"
                                    value={this.state.object ? this.state.object.by : ''}
                                    className={this.state.errors['by']?"preview__block_error":"preview__block_normal"}
                                    onChange={this.handleChange}
                                    onClick={this.handleFocus}
                                />
                            </div>

                        </FormGroup>
                    </FormGroup>


                </Col>
                <Col md={4}></Col>
            </Row>
            <Row >
                <Col md={4}></Col>
                <Col md={4} style={{textAlign:'center'}}>
                    <FormGroup className={this.state.errors['sex']?"preview__btn_error":"preview__btn_normal"}>
                        <ControlLabel className="preview__title_contact" style={{marginRight:'5px'}}>SEXO </ControlLabel>
                        <Button className="preview__btn" data-tip="MASCULINO" onClick={()=> this.handleChangeSex("MASCULINO")} >
                            MASCULINO <i className="fa fa-arrow-right"/>
                        </Button>
                        <ControlLabel className="preview__label" ></ControlLabel>
                        <Button className="preview__btn" data-tip="FEMININO" onClick={()=> this.handleChangeSex("FEMININO")}>
                            FEMININO <i className="fa fa-arrow-right"/>
                        </Button>
                    </FormGroup>
                </Col>
                <Col md={4}></Col>
            </Row>
            <Row style={{marginTop:'45px'}}>
                <Col md={12}>
                    <FormGroup className="preview__title_label ">
                        <Button className="btn btn-icon green" data-tip="CONTINUAR" onClick={()=> this.addContact()}  disabled={!this.state.valid}>
                            CONTINUAR   <i className="fa fa-arrow-right"/>
                        </Button>
                    </FormGroup>
                </Col>
            </Row>

        </FormGroup>
         </div>)
        return (
            <div >{CONTACT_FORM}</div>

        )
    }
}

export  default Step2;




