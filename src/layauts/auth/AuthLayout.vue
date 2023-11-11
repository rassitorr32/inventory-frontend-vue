<script setup lang="ts">
import Toast from '@/components/shared/Toast.vue';
</script>

<template>
    <main class="md:flex">
        <!-- LOGO -->
        <section class="bg__logo md:w-6/12 min-h-screen flex items-center justify-center">
            <h1 class="text-white text-5xl">Control de inventario</h1>
        </section>
        
        <!-- PAGINA -->
        <section class="md:w-6/12 flex items-center justify-center flex-col w-full overflow-hidden relative">
            <Toast/>
            <router-view></router-view>
        </section>
    </main>
</template>


<style scoped>
    .bg__logo{
        background-image: url("../../assets/bg-auth.svg");
        background-position: center;
        /* para q no se repita */
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>