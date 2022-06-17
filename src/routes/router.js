import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '@/views/auth/login'
import logout from '@/views/auth/logout'

import productos from '@/views/productos/listado'
import pedidos from '@/views/pedidos/listado'

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'raiz',
            component: login
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/logout',
            name: 'logout',
            component: logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/views/dashboard').default,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            component: require('@/views/usuarios').default,
            meta: {
                requiresAuth: true
            }
        },    
        {
            path: '/productos',
            name: 'productos',
            component: productos,
            meta: {
                requiresAuth: true
            }
        },    
        {
            path: '/pedidos',
            name: 'pedidos',
            component: pedidos,
            meta: {
                requiresAuth: true
            }
        }, 
    ]
})

export default router
