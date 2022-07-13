/*
This file is created by Dip Chowdhury
Date: 25/06/2022
Email: dipbd1@gmail.com or dip.chowdhury@gmail.com
Language: javascript
A gift link: https://www.youtube.com/watch?v=0MWVr_VWTQ8
*/

/*
You may observe a pattern in the code.
Which is resetting selected moodboard state on every call of the thunk.
as we have very short time, we can fix it later by using redux-saga.
or by replacing the re-calling the state initiation logic with 
pushing or poping data out of state
*/

/* eslint-disable no-console */

// action types
import {
    SET_MOODBOARD_LIST,
    SET_MOODBOARD_BY_ID,
    UPDATE_SELECTED_MOODBOARD_STATE,
    SET_COLOR_CODES,
    SET_MOODBOARD_FABRICS,
    SET_FAVOURITE_MOODBOARD,
    UNSET_FAVOURITE_MOODBOARD,
    SET_ALL_MATERIAL_CATEGORY,
    SET_ALL_MATERIAL_SUB_CATEGORY,
    SET_ALL_FILTER_DATA,
    SET_MOODBOARD_FILTER_SELECTED_FIELDS
} from '../@types/action.types'

// thunk types
import {
    GET_MOODBOARD_LIST,
    GET_MOODBOARD_BY_ID,
    UPLOAD_MOODBOARDS,
    UPDATE_MOODBOARD,
    UPLOAD_MOODBOARD_IMAGES,
    GET_COLOR_CODES,
    DELETE_PRODUCT_IMAGE,
    ADD_COLOR_CODE,
    DELETE_COLOR_FROM_MOODBOARD,
    GET_MOODBOARD_FABRICS,
    ADD_FABRIC_TO_MOODBOARD,
    DELETE_FABRIC_FROM_MOODBOARD,
    ADD_MOODBOARD_TO_FAVORITE,
    REMOVE_MOODBOARD_FROM_FAVORITE,
    GET_ALL_MATERIAL_CATEGORY,
    GET_ALL_MATERIAL_SUB_CATEGORY,
    GET_ALL_MOODBOARD_FILTER_DATA,
    GET_FILTERED_MOODBOARDS,
    CREATE_NEW_MOODBOARD
} from '../@types/thunk.types'

// Service import
import {
    getMoodboardList,
    getMoodboardByID,
    uploadMoodboard,
    updateMoodboard,
    uploadMoodboardImages,
    getAllColorCodes,
    addColorToMoodboard,
    deleteColorFromMoodboard,
    deleteProductImage,
    getMoodboardFabrics,
    addFabricToMoodboard,
    deleteFabricFromMoodboard,
    addToFavoriteMoodboards,
    removeFromFavoriteMoodboards,
    getAllMaterialCatagory,
    getAllMaterialSubCategory,
    getAllFilterdata
} from '../../services/Moodboard/index'

// import actions to execute
import { MoodboardActions } from '.'
import { readFileAsync } from '../../services/Util'

const MoodboardThunks = {
    [GET_MOODBOARD_LIST]: (filters) => {
        return async (dispatch, getState) => {
            let data = await getMoodboardList(filters)
            dispatch({
                type: MoodboardActions[SET_MOODBOARD_LIST],
                payload: data.data
            })
            return getState().moodboard
        }
    },
    [GET_MOODBOARD_BY_ID]: (id) => {
        return async (dispatch, getState) => {
            let data = await getMoodboardByID(id)
            // console.log('data', data)
            dispatch({
                type: MoodboardActions[SET_MOODBOARD_BY_ID],
                payload: data.data
            })
            return getState().moodboard
        }
    },
    [UPLOAD_MOODBOARDS]: (data) => {
        return async (dispatch, getState) => {
            // console.log('data', data)
            try {
                let dataFrame = {
                    documentDTOs: []
                }
                data.forEach((element) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(element)
                    reader.onload = () => {
                        // data.base64Str = reader.result;
                        // onUploadImage(data);
                        dataFrame.documentDTOs.push({
                            base64Str: reader.result,
                            documentType: 'MOODBOARD_FILE',
                            docMimeType: element.type,
                            name: element.name
                        })
                    }

                    reader.onerror = function (error) {
                        // console.log('Error: ', error)
                        alert('Error: ' + error.message)
                    }
                })
                // we have proper data in dataFrame
                let response = await uploadMoodboard(dataFrame)
                // console.log('response', response)
                return { state: getState().moodboard, response }
            } catch (e) {
                console.log(e)
            }
        }
    },
    [UPDATE_MOODBOARD]: (data) => {
        return async (dispatch, getState) => {
            // console.log('data', data)
            let dataFrame = {
                name: data.name || null,
                description: data.description || '',
                id: data.id
            }
            try {
                let response = await updateMoodboard(dataFrame)
                //  we have to update state here
                dispatch({
                    type: MoodboardActions[UPDATE_SELECTED_MOODBOARD_STATE],
                    payload: dataFrame
                })
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log('error', error)
            }
        }
    },
    [UPLOAD_MOODBOARD_IMAGES]: (selectedFiles, id) => {
        return async (dispatch, getState) => {
            try {
                // console.log(selectedFiles)
                let dataFrame = []
                for (let i = 0; i < selectedFiles.length; i++) {
                    let base64StrResult = await readFileAsync(selectedFiles[i])

                    dataFrame.push({
                        base64Str: base64StrResult,
                        documentType: 'MOODBOARD_PRODUCT_IMAGE',
                        docMimeType: selectedFiles[i].type,
                        name: selectedFiles[i].name
                    })
                }
                // we have proper data in dataFrame
                // console.log('dataFrame', dataFrame)
                let response = await uploadMoodboardImages(
                    dataFrame,
                    `${id}/product-image`
                )

                // console.log('response', response)
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log('error', error)
            }
        }
    },
    [GET_COLOR_CODES]: (moodboardID, searchString) => {
        return async (dispatch, getState) => {
            let data = await getAllColorCodes(moodboardID, searchString || null)
            // console.log('data', data)
            dispatch({
                type: MoodboardActions[SET_COLOR_CODES],
                payload: data.data
            })
            return getState().moodboard
        }
    },
    [DELETE_PRODUCT_IMAGE]: (moodboardID, imageID) => {
        return async (dispatch, getState) => {
            try {
                let response = await deleteProductImage(moodboardID, imageID)
                // console.log('response', response)
                dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                dispatch
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log('error', error)
            }
        }
    },
    [ADD_COLOR_CODE]: (moodboardID, colorID) => {
        return async (dispatch, getState) => {
            // console.log('add color code')
            try {
                let dataFrame = {
                    colorType: 'SOLID',
                    pantoneColorId: colorID,
                    representedBy: 'PANTONE_OR_HEX_CODE'
                }
                let response = await addColorToMoodboard(dataFrame, moodboardID)
                dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log('error', error)
            }
        }
    },
    [DELETE_COLOR_FROM_MOODBOARD]: (moodboardID, colorID) => {
        return async (dispatch, getState) => {
            try {
                let response = await deleteColorFromMoodboard(
                    moodboardID,
                    colorID
                )
                dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log(error)
            }
        }
    },
    [GET_MOODBOARD_FABRICS]: () => {
        return async (dispatch, getState) => {
            try {
                let data = await getMoodboardFabrics(
                    getState().moodboard.fabricSearchFilters
                )
                dispatch({
                    type: MoodboardActions[SET_MOODBOARD_FABRICS],
                    payload: data.data.data
                })
                return getState().moodboard
            } catch (error) {
                console.log(error)
            }
        }
    },
    [ADD_FABRIC_TO_MOODBOARD]: (moodboardID, fabricID) => {
        return async (dispatch, getState) => {
            try {
                console.log(moodboardID)
                console.log(fabricID)
                let response = await addFabricToMoodboard(moodboardID, fabricID)
                dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log(error)
            }
        }
    },
    [DELETE_FABRIC_FROM_MOODBOARD]: (moodboardID, fabricID) => {
        return async (dispatch, getState) => {
            try {
                let response = await deleteFabricFromMoodboard(
                    moodboardID,
                    fabricID
                )
                dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log(error)
            }
        }
    },
    [ADD_MOODBOARD_TO_FAVORITE]: (moodboardID) => {
        return async (dispatch, getState) => {
            try {
                // we have to develop a different approach here later
                // dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                dispatch({
                    type: MoodboardActions[SET_FAVOURITE_MOODBOARD],
                    payload: moodboardID
                })
                let response = await addToFavoriteMoodboards(moodboardID)
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log(error)
                dispatch({
                    type: MoodboardActions[UNSET_FAVOURITE_MOODBOARD],
                    payload: moodboardID
                })
            }
        }
    },
    [REMOVE_MOODBOARD_FROM_FAVORITE]: (moodboardID) => {
        return async (dispatch, getState) => {
            try {
                // we have to develop a different approach here later
                // dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](moodboardID))
                dispatch({
                    type: MoodboardActions[UNSET_FAVOURITE_MOODBOARD],
                    payload: moodboardID
                })
                let response = await removeFromFavoriteMoodboards(moodboardID)
                return { state: getState().moodboard, response }
            } catch (error) {
                console.log(error)
                dispatch({
                    type: MoodboardActions[SET_FAVOURITE_MOODBOARD],
                    payload: moodboardID
                })
            }
        }
    },
    [GET_ALL_MATERIAL_CATEGORY]: () => {
        return async (dispatch, getState) => {
            try {
                let data = await getAllMaterialCatagory()

                data.data.forEach((item) => {
                    item.label = item.code
                })

                console.log('data', data)

                dispatch({
                    type: MoodboardActions[SET_ALL_MATERIAL_CATEGORY],
                    payload: data.data
                })
                return getState().moodboard
            } catch (error) {
                console.log(error)
            }
        }
    },
    [GET_ALL_MATERIAL_SUB_CATEGORY]: () => {
        return async (dispatch, getState) => {
            try {
                let data = await getAllMaterialSubCategory()

                // console.log(data)

                data.data.forEach((item) => {
                    item.label = item.name
                })

                // console.log('data', data)

                dispatch({
                    type: MoodboardActions[SET_ALL_MATERIAL_SUB_CATEGORY],
                    payload: data.data
                })
                return getState().moodboard
            } catch (error) {
                console.log(error)
            }
        }
    },
    [GET_ALL_MOODBOARD_FILTER_DATA]: () => {
        return async (dispatch, getState) => {
            // console.log('get all moodboard filter data')
            let response = await getAllFilterdata()
            // console.log('response', response)
            // 0 - getAllcatagory
            // 1 - getAllSeason
            // 2 - getAllMarket
            dispatch({
                type: MoodboardActions[SET_ALL_FILTER_DATA],
                payload: response
            })
        }
    },
    [GET_FILTERED_MOODBOARDS]: (filters) => {
        return async (dispatch, getState) => {
            // console.log('filters', filters)

            // before sending filter we need to process it a bit
            // but pocessing is not necessary for Actions
            console.log(filters)
            let processedFilters = {
                categoryId: filters.selectedCategory,
                seasons: filters.selectedSeason,
                marketId: filters.selectedMarket
                // i forgot to add the date order, please add it
            }

            // we need to set the filters in the state
            dispatch({
                type: MoodboardActions[SET_MOODBOARD_FILTER_SELECTED_FIELDS],
                payload: filters
            })
            dispatch(MoodboardThunks[GET_MOODBOARD_LIST](processedFilters))
        }
    },
    [CREATE_NEW_MOODBOARD]: (moodboard) => {
        return async (dispatch, getState) => {
            try {
                let response = await uploadMoodboard({
                    documentDTOs: []
                })

                return response
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default MoodboardThunks
