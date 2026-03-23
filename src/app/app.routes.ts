import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminProductosComponent } from './components/admin/admin-productos/admin-productos.component';
import { AdminPedidosComponent } from './components/admin/admin-pedidos/admin-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: CatalogoComponent },
    { path: 'producto/:id', component: ProductoDetalleComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'checkout', component: CheckoutComponent},
    { path: 'login', component: LoginComponent},

    { 
        path: 'admin', 
        canActivate: [authGuard], 
        children: [
            { path: 'pedidos', component: AdminPedidosComponent },
            { path: 'productos', component: AdminProductosComponent }
        ]
    },
    
    { path: '**', redirectTo: '' }
];
