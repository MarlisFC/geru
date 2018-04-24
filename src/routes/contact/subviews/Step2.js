import React from 'react';
import {isEmpty} from 'lodash';
import { FormControl, FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import {formatSQLFormat} from "../../../utils/DateUtils";
import {ActionRequest} from "../../../utils/Request"
import {METHODS} from "../../../config/config"
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

        this.setState({object}, () => {
            this.validateInput();
        });
    };

    validateInput = () => {
        let errors = {};
        if (!this.state.object.number) {
             errors.number = "number";
        }
        let date = this.state.object.date;
        if (date && date.toString().length) {
            if (!date.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/)) {
                errors.date = "date";
            }
        }
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
        <div className="row">
            <div className="col-md-12" style={{textAlign:'center'}}>
                <div className="preview__title_label">
                    <label>DADOS PESSOAIS</label>
                </div>
             </div>
        </div>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <div className="preview__inline_block">
                    <FormGroup >
                        <div>
                            <label className="preview__title_contact">NUMERO DO RG</label>
                        </div>
                        <div>
                           <input
                                type="text"
                                id="number"
                                value={this.state.object ? this.state.object.number : ''}
                                className={this.state.errors['number']?"preview__block_error":"preview__block_error"}
                                onChange={this.handleChange}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label className="preview__title_contact">DATA DE EMISSAO </label>
                        <div className="preview__inline_block">
                            <label className="preview__label" style={{marginTop:'10px'}} ></label>
                            <MaskedTextInput
                                mask={[/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]}
                                placeholder="##/##/####"
                                guide={true}
                                value={this.state.object.date}
                                id="date"
                                className={this.state.errors['date']?"preview__block_error":"preview__block_error"}
                                onChange={this.handleChange}
                            />
                            <HelpBlock>
                                <span className="label label-danger">{this.state.errors['date_test']}</span>
                            </HelpBlock>
                        </div>

                    </FormGroup>

                    <FormGroup style={{marginRight: '40px'}}>
                        <ControlLabel className="preview__title_contact">ORGAO EXPEDIDOR</ControlLabel>
                        <div className="preview__inline_block">
                            <label className="preview__label" style={{marginTop:'10px'}} ></label>
                            <input
                                type="text"
                                id="by"
                                value={this.state.object ? this.state.object.by : ''}
                                className={this.state.errors['by']?'preview__block_error':''}
                                onChange={this.handleChange}
                            />
                        </div>

                    </FormGroup>
                </div>

            </div>
            <div className="col-md-4"></div>
     </div>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <FormGroup>
                        <ControlLabel className="preview__title_contact" style={{marginRight:'5px'}}>SEXO </ControlLabel>
                        <button className={this.state.errors['sex']?'preview__btn _error':'btn preview__btn'} data-tip="MASCULINO" onClick={()=> this.handleChangeSex("MASCULINO")} >
                            MASCULINO <i className="fa fa-arrow-right"/>
                        </button>
                        <label className="preview__label" ></label>
                        <button className="btn preview__btn " data-tip="FEMININO" onClick={()=> this.handleChangeSex("FEMININO")}>
                            FEMININO <i className="fa fa-arrow-right"/>
                        </button>
                </FormGroup>
             </div>
            <div className="col-md-4"></div>
        </div>
        <div className="step step1" >
            <div >

                <div className="row">
                    <div className="col-md-12">
                        <div className="preview__title_label ">
                            <button className="btn btn-icon green" data-tip="CONTINUAR" onClick={()=> this.addContact()}  disabled={!this.state.valid}>
                                CONTINUAR   <i className="fa fa-arrow-right"/>
                            </button>
                        </div>


                    </div>
            </div>
            </div>
        </div> </div>)
        return (
            <div >{CONTACT_FORM}</div>

        )
    }
}

export  default Step2;




