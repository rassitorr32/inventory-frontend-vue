import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from '@/layauts/auth/AuthLayout.vue'
import RooLayout from '@/layauts/root/RooLayout.vue'
import authService from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => RooLayout,
      redirect: 'profile',
      meta: { requiresAuth: true },//Ayuda a analizar antes de pintar el chilfren
      children: [{
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/ProfileView.vue')
      }]
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=>AuthLayout,
      children: [
        {
          path: 'login', // => /auth/login
          name: 'auth-login',
          component: ()=>import('@/views/auth/LoginView.vue')//para q solo se descargue los componentes si se lo requiere, para que sea mas rapido
        },
      ]
    }
  ]
})

//Funcion antes q se pinten las rutas
router. beforeEach(async (to, form, next) => {
  
  //OBTIENE LAS PROPIEDADES DE LA RUTA
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);//obtener las propiedades

  if( requiresAuth ){
    const token = localStorage.getItem('AUTH_TOKEN_INVENTORY');
    
    //VALIDAR EL TOKEN
    const user = await authService.validate(token!);

    //Si el user no existe es porq el token no es valido
    if( !token || !user){
      next({ path: '/auth/login' })
      return;
    }
  }

  //En el caso q no tenga el meta
  next();

})
export default router
