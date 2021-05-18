import Http from "../services/Http";
import { toastError } from '../commonComponents/Toast';


export const fetchGeneralSettingsData = async (params) => {
    try{
        const { data } = await Http.GET("getSettings", params)
        return data;
    }
      catch ({ response }) {
        if (response && response.data && response.data.message) {
          toastError(response.data.message);
        } else {
          toastError("Something went wrong! Please try again.");
        }
      }
    }