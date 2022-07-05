import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeDateFormat, getShortName } from '../../../services/Util'
import Tooltip from '@mui/material/Tooltip'
import TaskManage from '../../../common/TaskManage'

const AllProductionList = () => {
  const timelineStore = useSelector((store) => store.timeline)
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const params = useParams()

  const renderStepIcon = (sample) => {
    if (
      sample.formattedTaskStatus === 'APPROVED' ||
      sample.formattedTaskStatus === 'LATE_APPROVED' ||
      sample.status === 'SCOPE_OFF'
    ) {
      return '/icons/Completed-icon.svg'
    } else if (sample.formattedTaskStatus === 'EXPIRED') {
      return '/icons/Due-icon.svg'
    } else {
      return '/icons/Pending-icon.svg'
    }
  }

  const renderStepClass = (sample) => {
    if (
      sample.formattedTaskStatus === 'APPROVED' ||
      sample.formattedTaskStatus === 'LATE_APPROVED' ||
      sample.status === 'SCOPE_OFF'
    ) {
      return 'completed'
    } else if (sample.formattedTaskStatus === 'EXPIRED') {
      return 'due'
    } else {
      return 'pending'
    }
  }

  const handleTaskManager = (sample) => {
    setSelectedId(sample.id)
    setShowTaskDetailsModal(true)
  }

  const renderTaskDate = (sample) => {
    if (sample.formattedTaskStatus === 'EXPIRED') {
      return '+' + sample.dateOver
    } else if ('actualEndDate' in sample) {
      return changeDateFormat(
        sample.actualEndDate,
        'YYYY-MM-DD',
        'DD-MMM'
      )
    } else {
      return changeDateFormat(sample.endDate, 'YYYY-MM-DD', 'DD-MMM')
    }
  }

  const renderSamplingStepList = (list) => {
    return list?.map((sample, index) => {
      return (
        <div
          className={`single-task ${renderStepClass(sample)}`}
          key={`sample_index_${index}`}
          onClick={() => handleTaskManager(sample)}
          data-bs-target='#taskManageModal'
          data-bs-toggle='modal'
        >
          <div className='task-name'>
            <img src={renderStepIcon(sample)} alt='complete' />
            <Tooltip
              title={sample.stepName}
              placement={'top'}
              arrow
            >
              <span>{getShortName(sample.stepName, 25)}</span>
            </Tooltip>
          </div>
          <div className='date-details'>
            <span>{renderTaskDate(sample)}</span>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='one-third all-production-details'>
      <div className='factory-view relative'>
        <h5 className='absolute left-5 top-5'>Factory</h5>
        <img src='/images/factory-view.jpg' />
        <button className='btn bg-[#F5F5F5] text-primaryColor absolute right-5 bottom-5 w-[80px] p-4'>
          360<sup>0</sup>{' '}
        </button>
      </div>
      <div className='text-tc'>
                <span className='regular-14 gray_dark_02'>
                    Time & Action /Critical Dates
                </span>
      </div>
      <div className='production-accordion'>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <div className='accordion-header' id='headingSampling'>
              <h5 className='mb-0'>
                <button
                  className='accordion-button bg-white btn btn-link'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseSampling'
                  aria-expanded='true'
                  aria-controls='collapseSampling'
                >
                  Sampling
                </button>
              </h5>
            </div>
            <div
              id='collapseSampling'
              className='accordion-collapse bg-white collapse show'
              aria-labelledby='headingSampling'
              data-bs-parent='#accordionExample'
            >
              <div className='card-body'>
                <div className='all-task-status'>
                  {renderSamplingStepList(
                    timelineStore?.stepList?.SAMPLING
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <div
              className='accordion-header'
              id='headingProduction'
            >
              <h5 className='mb-0'>
                <button
                  className='accordion-button bg-white btn btn-link collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseProduction'
                  aria-expanded='true'
                  aria-controls='collapseProduction'
                >
                  Production
                </button>
              </h5>
            </div>
            <div
              id='collapseProduction'
              className='accordion-collapse bg-white collapse'
              aria-labelledby='headingProduction'
              data-bs-parent='#accordionExample'
            >
              <div className='card-body'>
                <div className='all-task-status'>
                  {renderSamplingStepList(
                    timelineStore?.stepList?.PRODUCTION
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <div
              className='accordion-header'
              id='headingInspection'
            >
              <h5 className='mb-0'>
                <button
                  className='accordion-button bg-white btn btn-link collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseInspection'
                  aria-expanded='true'
                  aria-controls='collapseInspection'
                >
                  Inspection
                </button>
              </h5>
            </div>
            <div
              id='collapseInspection'
              className='accordion-collapse bg-white collapse'
              aria-labelledby='headingInspection'
              data-bs-parent='#accordionExample'
            >
              <div className='card-body'>
                <div className='all-task-status'>
                  {renderSamplingStepList(
                    timelineStore?.stepList?.INSPECTION
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskManage
        timelinePanel={true}
        id={selectedId}
        orderId={params.orderId}
        closeModal={() =>
          setShowTaskDetailsModal(false)
        }
        callback={() => false}
      />
    </div>
  )
}

export default AllProductionList
