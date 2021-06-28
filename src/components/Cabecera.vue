<template>
  <div v-if="this.$store.state.token != ''" >
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-system-bar color="#128E75"></v-system-bar>
      <v-app-bar color="#17A589">
        <v-app-bar-nav-icon @click="drawer = true" class="white--text"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn @click="cerrarSesion()" style=" position: left" color="#128E75" primary--text > <v-icon>mdi-logout</v-icon>Salir</v-btn>
      </v-app-bar>

    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary bottom expand  >
          <v-list-item :to="{path:'/home'}">
          <v-list-item-action>
              <v-icon>mdi-{{icons[0]}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title  v-text="'Home'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>   

      <v-list>

        <v-list-group  v-for="item in items"  :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action >

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title" :to="child.ruta">
            
            <v-list-item-content >           
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
           
           
          </v-list-item>
          

      </v-list-group>
    </v-list>
     
    </v-navigation-drawer>
  </div>
</template>

<script>
 export default {
   name: 'App',
    data(){
      return {
      token:'',
      icons: ['home','logout','shopping','sitemap','cart','chart-line','account','account-multiple'],
      items: [
        {action: 'mdi-sitemap',
          items: 
          [ {title:'Articulos',ruta:{path:'/articulo'}},
            { title: 'Categorías',ruta: {path:'/categoria'}}
          ],
          title: 'Almacen',
          //active:true
        },
        { action: 'mdi-shopping',
          items: [
            { title: 'Compras' ,ruta:{path:'/compra'}},
            { title: 'Proveedores',ruta:{path:'/listarProveedores'} },
          ],
          title: 'Compras',
        },
        {action: 'mdi-cart',
          items: [{ title: 'Ventas' ,ruta:{path:'/venta'}},
                  { title: 'Clientes' ,ruta:{path:'/listarClientes'}}
          ],
          title: 'Ventas',
        },
        {action: 'mdi-chart-line',
          items: [{ title: 'Consultar compras',ruta:{path:'/persona'} },
                  { title: 'Consultar ventas',ruta: {path:'/persona'}}
          ],
          title: 'Consultas',
        },
        { action: 'mdi-account-multiple',
          items: [{ title: 'Usuarios',ruta:{path:'/persona'} } ],
          title: 'Acceso',
        }
      ],
      drawer:false

      }
    },
    methods:{
      cerrarSesion(){
        this.$router.push("/");
        this.$store.dispatch("setToken", this.token);
        console.log('token',this.$store.state.token);
      }
    }
     
 };


</script>

