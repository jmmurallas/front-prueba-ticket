<template>
    <div>

        <div class="card" style="max-width: 95%; margin:auto">
            <div class="card-header"><b>Listar Productos</b></div>
            <div class="card-body text-dark">

                <b-button class="btn btn-info" v-b-modal.crearProducto @click="resetForm(); editedIndex= 1;"><i class="mdi mdi-plus"></i> Crear Producto</b-button><br><br>

                <b-modal id="crearProducto" size="lg" title="Crear Producto" hide-footer>
                    
                    <form>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Descripción Producto</label>
                                <input type="text" class="form-control" v-model="productos.prodesc" required>
                            </div>   
                            <div class="form-group col-sm-12">
                                <label>Valor Producto</label>
                                <input type="number" class="form-control" v-model="productos.provalor" required>
                            </div>                                                     
                            <div class="form-group col-sm-12">
                                <center>                                        
                                    <button type="submit" @click.prevent="saveProducto" class="btn btn-success">Guardar</button>                                    
                                </center>
                            </div>                                         
                        </div>
                    </form>

                </b-modal> 
                
                <table class="table responsive table-bordered">
                    <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>Descripción</th>
                            <th>Valor</th>
                            <th>Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.proid">
                            <td align="center"><b>{{item.proid}}</b></td>
                            <td>{{item.prodesc}}</td>
                            <td>{{item.provalor}}</td>
                            <td align="center">
                                <b-button class="btn btn-info" @click="$bvModal.show('prod'+item.proid); showModal(item, true, 'Ver Producto')" v-b-tooltip.hover title="Ver Producto"><i class="mdi mdi-eye"></i></b-button>&nbsp;
                                <b-button class="btn btn-warning" @click="$bvModal.show('prod'+item.proid); showModal(item, false, 'Editar Producto'); editedIndex= -1;" v-b-tooltip.hover title="Editar Producto"><i class="mdi mdi-pencil text-white"></i></b-button>&nbsp;
                                <b-button class="btn btn-danger" @click="deleteProducto(item)" v-b-tooltip.hover title="Eliminar Producto"><i class="mdi mdi-delete"></i></b-button>&nbsp;
                            </td>
                            <!-- Modal Actions -->
                            <b-modal :id="'prod'+item.proid" size="lg" :title="title" hide-footer>
                                
                                <form>
                                    <div class="row">
                                        <div class="form-group col-sm-12">
                                            <label>Descripción Producto</label>
                                            <input type="text" class="form-control" v-model="productos.prodesc" :disabled="disabled" required>
                                        </div>   
                                        <div class="form-group col-sm-12">
                                            <label>Valor Producto</label>
                                            <input type="number" class="form-control" v-model="productos.provalor" :disabled="disabled" required>
                                        </div>                                                                 
                                        <div class="form-group col-sm-12">
                                            <center>                                        
                                                <button type="submit" @click.prevent="saveProducto" :disabled="disabled" class="btn btn-success">Guardar</button>                                    
                                            </center>
                                        </div>                                         
                                    </div>
                                </form>

                            </b-modal>  
                        </tr>                        
                    </tbody>
                </table>                            

            </div>
        </div> 

    </div>
</template>
<script>
import {headers} from './../../api/headers'
import {configApi} from './../../api/configApi'
export default {
    name: 'listado_productos',
    data: () => ({
        disabled: false,
        title: '',
        items: [],
        editedIndex: -1,
        productos: {
            proid : '',
            prodesc: '',
            provalor: ''
        },     
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
        }        
    },
    created () {
        this.getProductos()
    },

    methods: {   
        showModal(datos, disabled, title) {            
            this.disabled = disabled
            this.title = title
            this.productos.proid = datos.proid
            this.productos.prodesc = datos.prodesc
            this.productos.provalor = datos.provalor                       
        },   
        async getProductos() {

            return await this.axios.get(configApi+'usuarios/productos', {headers})
            .then(response => {
                this.items = response.data.data;
            })

        },       
        async saveProducto () {
            
            if (this.editedIndex == -1) {

                return await this.axios.put(configApi+'usuarios/productos/'+this.productos.proid, this.productos, {headers})
                .then(response => {   
                    this.$bvModal.hide('prod'+this.productos.proid)  
                    this.resetForm()                 
                    this.getProductos()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })

            } else {

                return await this.axios.post(configApi+'usuarios/productos', this.productos, {headers})
                .then(response => {
                    this.$bvModal.hide('crearProducto')  
                    this.resetForm()
                    this.getProductos()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })   
                
            }            
            
        }, 
        async deleteProducto(data) {   

            let objAlert = {
                titleAlert: '¿Desea eliminar el Producto?',
                url: configApi+'usuarios/productos/'+ data.proid, // url delete 
                headers: {headers},
                messageError: 'El Producto no fue Eliminado'
            }

            this.$Fun.alertaConfirmarEliminarAccion(objAlert, e => {
                if(e) {
                    this.getProductos()  
                }
            })                       
            
        },        
        resetForm() {
            this.productos.proid = ''
            this.productos.prodesc = ''
            this.productos.provalor = ''                
        }
    },       
}
</script>