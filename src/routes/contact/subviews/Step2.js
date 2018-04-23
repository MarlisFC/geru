import React from 'react';
import {isEmpty} from 'lodash';
import { FormControl, FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import {formatSQLFormat} from "../../../utils/DateUtils";
import {ActionRequest} from "../../../utils/Request"
import {METHODS} from "../../../config/config"
import {Toast} from "../../../components/Toast/Toast"



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
            sex_:'',
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
        e.target.style.border='1px solid #2cacff';
        this.setState({object}, () => {
            this.validateInput();
        });
    };

    validateInput = () => {
        let errors = {};
        if (!this.state.object.number) {
             errors.number = "This field is required";
        }
        if (!this.state.object.date) {
            errors.date = "This field is required";
        }
        if (!this.state.object.by) {
            errors.by = "This field is required";
        }
        if (!this.state.object.sex) {
            errors.sex = "This field is required";
        }
        console.log("errrrrr",errors);
        console.log("errrrrr",this.state.object);
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
        let url = 'http://5ad8e015dc1baa0014c60c66.mockapi.io/geru/';
        let object=this.state.object;
        //object.date= formatSQLFormat(this.state.object.date);
        //this.setState({object});
        ActionRequest(url, METHODS.POST, (info) => {
            this.setState({object: info}, () => {
               Toast.success("The contact was created correctly");
            })
        }, object)

        ;
    }

    render(){const CONTACT_FORM  =(<div>
        <div className="step step1">
            <div className="preview__block">
                <div className="row">
                     <div >
                            <FormGroup >
                                <ControlLabel className="preview__title_contact">NUMERO DO RG</ControlLabel>
                                <FormControl
                                    type="text"
                                    id="number"
                                    value={this.state.object ? this.state.object.number : ''}
                                    className={this.state.errors['number']?'preview__block_error':''}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4" style={{padding:'10px'}}>
                            <FormGroup>
                                <ControlLabel className="preview__title_contact">DATA DE EMISSAO </ControlLabel>
                                <Flatpickr
                                    id="date"
                                    value={this.state.object ? this.state.object.date : ''}
                                    className={this.state.errors['date']?'preview__block_error':'preview__block_block'}
                                    onChange={this.handleChangeDate}
                                 />
                            </FormGroup>
                        </div>
                        <div >
                            <FormGroup style={{marginRight: '40px'}}>
                                <ControlLabel className="preview__title_contact">ORGAO EXPEDIDOR</ControlLabel>
                                <FormControl
                                    type="text"
                                    id="by"
                                    value={this.state.object ? this.state.object.by : ''}
                                    className={this.state.errors['by']?'preview__block_error':''}
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                        </div>
                    </div>
                 <div className="preview__block__">
                    <div className="row">
                           <FormGroup>
                                <ControlLabel className="preview__title_contact" style={{marginRight: '8px'}}>SEXO  </ControlLabel>
                                <button className={this.state.errors['sex']?'preview__btn _error':'btn preview__btn'} data-tip="MASCULINO" onClick={()=> this.handleChangeSex("MASCULINO")} >
                                    MASCULINO <i className="fa fa-arrow-right"/>
                                </button>
                                <button className="btn preview__btn " data-tip="FEMININO" onClick={()=> this.handleChangeSex("FEMININO")}>
                                    FEMININO <i className="fa fa-arrow-right"/>
                                </button>
                            </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-icon green" data-tip="CONTINUAR" onClick={this.addContact()} style={{float:'center',marginTop:'30px',marginLeft:'45%'}} disabled={!this.state.valid}>
                             CONTINUAR   <i className="fa fa-arrow-right"/>
                        </button>
                    </div>
            </div>
            </div>
        </div> </div>)
        return (
            <div>{CONTACT_FORM}</div>

        )
    }
}

export  default Step2;




