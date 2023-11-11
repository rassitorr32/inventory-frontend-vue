<script lang="ts" setup>
    import { ref } from 'vue';
    import { useAuthStore } from "@/stores/auth"

    //Aqui ya se tiene el login
    const authStore = useAuthStore();

    const email = ref("");//con ref se crear variables reactivas
    const password = ref("");
    const showPassword = ref(false);

    const handleShowPassword = ()=>{
        showPassword.value = !showPassword.value;
    }

    const handleSubmit = ()=>{
        //console.log({email: email.value, password: password.value});
        authStore.loginUser(email.value,password.value);
    }
</script>

<template>
    <!-- @submit.prevent para q no se refresque la pagina -->
    <form @submit.prevent="handleSubmit" class="w'full max'w'md">
        <div class="form-control">
            <label for="email">Correo electronico: </label>
            <input v-model="email" type="email" name="email">
        </div>
        <div class="form-password">
            <label for="password">Contraseña: </label>
            <div class="form-control-password">
                <!-- v-bind: o directamente : para hacerlo reactivo -->
                <input  
                    v-model="password" 
                    v-bind:type="showPassword?'text':'password'" name="password">
                <i @click="handleShowPassword" v-if="showPassword" class="uil uil-eye"></i>
                <i @click="handleShowPassword" v-else class="uil uil-eye-slash"></i>
            </div>
        </div>

        <button type="submit" class="btn-primary" :aria-disabled="authStore.isLoading">
            {{ authStore.isLoading? "cargando..." : "Iniciar Sesion" }}
        </button>
    </form>
</template>

<style lang="scss" scoped></style>