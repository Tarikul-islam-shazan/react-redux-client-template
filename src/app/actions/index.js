import Http from "../services/Http";
import { toastError } from '../commonComponents/Toast';


export const fetchGeneralSettingsData = async (params) => {
    try{
       let url = "keys?";
       params.forEach(function(param){
          url += "key=" + param + "&";
        });
        url = url.trim("&");
        const { data } = await Http.GET("getSettings", url)
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