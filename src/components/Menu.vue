<template>
  <div>
    <div v-if="validateSession">
      
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Prueba Ticket</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="nav-link text-white" to="/dashboard">Inicio<span class="sr-only"></span></router-link>
        <ul class="navbar-nav" v-for="prede in items_predeterminados" :key="prede.title">
          <li class="nav-item active">
            <router-link class="nav-link" :to="prede.name">{{prede.title}}<span class="sr-only"></span></router-link>
          </li>            
        </ul>                    
      </nav>

    </div>

    <main>

      <div class="card">
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>

    </main>
    
  </div>
</template>

<script>

import {headers} from './../api/headers'
import {configApi} from './../api/configApi'

  export default {
    data: () => ({ 
      drawer: null,
      items: [],
      items_predeterminados: [
        {
          title: 'Usuarios',
          icon: 'mdi-arrow-right-box',
          name: '/usuarios'
        }, 
        {
          title: 'Productos',
          icon: 'mdi-arrow-right-box',
          name: '/productos'
        }, 
        {
          title: 'Pedidos',
          icon: 'mdi-arrow-right-box',
          name: '/pedidos'
        }, 
        {
          title: 'Cerrar Sesión',
          icon: 'mdi-arrow-right-box',
          name: '/logout'
        },        
      ],
      right: null,
      validateSession: false,
    }),
    mounted() {

      if(localStorage.getItem('access_token')) {
        this.validateSession = true
      } else {
        this.validateSession = false
      }

    },
    methods: {

    }
  }
</script>