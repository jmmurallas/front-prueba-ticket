<template>
    <div style="width: 95%; margin:auto;">
        <b-tabs content-class="mt-3" align="center">
            <b-tab :title="item.tab"  v-for="item in items" :key="item.tab">
                <component :is="item.component" :ref="item.component" />
            </b-tab>
        </b-tabs>
    </div>
</template>
<script>
import listadoUsuarios from './users/listado.vue'
export default {
    name: 'listado_usuarios',
    components: {
        listadoUsuarios
    },
    data: () => ({
        tab: null,
        items: [
          { tab: 'Usuarios', component: 'listadoUsuarios' },
        ],
    })
}
</script>