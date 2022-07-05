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
