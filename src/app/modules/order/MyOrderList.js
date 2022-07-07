import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as IconSearch } from '../../../assets/icons/sarchIcon.svg'
import { isPageReachBottom } from '../../services/Util'
import { closeLoader, openLoader } from '../../redux_toolkit/Loader'
import OrderThunks from '../../redux_toolkit/Order/OrderThunks'
import { GET_ORDER_LIST } from '../../redux_toolkit/@types/thunk.types'
import { useOrderSelector } from '../../redux_toolkit/Order'
import ListOfOrder from './ListOfOrder'

const MyOrderList = () => {
  const orderStore = useOrderSelector()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('RUNNING')
  const myStateRef = useRef({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (orderStore) {
      myStateRef.current = { ...myStateRef.current, ...orderStore }
      setActiveTab(orderStore?.activeTab)
    }
  }, [orderStore])

  const generateParams = (tabName, page, searchParam) => {
    let params = `?size=12&sort=id,desc&filterBy=${tabName}&page=${page}`
    if (searchParam) {
      params += `&search=${searchParam}&poNumber=${searchParam}`
    }
    return params
  }

  useEffect(() => {
    dispatch(openLoader())
    // console.log('==activeTab==', activeTab)
    let params = generateParams(activeTab, 0)
    dispatch(OrderThunks[GET_ORDER_LIST](params, false, activeTab)).finally(() => dispatch(closeLoader()))
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (isPageReachBottom()) {
      let { totalElements, currentPage, data } = myStateRef.current.orderResponse
      let activeTabName = myStateRef.current.activeTab
      if (totalElements > 0) {
        if (totalElements !== data.length) {
          dispatch(openLoader())
          let params = generateParams(
            activeTabName,
            currentPage + 1,
            myStateRef.current.searchParam
          )
          dispatch(OrderThunks[GET_ORDER_LIST](params, true, activeTabName)).finally(() =>
            dispatch(closeLoader())
          )
        }
      }
    }
  }

  const changeTab = (value) => {
    dispatch(openLoader())
    let params = generateParams(value, 0, myStateRef.current.searchParam)
    dispatch(OrderThunks[GET_ORDER_LIST](params, false, value)).finally(() => dispatch(closeLoader()))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    myStateRef.current = { ...orderStore, searchParam: e.target.value }
    changeTab(activeTab)
  }

  const renderEmptyState = () => {
    if (orderStore?.orderResponse?.data?.length === 0) {
      return (
        <div className='order-empty-state'>
          <p>No order found</p>
        </div>
      )
    }
  }

  return (
    <>
      <div className='order-list-page-container'>
        <div className='page-title'>
          <h2>Order list</h2>
        </div>
        <div className='tab-and-search d-flex align-items-center justify-content-between'>
          <div className='order-list-tab'>
            <ul>
              <li
                className={activeTab === 'RUNNING' ? 'active' : ''}
                onClick={() => changeTab('RUNNING')}
              >
                <span className='task-name regular-14'>
                  Running
                  {/*{orderStore?.countResponse?.RUNNING && (*/}
                  {/*  <span className='order-count running'>*/}
                  {/*    {orderStore.countResponse.RUNNING}*/}
                  {/*  </span>*/}
                  {/*)}*/}
                </span>
              </li>
              <li
                className={activeTab === 'PENDING' ? 'active' : ''}
                onClick={() => changeTab('PENDING')}
              >
                <span className='task-name regular-14'>
                  Pending
                  {/*{orderStore?.countResponse?.PENDING && (*/}
                  {/*  <span className='order-count pending'>*/}
                  {/*    {orderStore.countResponse.PENDING}*/}
                  {/*  </span>*/}
                  {/*)}*/}
                </span>
              </li>
              <li
                className={activeTab === 'COMPLETED' ? 'active' : ''}
                onClick={() => changeTab('COMPLETED')}
              >
                <span className='task-name regular-14'>
                  Completed
                  {/*{orderStore?.countResponse?.PENDING && (*/}
                  {/*  <span className='order-count complete'>*/}
                  {/*    {orderStore.countResponse.COMPLETED}*/}
                  {/*  </span>*/}
                  {/*)}*/}
                </span>
              </li>
            </ul>
          </div>
          <div className='search-div'>
            <span className='search order-search'>
              <IconSearch />
              <input
                type='text'
                placeholder='Search your order'
                name='search'
                value={search}
                onChange={handleSearch}
              />
            </span>
          </div>
        </div>
        <ListOfOrder orderStore={orderStore} activeTab={activeTab} />
        {renderEmptyState()}
      </div>
    </>
  )
}

export default MyOrderList
