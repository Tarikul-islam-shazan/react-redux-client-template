import Http from '../Http'

export const getMoodboardList = async (params) => {
    return Http.GET('getMoodboardList')
}

// param will be the id of the moodboard
export const getMoodboardByID = async (params) => {
    return Http.GET('getMoodboardByID', params)
}
