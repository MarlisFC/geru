import React from 'react';
import {isEmpty,forEach} from 'lodash';
import { FormControl, FormGroup, Button,Row,Col, ControlLabel} from 'react-bootstrap';
import {ActionRequest} from "../../../utils/Request"
import {MASKS, METHODS, REGULAR_EXPRESSIONS} from "../../../config/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaskedTextInput from 'react-text-mask';
import 'jquery/dist/jquery';
import {ReBootSelect} from "../../../utils/ReBootSelect";

class Step2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            errors: {},
            object: {
                number: '',
                date: '',
                by: '',
                sex: 'Feminino',
                id:'',
            },
            valid: false,
            redirectToEditContact: false,
            send:false,
            by_options:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.addContact = this.addContact.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.getBy = this.getBy.bind(this);
    }


    componentDidMount() {}

    componentWillUnmount() {}



    getBy = () => {
        const fields=[
            { value: "", label: "Selecione" },
            { value: "SSP", label: "Secretaria de Segurança Pública" },
            { value: "PM", label: "Polícia Militar" },
            { value: "PC", label: "Policia Civil" },
            { value: "CNT", label: "Carteira Nacional de Habilitação" },
            { value: "DIC", label: "Diretoria de Identificação Civil" },
            { value: "CTPS", label: "Carteira de Trabaho e Previdência Social" },
            { value: "FGTS", label: "Fundo de Garantia do Tempo de Serviço" },
            { value: "IFP", label: "Instituto Félix Pacheco" },
            { value: "IPF", label: "Instituto Pereira Faustino" },
            { value: "IML", label: "Instituto Médico-Legal" },
            { value: "MTE", label: "Ministério do Trabalho e Emprego" },
            { value: "MMA", label: "Ministério da Marinha" },
            { value: "MAE", label: "Ministério da Aeronáutica" },
            { value: "MEX", label: "Ministério do Exército" },
            { value: "POF", label: "Polícia Federal" },
            { value: "POM", label: "Polícia Militar" },
            { value: "SES", label: "Carteira de Estrangeiro" },
            { value: "SJS", label: "Secretaria da Justiça e Segurança" },
            { value: "SJTS", label: "Secretaria da Justiça do Trabalho e Segurança" },
            { value: "ZZZ", label: "Outros (inclusive exterior)" }
        ];

        let options = [];
        forEach(fields, function(value) {
            options.push({value: value.value, label: value.label});
            }
        );
         this.setState({by_options: options});
    };

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

    selectBy = (input) => {
        let object = this.state.object;
        object['by'] = input ? input.value : '';
        this.setState({object},() => {
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

    handleChangeSex= (e) => {
        let object=this.state.object;
        if(object.sex==='Feminino')
              object.sex= 'Masculino';
        else
              object.sex= 'Feminino';

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
            <Row>
                <Col  md={10}  sm={1} style={{textAlign:'center'}}>
                    <FormGroup className="preview__title_label" style={{paddingTop:'30px'}}>
                        <ControlLabel >DADOS PESSOAIS</ControlLabel>
                    </FormGroup>
                </Col>
            </Row>
            <Row   style={{textAlign:'center'}}>
                <Col md={2}  sm={1}> </Col>
                <Col md={2}  sm={1}>
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
                </Col>
                <Col md={2}  sm={1}>
                    <FormGroup>
                        <ControlLabel className="preview__title_contact">DATA DE EMISSAO </ControlLabel>
                        <div className="preview__inline_block">
                            <ControlLabel className="preview__label" style={{marginTop:'10px'}} ></ControlLabel>
                            <MaskedTextInput
                                mask={MASKS.DATE}
                                placeholder="mm/dd/yyyy"
                                guide={true}
                                value={this.state.object ? this.state.object.date : ''}
                                id="date"
                                className={this.state.errors['date']?"preview__block_error":"preview__block_normal"}
                                onChange={this.handleChange}
                                onClick={this.handleFocus}
                            />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2}  sm={4}>
                    <FormGroup style={{marginRight: '40px'}}>
                        <ControlLabel className="preview__title_contact">ORGAO EXPEDIDOR</ControlLabel>
                        <div className="preview__inline_block">
                            <ControlLabel className="preview__label" style={{marginTop:'10px'}} ></ControlLabel>
                            <ReBootSelect
                                name="form-field-name"
                                value={this.state.object ? this.state.object.by : ''}
                                id="by"
                                options={this.state.by_options}
                                loadData={this.getBy}
                                onChange={event => this.selectBy(event.target)}
                                className={this.state.errors['by']?"preview__block_error":"preview__block_normal"}
                                onClick={this.handleFocus}
                            />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2} sm={4}>
                    <FormGroup className={this.state.errors['sex']?"preview__btn_error":"preview__btn_normal"}>
                        <ControlLabel className="preview__title_contact" style={{marginRight:'5px'}}>Masculino </ControlLabel>
                        <FormControl
                            type="checkbox"
                            id="sex"
                            value={this.state.object ? this.state.object.sex : ''}
                            className={this.state.errors['sex']?"preview__block_error":"preview__block_normal"}
                            onChange={this.handleChangeSex}
                            onClick={()=> this.handleFocus}
                        />
                    </FormGroup>
               </Col>
            </Row>
            <Row >
                <Col md={4}  sm={1}> </Col>

            </Row>
            <Row style={{marginTop:'45px'}}>
                <Col md={12}  sm={4}>
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




