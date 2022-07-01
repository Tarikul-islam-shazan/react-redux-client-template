import Http from '../Http'

export const getMoodboardList = async (params) => {
    return Http.GET('getMoodboardList')
}
