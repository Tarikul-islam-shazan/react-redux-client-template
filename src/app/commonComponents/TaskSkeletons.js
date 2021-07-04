import React, { Component } from 'react';

export const TaskDetailSkeleton = () => {
  return (
    <div class="technical-specification">
         <div class="heading-with-image d-flex">
            <div class="task-phpto skl-bg same-radius"></div>
            <div class="task-title">
                <div class="main-title skl-bg"></div>
                <div class="style-name skl-bg"></div>
            </div>
         </div>

         <div class="details-info d-flex ">
             <div class="assignee">
                 <span class="member skl-bg"></span>
                 <span class="member skl-bg"></span>
                 <span class="member skl-bg"></span>
             </div>
             <div class="date skl-bg same-radius"></div>
         </div>
         <div class="description same-radius skl-bg"></div>
         <div class="buttons">
             <span class="single-button same-radius skl-bg"></span>
             <span class="single-button same-radius skl-bg"></span>
             <span class="single-button same-radius skl-bg"></span>
         </div>

    </div>
  )
}

export const TaskPostSkeleton = () => {
  return (
    <div class="task-comments-section">

        <div class="single-comment d-flex">
            <div class="profile-pic skl-bg"></div>
            <div class="all-contents">
                <div class="name skl-bg "></div>
                <div class="comment-text same-radius skl-bg"></div>
                <div class="reply same-radius skl-bg"></div>
            </div>
        </div>

        <div class="single-comment d-flex">
            <div class="profile-pic skl-bg"></div>
            <div class="all-contents">
                <div class="name skl-bg "></div>
                <div class="comment-text same-radius skl-bg"></div>
                <div class="reply same-radius skl-bg"></div>
            </div>
        </div>


        <div class="single-comment d-flex">
            <div class="profile-pic skl-bg"></div>
            <div class="all-contents">
                <div class="name skl-bg "></div>
                <div class="comment-text same-radius skl-bg"></div>
                <div class="reply same-radius skl-bg"></div>
            </div>
        </div>


    </div>
  )
}
