<template>
    <v-app>
    <!--<v-alert type="error" v-if="mensajeError==true" >{{msgError}} </v-alert>-->
      <v-main>
          <v-form v-model="valid" width="500" class="form-registro mx-auto mt-15">
            <v-card-title class="titulo">Iniciar Sesion</v-card-title>
            <v-card-text>
              <v-text-field v-model="nombre" id="caja"   class="form-input" label="Usuario" color="#72128E"  required  :rules="nameRules" prepend-icon="mdi-account-circle"/>
              <v-text-field v-model="pass" id="caja" class="form-input"  label="Contraseña" color="#72128E" required  :rules="passRules" :type=" mostrarContraseña ? 'text' : 'password'"
                      prepend-icon="mdi-lock"
                      :append-icon="mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="mostrarContraseña =! mostrarContraseña"/>
            </v-card-text>
            <!-- <div v-if="mensajeError==true" class="flex red--text"> {{msgError}} </div>-->    
            <v-divider></v-divider>
            <v-card-actions >
              <input  class="boton" type="button" @click="login()" value="Iniciar">                   
            </v-card-actions>
          </v-form >
      </v-main>
    </v-app>
    
</template>
<script>

import axios from "axios"
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            mostrarContraseña:false,
            nombre:"",
            pass:"",
            mensajeError:false,
            msgError:'',
            nameRules: [
                v => !!v || 'Email requerido',
                v => v.length <= 30 || 'Email supero los 20 caracteres',
            ],
            passRules: [
                v => !!v || 'Contraseña requerida',
                v => v.length <= 30 || 'Contraseña supera los 20 caracteres',
            ],
            valid: false,
        }
    },
    methods:{
      msjcompra:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          //5000 son 5 seg
          timer: 2000})
      },
      login(){
        if (!this.nombre || !this.pass) {
          this.msgError = 'Email / contraseña  oblicagorios';
          //this.mensajeError = true;
          this.msjcompra(this.msgError);
        }else{        
          axios.post("usuario/login",{nombre:this.nombre, password:this.pass})
          .then(response =>{
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setRol", response.data.rol);
            this.$store.dispatch("setId", response.data.id);
            this.$router.push("/categorias");
            console.log('token' + response.data.token);
            return console.log(response);
          }).catch((error)=>{
            //this.mensajeError=true       
              console.log(error.response.data.msg)
            }
          )
        }
      },
       
    }
}
</script>

<style>

.form-registro{
    margin: auto;
    width: 400px;
    background: #ffff;
    /* pardding margen interno */
    padding: 30px;
    border-radius: 4px;
    font-family: 'calibri';
    color: #E2E2E2;
    box-shadow: 7px 13px 37px #52515198;
}

.titulo{
  color:#72128E
}

.form-input .v-label{
    color: #72128E;
    font-size: 18px;
}
.form-input .placeholder{
    color: #72128E;
    font-size: 18px;
}

#caja{
  color:#72128E
}
.boton{
    width: 100%;
    background: #72128E;
    padding: 10px;
    margin: 16px 0px;
    border-radius: 12px;
    color: #FFFFFF;
}
</style>