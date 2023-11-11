import { useToastStore } from "@/stores/toast";
import axios from "axios"

export const handleAxiosError = (error:unknown)=>{

    const toastStore = useToastStore();
    if(axios.isAxiosError(error)){
        //MOSTRAR TOAST
        //console.log('entro al error')
        toastStore.showToast('error', error.response?.data.message)
    }

    return null;
}