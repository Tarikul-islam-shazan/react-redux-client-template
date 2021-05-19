import Http from "../services/Http";
import { toastError } from '../commonComponents/Toast';


export const fetchGeneralSettingsData = async (keys) => {
    try{
       let params = 'keys?';
       keys.forEach(function(key){
          params += ('key=' + key + '&');
        });
        params = params.trim('&');
        const { data } = await Http.GET('getSettings', params)
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