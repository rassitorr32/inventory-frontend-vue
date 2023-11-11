<script setup lang="ts">

    import { useToastStore } from "@/stores/toast";
import { storeToRefs } from "pinia";
import { computed } from "vue";

//desestructurar manteniendo la reactividad
    const toastStore = useToastStore();
    const {message, type, right} = storeToRefs(toastStore); 

    //el valor depende del cambio
    const toastColor = computed(() => type.value == 'error'? '#DC2626':'#059669');

</script>

<template>
    <div class="toast" :style="{backgroundColor: toastColor, right}"><!--es lo mismo right:right-->
        <p class="text-white text-center">{{ message }}</p>
    </div>
</template>

<style scoped>
    .toast{
        border-radius: 10px;
        padding: .75rem 1rem;
        position: absolute;
        width: max-content;
        z-index: 4;
        top: 1rem;
        transition: all .3s ease-in-out;
    }
</style>