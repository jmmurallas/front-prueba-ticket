<template>
  <section>    
    <center>
      <div class="card" style="width: 20rem;">
        <div class="card-body">          
          <form @submit.prevent="login">
            <h2>Iniciar Sesión</h2>
            <br>                       
            <div class="col-auto">
              <label class="sr-only" for="inlineFormInputGroup">Correo Electrónico</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">@</div>
                </div>
                <input type="email" class="form-control" v-model="formLogin.email" placeholder="Correo Electrónico" required>
              </div>
            </div>
            <div class="col-auto">
              <label class="sr-only" for="inlineFormInputGroup">Contraseña</label>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text"><i class="mdi mdi-lock"></i></div>
                </div>
                <input type="password" class="form-control" v-model="formLogin.password" placeholder="Contraseña" required>
              </div>
            </div>    
            <br>           
            <button type="submit" class="btn btn-primary">Ingresar</button>       
          </form>
        </div>
      </div>
    </center>    
  </section>
</template>
<script>
export default {
  data: () => ({
    showPassword: false,
    alert: false,
    colorAlert: "",
    textAlert: "",
    colorBtnAlert: "",
    formLogin: {
      email: "",
      password: ""
    },    
  }),
  methods: {
    login() {
      this.$store.dispatch("retrieveToken", {
        email: this.formLogin.email,
        password: this.formLogin.password
      }).then(response => {
        this.$router.push({name:"dashboard"})  
        window.location.reload()          
      }).catch(error => {
        this.$Fun.alertaAccion('error', 'Correo Electrónico o Contraseña incorrecta', true)
      })
    },
  }
}
</script>