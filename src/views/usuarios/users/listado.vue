<template>
    <div>

        <div class="card" style="max-width: 100%">
            <div class="card-header"><b>Listar Usuarios</b></div>
            <div class="card-body text-dark">

                <b-button class="btn btn-info" v-b-modal.crearUsuario @click="resetForm(); editedIndex= 1;"><i class="mdi mdi-plus"></i> Crear Usuario</b-button><br><br>

                <b-modal id="crearUsuario" size="lg" title="Crear Usuario" hide-footer>
                    
                    <form>
                        <div class="row">
                            <div class="form-group col-sm-12">
                                <label>Nombre Completo</label>
                                <input type="text" class="form-control" v-model="users.usunombre" required>
                            </div>   
                            <div class="form-group col-sm-12">
                                <label>Correo Electrónico</label>
                                <input type="email" class="form-control" v-model="users.email" required>
                            </div>   
                            <div class="form-group col-sm-12">
                                <label>Contraseña</label>
                                <input type="password" class="form-control" v-model="users.password" required>
                            </div>                                
                            <div class="form-group col-sm-12">
                                <center>                                        
                                    <button type="submit" @click.prevent="saveUser" class="btn btn-success">Guardar</button>                                    
                                </center>
                            </div>                                         
                        </div>
                    </form>

                </b-modal> 
                
                <table class="table responsive table-bordered">
                    <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.id">
                            <td align="center"><b>{{item.id}}</b></td>
                            <td>{{item.usunombre}}</td>
                            <td>{{item.email}}</td>
                            <td align="center">
                                <b-button class="btn btn-info" @click="$bvModal.show('user'+item.id); showModal(item, true, 'Ver Usuario')" v-b-tooltip.hover title="Ver Usuario"><i class="mdi mdi-eye"></i></b-button>&nbsp;
                                <b-button class="btn btn-warning" @click="$bvModal.show('user'+item.id); showModal(item, false, 'Editar Usuario'); editedIndex= -1;" v-b-tooltip.hover title="Editar Usuario"><i class="mdi mdi-pencil text-white"></i></b-button>&nbsp;
                                <b-button class="btn btn-danger" @click="deleteUser(item)" v-b-tooltip.hover title="Eliminar Usuario"><i class="mdi mdi-delete"></i></b-button>&nbsp;
                            </td>
                            <!-- Modal Actions -->
                            <b-modal :id="'user'+item.id" size="lg" :title="title" hide-footer>
                                
                                <form>
                                    <div class="row">
                                        <div class="form-group col-sm-12">
                                            <label>Nombre Completo</label>
                                            <input type="text" class="form-control" v-model="users.usunombre" :disabled="disabled" required>
                                        </div>   
                                        <div class="form-group col-sm-12">
                                            <label>Correo Electrónico</label>
                                            <input type="email" class="form-control" v-model="users.email" :disabled="disabled" required>
                                        </div>                                                                 
                                        <div class="form-group col-sm-12">
                                            <center>                                        
                                                <button type="submit" @click.prevent="saveUser" :disabled="disabled" class="btn btn-success">Guardar</button>                                    
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
import {headers} from './../../../api/headers'
import {configApi} from './../../../api/configApi'
export default {
    name: 'listado_users',
    data: () => ({
        disabled: false,
        title: '',
        items: [],
        editedIndex: -1,
        users: {
            id: '',
            usunombre: '',
            email: '',
            password: ''
        },     
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
        }        
    },    
    created () {
        this.getUsers()
    },
    methods: {   
        showModal(datos, disabled, title) {            
            this.disabled = disabled
            this.title = title
            this.users.id = datos.id
            this.users.usunombre = datos.usunombre
            this.users.email = datos.email
            this.users.password = datos.password            
        },   
        async getUsers() {

            return await this.axios.get(configApi+'usuarios/usuarios', {headers})
            .then(response => {
                this.items = response.data.data;
            })

        },       
        async saveUser () {
            
            if (this.editedIndex == -1) {

                return await this.axios.put(configApi+'usuarios/usuarios/'+this.users.id, this.users, {headers})
                .then(response => {   
                    this.$bvModal.hide('user'+this.users.id)  
                    this.resetForm()                 
                    this.getUsers()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })

            } else {

                return await this.axios.post(configApi+'usuarios/usuarios', this.users, {headers})
                .then(response => {
                    this.$bvModal.hide('crearUsuario')  
                    this.resetForm()
                    this.getUsers()
                    this.$Fun.alertaAccion('success', response.data.message, false)
                })   
                
            }            
            
        }, 
        async deleteUser(data) {   

            let objAlert = {
                titleAlert: '¿Desea eliminar el Usuario?',
                url: configApi+'usuarios/usuarios/'+ data.id, // url delete 
                headers: {headers},
                messageError: 'El Usuario no fue Eliminado'
            }

            this.$Fun.alertaConfirmarEliminarAccion(objAlert, e => {
                if(e) {
                    this.getUsers()  
                }
            })                       
            
        },        
        resetForm() {
            this.users.id = ''
            this.users.usunombre = ''
            this.users.email = ''
            this.users.password = ''            
        }
    },       
}
</script>