<template>
    <div>

        <div class="card" style="max-width: 95%; margin:auto">
            <div class="card-header"><b>Listar Pedidos</b></div>
            <div class="card-body text-dark">

                <b-button class="btn btn-info" v-b-modal.crearPedido @click="resetForm(); editedIndex= 1;"><i class="mdi mdi-plus"></i> Crear Pedido</b-button><br><br>

                <b-modal id="crearPedido" size="lg" title="Crear Pedido" hide-footer>
                    
                    <form>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Seleccione Producto</label>                
                                <b-form-select v-model="pedidos.pedpro" :options="options_productos"></b-form-select>                                
                            </div>   
                            <div class="form-group col-sm-4">
                                <label>Valor Unidad</label>
                                <input type="number" class="form-control" v-model="pedidos.pedvrunit" required>
                            </div>   
                            <div class="form-group col-sm-4">
                                <label>Cantidad</label>
                                <input type="number" class="form-control" @change="valorSubTotal" v-model="pedidos.pedcant" required>
                            </div>   
                            <div class="form-group col-sm-4">
                                <label>Sub Total</label>
                                <input type="number" class="form-control" v-model="pedidos.pedsubtot" disabled>
                            </div>  
                            <div class="form-group col-sm-6">
                                <label>IVA (%)</label>
                                <input type="number" class="form-control" @change="valorTotal" v-model="pedidos.pediva">
                            </div> 
                            <div class="form-group col-sm-6">
                                <label>Total</label>
                                <input type="number" class="form-control" v-model="pedidos.pedtotal" disabled>
                            </div>                                                 
                            <div class="form-group col-sm-12">
                                <center>                                        
                                    <button type="submit" @click.prevent="savePedido" class="btn btn-success">Guardar</button>                                    
                                </center>
                            </div>                                         
                        </div>
                    </form>

                </b-modal> 
                
                <table class="table responsive table-bordered">
                    <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>Producto</th>
                            <th>Usuario</th>
                            <th>Valor Unidad</th>
                            <th>Cantidad</th>
                            <th>Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.pedid">
                            <td align="center"><b>{{item.pedid}}</b></td>
                            <td>{{item.producto}}</td>
                            <td>{{item.usuario}}</td>
                            <td>{{item.vlr_uni}}</td>
                            <td>{{item.cantidad}}</td>                            
                            <td align="center">
                                <b-button class="btn btn-info" @click="$bvModal.show('pedi'+item.pedid); showModal(item, true, 'Ver Pedido')" v-b-tooltip.hover title="Ver Pedido"><i class="mdi mdi-eye"></i></b-button>&nbsp;
                                <b-button class="btn btn-warning" @click="$bvModal.show('pedi'+item.pedid); showModal(item, false, 'Editar Pedido'); editedIndex= -1;" v-b-tooltip.hover title="Editar Pedido"><i class="mdi mdi-pencil text-white"></i></b-button>&nbsp;
                                <b-button class="btn btn-danger" @click="deletePedido(item)" v-b-tooltip.hover title="Eliminar Pedido"><i class="mdi mdi-delete"></i></b-button>&nbsp;
                            </td>
                            <!-- Modal Actions -->
                            <b-modal :id="'pedi'+item.pedid" size="lg" :title="title" hide-footer>
                                
                                <form>
                                    <div class="row">
                                        <div class="form-group col-sm-12">
                                            <label>Seleccione Producto</label>                                    
                                            <b-form-select v-model="pedidos.pedpro" :options="options_productos" :disabled="disabled"></b-form-select>
                                        </div>   
                                        <div class="form-group col-sm-4">
                                            <label>Valor Unidad</label>
                                            <input type="number" class="form-control" v-model="pedidos.pedvrunit" :disabled="disabled" required>
                                        </div>   
                                        <div class="form-group col-sm-4">
                                            <label>Cantidad</label>
                                            <input type="number" class="form-control" @change="valorSubTotal" v-model="pedidos.pedcant" :disabled="disabled" required>
                                        </div>   
                                        <div class="form-group col-sm-4">
                                            <label>Sub Total</label>
                                            <input type="number" class="form-control" v-model="pedidos.pedsubtot" disabled>
                                        </div>  
                                        <div class="form-group col-sm-6">
                                            <label>IVA (%)</label>
                                            <input type="number" class="form-control" @change="valorTotal" :disabled="disabled" v-model="pedidos.pediva">
                                        </div> 
                                        <div class="form-group col-sm-6">
                                            <label>Total</label>
                                            <input type="number" class="form-control" v-model="pedidos.pedtotal" disabled>
                                        </div>                                                                 
                                        <div class="form-group col-sm-12">
                                            <center>                                        
                                                <button type="submit" @click.prevent="savePedido" :disabled="disabled" class="btn btn-success">Guardar</button>                                    
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
        options_productos: [],
        pedidos: {
            pedid : '',
            pedusu: '',
            pedpro: '',
            pedvrunit: '',
            pedcant: '',
            pedsubtot: '',
            pediva: '',
            pedtotal: ''
        },     
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
        }        
    },
    created () {
        this.getPedidos()
        this.getProductos()
    },

    methods: {   
        valorSubTotal() {
            this.pedidos.pedsubtot = parseInt(this.pedidos.pedvrunit) * parseInt(this.pedidos.pedcant)
        },
        valorTotal(){
            this.pedidos.pedtotal = (parseInt(this.pedidos.pedsubtot) * parseInt(this.pedidos.pediva) ) / 100 + this.pedidos.pedsubtot 
        },
        showModal(datos, disabled, title) {                             

            this.disabled = disabled
            this.title = title
            
            this.pedidos.pedid = datos.pedid
            this.pedidos.pedpro = datos.pedpro
            this.pedidos.pedvrunit = datos.pedvrunit
            this.pedidos.pedcant = datos.pedcant
            this.pedidos.pedsubtot = datos.pedsubtot
            this.pedidos.pediva = datos.pediva
            this.pedidos.pedtotal = datos.pedtotal      

        },   
        async getProductos() {

            return await this.axios.get(configApi+'usuarios/productos', {headers})
            .then(response => {
                let data = response.data.data;                

                for (var i = 0, max = data.length; i < max; i += 1) {

                    this.options_productos.push({
                        value: data[i].proid,
                        text: data[i].prodesc
                    })

                }

            })

        },   
        async getPedidos() {

            return await this.axios.get(configApi+'usuarios/pedidos', {headers})
            .then(response => {
                this.items = response.data.data;
            })

        },     
        async savePedido () {
            
            if (this.editedIndex == -1) {

                return await this.axios.put(configApi+'usuarios/pedidos/'+this.pedidos.pedid, this.pedidos, {headers})
                .then(response => {   
                    this.$bvModal.hide('pedi'+this.pedidos.pedid)  
                    this.resetForm()                 
                    this.getPedidos()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })

            } else {

                return await this.axios.post(configApi+'usuarios/pedidos', this.pedidos, {headers})
                .then(response => {
                    this.$bvModal.hide('crearPedido')  
                    this.resetForm()
                    this.getPedidos()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })   
                
            }            
            
        }, 
        async deletePedido(data) {   

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
            this.pedidos.pedid = ''
            this.pedidos.pedusu = '',
            this.pedidos.pedpro = ''
            this.pedidos.pedvrunit = ''
            this.pedidos.pedcant = ''
            this.pedidos.pedsubtot = ''
            this.pedidos.pediva = ''
            this.pedidos.pedtotal = ''                         
        }
    },       
}
</script>