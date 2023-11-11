import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore('toast', () => {
    const type = ref<'success'|'error'>("success")
    const right = ref("-100rem");
    const message = ref("");

    function showToast(toastType:'success'|'error', toastMessage:string) {
        message.value = toastMessage;
        type.value = toastType;
        right.value = '1rem';

        setTimeout(()=>{
            right.value = '-100rem';
        },5000);
    }
    return{
        showToast,
        type,
        message,
        right
    }
})