import React from 'react'

export const TaskDetailSkeleton = () => {
  return (
    <div className='technical-specification'>
      <div className='heading-with-image d-flex'>
        <div className='task-phpto skl-bg same-radius' />
        <div className='task-title'>
          <div className='main-title skl-bg' />
          <div className='style-name skl-bg' />
        </div>
      </div>

      <div className='details-info d-flex '>
        <div className='assignee'>
          <span className='member skl-bg' />
          <span className='member skl-bg' />
          <span className='member skl-bg' />
        </div>
        <div className='date skl-bg same-radius' />
      </div>
      <div className='description same-radius skl-bg' />
      <div className='buttons'>
        <span className='single-button same-radius skl-bg' />
        <span className='single-button same-radius skl-bg' />
        <span className='single-button same-radius skl-bg' />
      </div>

    </div>
  )
}

export const TaskPostSkeleton = () => {
  return (
    <div className='task-comments-section'>

      <div className='single-comment d-flex'>
        <div className='profile-pic skl-bg' />
        <div className='all-contents'>
          <div className='name skl-bg ' />
          <div className='comment-text same-radius skl-bg' />
          <div className='reply same-radius skl-bg' />
        </div>
      </div>

      <div className='single-comment d-flex'>
        <div className='profile-pic skl-bg' />
        <div className='all-contents'>
          <div className='name skl-bg ' />
          <div className='comment-text same-radius skl-bg' />
          <div className='reply same-radius skl-bg' />
        </div>
      </div>


      <div className='single-comment d-flex'>
        <div className='profile-pic skl-bg' />
        <div className='all-contents'>
          <div className='name skl-bg ' />
          <div className='comment-text same-radius skl-bg' />
          <div className='reply same-radius skl-bg' />
        </div>
      </div>
    </div>
  )
}
