import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageViewer from 'react-simple-image-viewer';

import { renderPaymentStatus } from '../../../services/Util';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT, BASE_URL } from '../../../constant';

class Invoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          amount : '',
          invoiceDate : '',
          amountError : '',
          invoiceDateError : '',
          invoiceDetails : {},
          selectedSlip : '',
          imageViewerFlag : false,
          imageViewerData : []
        };
    }

    componentDidMount = () => {
      // console.log("invoice from invoice",this.props.invoice)
    }

    componentDidUpdate = (prevProps, prevState) => {
      if(prevProps.invoice !== this.props.invoice) {
        console.log("invoice from invoice",this.props.invoice)
      }
    }

    render() {
        let { invoice } = this.props;
        return (
          <LoadingOverlay
            active={this.state.loading}
            styles={{
              overlay: (base) => ({
                ...base,
                background: LOADER_OVERLAY_BACKGROUND
              }),
              spinner: (base) => ({
                ...base,
                width: LOADER_WIDTH,
                position: LOADER_POSITION,
                top: LOADER_TOP,
                left: LOADER_LEFT,
                marginTop: LOADER_MARGIN_TOP,
                marginLeft: LOADER_MARGIN_LEFT,
                '& svg circle': {
                  stroke: LOADER_COLOR
                }
              }),
              content: (base) => ({
                ...base,
                color: LOADER_COLOR
              })
            }}
            spinner
            text={LOADER_TEXT}>
                <table align="center" cellPadding="0" cellSpacing="0" width="100%" className="invoice">
                    <tbody>
                        {/*<tr>*/}
                        {/*    <td align="center" valign="top" height="40"></td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td align="center" valign="top" style={{paddingTop: 0}}>
                                <table className="invoice-width" align="center" cellPadding="0" cellSpacing="0" width="100%" bgcolor="#FFFFFF">
                                <tbody className="header-invoice" align="center" cellPadding="0" cellSpacing="0" width="100%" bgcolor="#f6f6f6" style={{background: '#f4fcff'}}>
                                    {/* <tr><td width="1"></td>
                                    </tr> */}
                                    <tr>
                                        <td align="center" valign="middle" width="70%" style={{paddingBottom: 30,paddingTop: 30,borderBottom: '3px solid #F47920',background: '#4B3393'}}>
                                            <h1 style={{textAlign: 'left', marginLeft: 40, color: '#fff', fontWeight: 500, marginBottom: 0}}>INVOICE {`#${invoice.id ? invoice.id : ''}`}</h1>
                                        </td>
                                        <td align="center" valign="top" width="70%" style={{color: '#fff',paddingBottom: 30,paddingTop: 30,borderBottom: '3px solid #F47920',background: '#7F56F8'}}>
                                            <span>Amount Due (USD)</span>
                                            <h2 style={{marginBottom: 0}}>${invoice.dueAmount ? Math.abs(invoice.dueAmount) : ''}</h2>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td width="1"></td>
                                     </tr> */}
                                </tbody>
                                </table>
                                <table className="invoice-width" align="center" cellPadding="0" cellSpacing="0" width="100%" bgcolor="#FFFFFF">

                                    <tbody>
                                        <tr>
                                            <td width="40"></td>
                                            <td align="center" valign="top">
                                                <table align="center" cellPadding="0" cellSpacing="0" width="100%">
                                                    <tbody>
                                                        {/* <tr>
                                                            <td align="left" valign="top" colSpan="2" height="40"></td>
                                                        </tr> */}
                                                        <tr>
                                                            <td align="left" valign="top" width="60%" style={{paddingRight: 60}}>
                                                                <table align="left" cellPadding="0" cellSpacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="left" style={{color: 'rgba(0,0,0,0.9)',lineHeight: '26px',fontSize: 17,fontFamily:'Helvetica, sans-serif'}}>
                                                                                <span style={{fontSize: 13, color: '#666'}}>Bill to</span> <br/>
                                                                                <strong style={{marginBottom: 10,display: 'inline-block'}}>{invoice.name ? invoice.name : ''}</strong>  <br/>
                                                                                <div dangerouslySetInnerHTML={{ __html: invoice.address ? invoice.address : '' }} />
                                                                                {/*<p style={{maxWidth: 215, fontSize: 14, lineHeight: '20px', color: '#333'}}>{invoice.address ? invoice.address : ''}
                                                                                    </p>*/}
                                                                                <p style={{maxWidth: 215, fontSize: 14, lineHeight: '20px', color: '#333',fontWeight: 600,margin: '10px 0 0 0'}}>{invoice.email ? invoice.email : ''}</p>

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <td align="left" valign="top" width="40%">
                                                                <table align="left" cellPadding="0" cellSpacing="0" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="left" style={{color: 'rgba(0,0,0,0.9)',fontSize: 17,lineHeight: '26px',fontFamily:'Helvetica, sans-serif'}}>
                                                                                <p style={{fontSize: 14, lineHeight: '20px', color: '#333',fontWeight: 600,margin: '0 0 5px 0', textAlign: 'right'}}>Invoice date: <span style={{fontWeight: 'normal'}}>{invoice.date ? invoice.date : ''}</span></p>
                                                                                <p style={{fontSize: 14, lineHeight: '20px', color: '#333',fontWeight: 600,textAlign: 'right'}}>Due date: <span style={{fontWeight: 'normal'}}>{invoice.dueDate ? invoice.dueDate : ''}</span></p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td align="left" valign="top" colSpan="2" height="60"></td>
                                                        </tr> */}
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="40"></td>
                                        </tr>

                                        <tr>
                                            <td width="40" bgcolor="#fff">&nbsp;</td>
                                            <td valign="top">
                                                <table align="center" cellPadding="0" cellSpacing="0" width="100%" bgcolor="#fff">
                                                    <thead>
                                                        <tr style={{color: '#333',fontSize: 14,fontFamily:'Helvetica, sans-serif', paddingTop: 8, paddingLeft: 0, paddingRight: 0}}>
                                                            <th align="left" style={{width: '35%', padding: 0, borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: 'transparent', fontSize: 14, fontWeight: 'bold',textAlign: 'left'}}>
                                                                ITEMS</th>
                                                            <th style={{width: '15%', padding: 0, borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: 'transparent', fontSize: 14, fontWeight: 'bold',textAlign: 'center'}}>
                                                                QUANTITY</th>
                                                            <th style={{width: '5%', padding: 0, borderTop: '1px solid #eee', borderBottom: '1px solid #eee', background: 'transparent', fontSize: 14, fontWeight: 'bold',textAlign: 'right'}}>
                                                                UNIT PRICE</th>
                                                        </tr>
                                                    </thead>


                                                    <tbody>
                                                    {
                                                      invoice.productList ?
                                                      invoice.productList.map((item, i) => {
                                                        return(
                                                          <tr key={i}>
                                                              <td align="left" valign="middile" style={{color: '#000',fontSize: 14,fontFamily:'Helvetica, sans-serif', padding: '10px 0',textTransform: 'capitalize',textAlign: 'left'}}>
                                                                  {item.name}</td>
                                                              <td align="center" valign="middile" style={{color: '#000',fontSize: 14,fontFamily:'Helvetica, sans-serif',padding: '10px 0',textAlign: 'center'}}>
                                                                  {item.quantities}</td>
                                                              <td align="center" valign="middile" style={{color: '#000',fontSize: 14,fontFamily:'Helvetica, sans-serif', padding: '10px 0',textAlign: 'right'}}>
                                                                  ${item.unitPrice}</td>
                                                          </tr>
                                                        )
                                                      }) :
                                                      <></>
                                                    }
                                                    </tbody>

                                                    <tfoot>
                                                        <tr>
                                                            <td align="left" valign="top" width="100%" colSpan="4" height="10" style={{borderTop: '1px solid #eee'}}>&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" align="right" valign="top" style={{color: '#444',fontFize: 14,fontFamily:'Helvetica, sans-serif',paddingBottom: 8}}>
                                                               <strong>Total:</strong>
                                                            </td>
                                                            <td colSpan="1" align="right" valign="top" style={{color: '#444',fontFize: 14,fontFamily:'Helvetica, sans-serif',paddingBottom: 8}}>
                                                                <strong style={{width: 85, display: 'inline-block'}}>${invoice.amount ? invoice.amount : ''}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" align="right" valign="top" style={{color: '#000000',fontSize: 16,fontFamily:'Helvetica, sans-serif',paddingTop: 10,borderTop: '1px solid #eee',fontWeight: 'bold'}}>
                                                                Amount Due (USD):
                                                            </td>
                                                            <td colSpan="1" align="right" valign="top" style={{color: '#f47920',fontSize: 18,fontFamily:'Helvetica, sans-serif',paddingTop: 10,borderTop: '1px solid #eee'}}>
                                                                <strong style={{width: 150, display: 'inline-block'}}>${invoice.dueAmount ? invoice.dueAmount : ''}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" width="100%" colSpan="2" height="20" style={{lineHeight:'0px'}}>&nbsp;</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="1"></td>
                                            <td align="center" valign="top">
                                                <table align="center" cellPadding="0" cellSpacing="0" width="100%">
                                                    <tbody style={{textAlign: 'center'}}>
                                                        <tr>
                                                            <td style={{textAlign: 'left'}}>
                                                                <strong style={{fontSize:14}}>{invoice.note ? 'Notes / Terms' : ''}</strong> <br/>
                                                                <div dangerouslySetInnerHTML={{ __html: invoice.note ? invoice.note : '' }} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="1"></td>
                                        </tr>

                                        <tr>
                                            <td width="1"></td>
                                            <td align="center" valign="top">
                                                <table className="invoice-footer" align="center" cellPadding="0" cellSpacing="0" width="100%">
                                                    <tbody style={{textAlign: 'left'}}>
                                                        <tr>
                                                            <td style={{borderTop: '2px solid #f47920',verticalAlign: 'top', paddingTop: 40,width: '40%'}} valign="top">
                                                                <a className="invoice-foot-logo" href="https://nitex.info/" target="_blank"><img src={require("../../../assets/images/company-logo.png")} alt=""/></a>
                                                            </td>
                                                            <td style={{borderTop: '2px solid #f47920',paddingTop: 40,width: '30%'}} valign="top">
                                                                <p>
                                                                    <strong style={{fontSize:14}}>NITEX PTE. LTD.</strong> <br/>
                                                                    <span style={{fontSize:14,maxWidth: 390, display: 'inline-block', lineHeight: '19px', color: '#444', marginTop: 6,marginBottom: 60}}>
                                                                        20 Collyer Quay, #09-01 <br/>
                                                                        Singapore, 049319 <br/>
                                                                        Singapore

                                                                    </span>
                                                                </p>
                                                            </td>
                                                            <td style={{borderTop: '2px solid #f47920',paddingTop: 40,width: '30%',textAlign: 'right'}} valign="top">
                                                                <p>
                                                                    <strong style={{fontSize:14}}>Contact Information</strong> <br/>
                                                                    <span style={{fontSize:14,maxWidth: 390, display: 'inline-block', lineHeight: '19px', color: '#444', marginTop: 6,marginBottom: 60}}>
                                                                        +65 8441 2758 <br/>
                                                                        <a href="https://nitex.info/" target="_blank">www.nitex.info</a>

                                                                    </span>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" valign="top" colSpan="0" height="10"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="1"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" height="40"></td>
                        </tr>
                    </tbody>
                </table>


          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
