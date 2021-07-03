import login from '../components/login.vue';
import categorias from '../components/categorias.vue';
import compras from '../components/compras.vue';
import ventas from '../components/ventas.vue';

export const routes = [    
    {path:'/',component: login},
    {path:'/categorias',component: categorias},
    {path:'/compras',component: compras},
    {path:'/ventas',component: ventas},
]