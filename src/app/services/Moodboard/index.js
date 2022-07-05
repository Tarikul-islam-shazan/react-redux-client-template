/*
This file is created by Dip Chowdhury
Date: 25/06/2022
Email: dipbd1@gmail.com or dip.chowdhury@gmail.com
Language: javascript
A gift link: https://www.youtube.com/watch?v=gEcZKtFgILQ
*/

import Http from '../Http'

export const getMoodboardList = async (params) => {
    return Http.GET('getMoodboardList')
}

// param will be the id of the moodboard
export const getMoodboardByID = async (params) => {
    return Http.GET('getMoodboardByID', params)
}

export const uploadMoodboard = async (data) => {
    // console.log(data)
    return Http.POST('addMoodboard', data)
}

export const updateMoodboard = async (data) => {
    // console.log(data)
    return Http.PUT('updateMoodboard', data)
}

export const uploadMoodboardImages = async (data, id) => {
    // console.log(data)
    // for the bellow line id will be thr id with suffix
    return Http.POST('uploadMoodboardImages', data, id)
}

export const getAllColorCodes = async (moodboardID, searchString) => {
    const params = {
        page: 0,
        size: 200,
        moodboardId: moodboardID,
        search: searchString || ''
    }
    return Http.GET('getAllColorCodes', params)
}

export const addColorToMoodboard = async (data, moodboardID) => {
    // console.log(data)
    return Http.POST('addColorToMoodboard', data, moodboardID + '/add-color')
}

export const deleteColorFromMoodboard = async (moodboardID, colorID) => {
    // console.log(data)
    return Http.DELETE(
        'deleteColorFromMoodboard',
        null,
        moodboardID + '/color/' + colorID
    )
}

export const deleteProductImage = async (id, imageID) => {
    return Http.DELETE(
        'deleteProductImage',
        null,
        id + '/product-image/' + imageID
    )
}

export const getMoodboardFabrics = async () => {
    let defaultParams={
        page:0,
        size:9,
        supplierType:'FABRIC'
    }
    return Http.GET('getMoodboardFabrics', defaultParams)
}
