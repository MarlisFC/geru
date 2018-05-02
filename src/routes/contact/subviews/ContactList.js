import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {METHODS} from "../../../config/config";
import {ActionRequest} from "../../../utils/Request";
import { FormGroup, Row,Col, ControlLabel} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert'
import {Link} from 'react-router-dom';

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            paginationOptions: {
                first: 0,
                offset: 0,
                currentPage: 0,
                totalElements: 0,
                countRows: 0,
                pageSize: 10,
                pages: 0
            },
            object: {
                number: '',
                date: '',
                by: '',
                sex: 'Feminino',
                id:'',
            },
            confirmDelete: false,
            row: '',
        };
        this.setPaginationObject = this.setPaginationObject.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.prepareDelete=this.prepareDelete.bind(this)
        this.deleteRow = this.deleteRow.bind(this);

    }


    componentDidMount() {}

    componentWillUnmount() {}

    setPaginationObject(data,page){
        let first = (page.totalElements > 0 ) ? this.state.paginationOptions.offset + 1 : 0;
        let totalElements = page.totalElements;
        let currentPage = page.number + 1;
        let totalPages = page.totalPages;
        const countRows = data ? data.length + this.state.paginationOptions.offset : 0;

        let objectPagination = this.state.paginationOptions;
        objectPagination.pages = totalPages;
        objectPagination.totalElements = totalElements;
        objectPagination.first = first;
        objectPagination.countRows = countRows;
        objectPagination.currentPage = currentPage;
        this.setState({ paginationOptions: objectPagination});
    }

    prepareDelete(row_1) {
        this.setState({object: row_1});
        this.setState({confirmDelete: true});
        this.setState({row:row_1.id})
    }


    fetchData = (state) => {

        let page = 1;

        /*Armar url inicial*/
        let url = 'http://5ade474bbf932f0014d11a7e.mockapi.io/geru';

        /*Tamano de pagina*/
       /* if(state.pageSize){
            url += `&size=${state.pageSize}`;
        }*/

        ActionRequest(url,METHODS.GET,(info) => {
            let data = info.data;
            let page = info.page;
            let first;
            let totalElements;
            let currentPage;
            let totalPages;
            if (data ){
                first = (page.totalElements > 0 ) ? this.state.offset + 1 : 0;
                totalElements = page.totalElements;
                currentPage = page.number + 1;
                totalPages = page.totalPages;
                const countRows = data.length + this.state.offset;
                const paginationOptions = {
                    pages: totalPages,
                    totalElements: totalElements,
                    first: first,
                    countRows: countRows,
                    currentPage: currentPage
                };
                this.setState({data: data, paginationOptions: paginationOptions})

            } else {
                this.setState({data: []});
            }
        })

    }

    deleteRow(id) {
        this.setState({confirmDelete: false});
        const url = `http://5ade474bbf932f0014d11a7e.mockapi.io/geru/${id}`;
        ActionRequest(url, METHODS.DELETE, () => {
            toast.success("The CONTACT was deleted successfully");
            this.fetchData();
        });
            }

    render(){
        const columns = [
            {Header: 'Name', id: 'number', accessor: 'number', filterable: false},
            {Header: 'RG', id: 'by',accessor: 'by', filterable: false},
            {Header: 'Options', accessor: 'id',filterable: false,width: 120,
                Cell: row => (
                    <div style={{textAlign: 'center'}}>
                         <a title="Delete" onClick={() => this.prepareDelete(row.original)}><i  className="fa fa-close" /></a>
                     </div>
                )},];

        const CONTACT_LIST  =(

            <div>
                <ToastContainer autoClose={5000} />
                <SweetAlert
                    showCancel
                    show={this.state.confirmDelete}
                    title="Are you sure to do this?"
                    type="warning"
                    confirmBtnText="Accept"
                    cancelBtnBsStyle="default"
                    confirmBtnBsStyle="danger"
                    showCancelButton
                    onConfirm={() => {
                        this.deleteRow(this.state.row);

                    }}
                    onCancel={() => {
                        this.setState({confirmDelete: false});
                    }}
                    onEscapeKey={() => this.setState({confirmDelete: false})}
                    onOutsideClick={() => this.setState({confirmDelete: false})}
                />
                 <FormGroup style={{background:'#fff'}}>
                     <Row>
                         <FormGroup className="preview__action__" style={{fontSize: '12px'}}>
                             <Link to={`/`}>
                                 <div className="name">DE VOLTA</div>
                             </Link>
                         </FormGroup>
                     </Row>
                     <Row>
                         <Col  md={10}  sm={1} >
                             <FormGroup className="preview__title_label" style={{paddingTop:'30px'}}>
                                 <ControlLabel >DADOS</ControlLabel>
                             </FormGroup>
                         </Col>
                     </Row>
                     <Row>
                         <Col md={1}></Col>
                         <Col md={10}  sm={1}>
                             <ReactTable
                                 columns={columns}
                                 data={this.state.data}
                                 onFetchData={this.fetchData}
                                 defaultPageSize={this.state.paginationOptions.pageSize}
                                 pages={this.state.paginationOptions.pages}
                                 manual
                             />
                         </Col>
                     </Row>
                 </FormGroup>
            </div>)
        return (
            <div >{CONTACT_LIST}</div>

        )
    }
}

export  default ContactList;
