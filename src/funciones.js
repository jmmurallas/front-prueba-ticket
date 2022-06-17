import Vue from 'vue'
import Swal from "sweetalert2";
import axios from 'axios'
Vue.prototype.$swal = Swal;

export default class Fun {

    static alertaAccion(icon, titulo, showConfirm) {
        
        Swal.fire({
            position: 'center',
            icon: icon,
            title: titulo,
            showConfirmButton: showConfirm,
            confirmButtonColor: "#1e88e5", 
            timer: 1700
          })

    }

    static alertaConfirmarEliminarAccion(objAlert, callback) {

        Swal.fire({
            title: objAlert.titleAlert,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#4caf50',
            denyButtonText: `No Eliminar`,
            denyButtonColor: '#f44336',
        }).then((result) => {

            if (result.isConfirmed) {
                return axios.delete(objAlert.url, objAlert.headers)
                .then(response => {   
                    
                    if(response.data.success) {
                        this.alertaAccion('success', response.data.message, false)     
                        callback({success:true})
                    } else {
                        this.alertaAccion('error', 'Ocurrió un error al Eliminar', false)
                    }

                })                

            } else if (result.isDenied) {
                
                this.alertaAccion('success', objAlert.messageError, false)                

            }
        })

    }

    static alertaConfirmarEstadoAccion(objAlert, callback) {

        Swal.fire({
            title: objAlert.titleAlert,
            showDenyButton: true,
            confirmButtonText: 'Actualizar',
            confirmButtonColor: '#4caf50',
            denyButtonText: `No Actualizar`,
            denyButtonColor: '#f44336',
        }).then((result) => {

            if (result.isConfirmed) {
                return axios.put(objAlert.url, objAlert.request, objAlert.headers)
                .then(response => {   
                    
                    if(response.data.success) {
                        this.alertaAccion('success', response.data.message, false)     
                        callback({success:true})
                    } else {
                        this.alertaAccion('error', 'Ocurrió un error', false)
                    }

                })                

            } else if (result.isDenied) {
                
                this.alertaAccion('success', objAlert.messageError, false)                

            }
        })

    }

    

}