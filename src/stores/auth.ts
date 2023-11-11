import authService from "@/services/authService";
import { defineStore } from "pinia";
import { useToastStore } from "./toast";
import { onMounted, ref } from "vue";
import type { IUser } from "@/interface";
import router from "@/router";

//ese modelo siepre para identificar q es gestor de pinia
export const useAuthStore = defineStore('auth', () => {
    const toastStore = useToastStore();
    //VARIABLES
    const isLoading = ref(false);//es para poner como una pantallita de carga
    const user = ref<IUser | null>(null);
    const token = ref<string | null>(null);

    //METODOS
    async function loginUser(email: string, password: string) {
        isLoading.value = true;
        // authService.login(email,password);
        const data = await authService.login(email, password);
        //Pregunta si existe data, significa q retorna el user con el token
        if (!data){
            isLoading.value = false;
            return;
        }

        user.value = data.user;
        token.value = data.token;

        //Guardar el token en el local storage
        localStorage.setItem('AUTH_TOKEN_INVENTORY', data.token);

        toastStore.showToast('success', 'Inicio de sesion correcto.');
        router.push('/profile');
        //Cuando finaliza el proceso
        isLoading.value = false;
    }

    async function validateToken() {
        isLoading.value = true;
        const token = localStorage.getItem('AUTH_TOKEN_INVENTORY');

        //SI NO EXISTE TOKEN
        if(!token){
            isLoading.value = false;
            router.push('/auth/login');
            return;
        }
        //SI EXISTE TOKEN
        const data = await authService.validate(token);

        if(!data){
            return;
        }

        user.value = data;
        isLoading.value = false;
    }

    /*FUNCION Q ENTRA AL CICLO DE VIDA DE UN COMPONENTE DE VUE
    onMounted() es cuando se monta el componente
    */
   onMounted(() => {
    validateToken();
   });

    return {
        user,
        token,
        isLoading,
        loginUser
    }
})