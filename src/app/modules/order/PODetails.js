import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Http from '../../services/Http'
import { capitalizeFirstLetter, changeDateFormat, getShortName, renderMultiColor } from '../../services/Util'
import Tooltip from '@mui/material/Tooltip'
import LoaderComponent from '../../common/LoaderComponent'
import { toast } from 'react-toastify'

const PODetails = () => {
  const [orderList, setOrderList] = useState()
  const [loader, setLoader] = useState(true)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    Http.GET('getOrderQuotes', `${params.orderId}`)
      .then((response) => {
        setOrderList(response.data)
        setLoader(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        setLoader(false)
      })
  }, [])

  const getColorWisePrice = (colorWisePrices, id) => {
    if (colorWisePrices && colorWisePrices[id]) {
      return colorWisePrices[id]
    }
    return null
  }

  const getSizeWisePrice = (sizeWisePrices, id) => {
    if (sizeWisePrices && sizeWisePrices[id]) {
      return sizeWisePrices[id]
    }
    return null
  }

  const renderColorWiseList = (order) => {
    return (
      <table className='table'>
        <thead>
        <tr>
          <th></th>
          {order.colorWiseSizeQuantityPairList &&
            order.colorWiseSizeQuantityPairList.length > 0 &&
            order.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map(
              (value) => (
                <th key={value.code}>
                  <p className='semibold-14'>{value.code}</p>
                </th>
              )
            )}
          <th>QTY</th>
          {order.buyerQuotationType === 'COLORWISE' && <th>Price</th>}
        </tr>
        </thead>
        <tbody>
        {order?.colorWiseSizeQuantityPairList &&
          order.colorWiseSizeQuantityPairList.map((value, index) => {
            let qty = 0
            return (
              <tr key={`colors_${index}`}>
                <td>
                  <span key={value.id}>{renderMultiColor(value)}</span>
                </td>
                {value &&
                  value.sizeQuantityPairList.map((style, inputIndex) => {
                    if (style.quantity) {
                      qty += style.quantity
                    }
                    return (
                      <td key={`style_${inputIndex}`}>
                        <p>{style.quantity}</p>
                      </td>
                    )
                  })}
                <td>{qty}</td>
                {order.buyerQuotationType === 'COLORWISE' && (
                  <td>
                    <p>
                      {getColorWisePrice(
                        order.colorWiseBuyerPrice,
                        value.id
                      )}
                    </p>
                  </td>
                )}
              </tr>
            )
          })}
        {order.buyerQuotationType === 'SIZEWISE' && (
          <tr>
            <td></td>
            {order.colorWiseSizeQuantityPairList &&
              order.colorWiseSizeQuantityPairList[0].sizeQuantityPairList.map(
                (style) => (
                  <td key={style.size}>
                    <p>
                      {getSizeWisePrice(
                        order.sizeWiseBuyerPrice,
                        style.size
                      )}
                    </p>
                  </td>
                )
              )}
          </tr>
        )}
        </tbody>
      </table>
    )
  }

  const uniqueStyleName = (order) => {
    switch (order.buyerQuotationType) {
      case 'DESIGNWISE':
        return 'design-wise'
      case 'COLORWISE':
        return 'color-wise'
      default:
        return 'size-wise'
    }
  }

  const redirectToDesignView = (productId) => {
    history.push(`/designs/view/${productId}`)
  }

  const renderOrderList = () => {
    return orderList?.map((order, index) => {
      return (
        <div
          className={`single-design d-flex bg-white ${uniqueStyleName(order)}`}
          key={`po_order_${index}`}
        >
          <div className='design-image' onClick={() => redirectToDesignView(order.productId)}>
            <img src={order?.documentResponseList[0]?.docUrl} alt='' />
          </div>
          <div className='design-details-info'>
            <div className='design-title mt-3 d-flex justify-content-between'>
              <h3 className='semibold-16 mb-0' onClick={() => redirectToDesignView(order.productId)}>
                <Tooltip title={order.name} placement='top' arrow>
                  <span>{getShortName(order.name, 18)}</span>
                </Tooltip>
                <span className='regular-12 gray_dark_02'>
                                    ({order.productReferenceNumber})
                                </span>
              </h3>
            </div>
            <div className='po-details-view'>
              <div className='po-info-colums-view'>
                <ul>
                  <li>PO: {order.poNumber}</li>
                  <li>ETD:&nbsp;
                    {changeDateFormat(order.deliveryDate, 'YYYY-MM-DD', 'DD-MMM-YYYY')}
                  </li>
                </ul>
              </div>
              <div className='po-quantity-colums-view'>
                <ul>
                  <li>
                    <span>{order?.colorWiseSizeQuantityPairList?.length}</span>{' '}
                    colors
                  </li>
                  <li>
                                        <span>
                                            {
                                              order?.colorWiseSizeQuantityPairList[0]
                                                ?.sizeQuantityPairList?.length
                                            }
                                        </span>{' '}
                    size
                  </li>
                </ul>
                <div className='values d-flex mt-1'>
                  <div className='total-value'>
                    <span className='regular-14 gray_dark_02'>Total Qty:</span>
                    <span className='semibold-14'> {order.quantity}</span>
                  </div>
                  <div className='total-value ml-2'>
                    <span className='regular-14 gray_dark_02'>Price:</span>
                    <span className='semibold-14'> ${order.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='design-quantity-table mt-2      '>
            <div className='text-right mb-2'>
              <p className='regular-14'>
                {capitalizeFirstLetter(order.buyerQuotationType)} {order.priceType ? order.priceType : 'FOB'}
              </p>
            </div>
            <div className='design-table'>
              <div className='category-wise-table size-wise-table'>
                {renderColorWiseList(order)}
                {order.buyerQuotationType === 'DESIGNWISE' && (
                  <div className='total-units text-right'>
                                        <span className='regular-14 gray_dark_02'>
                                            Unit price:{' '}
                                          <span className='semibold-14 unit-price-total'>
                                                ${order.designWiseBuyerPrice}
                                            </span>
                                        </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <LoaderComponent loading={loader}>
      <div className='create-order-container'>
        <div className='designs-info-section'>
          <h3 className='semibold-16 mb-2'>
            <img
              src='/icons/Left arrwo.svg'
              alt='back'
              className='back-icon'
              onClick={history.goBack}
            />{' '}
            PO details
          </h3>
          <div className='designs-row'>{renderOrderList()}</div>
        </div>
      </div>
    </LoaderComponent>
  )
}

export default PODetails
