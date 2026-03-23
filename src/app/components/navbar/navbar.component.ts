import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private carritoService = inject(CarritoService);

  mostraNavbar: boolean = true; // Variable de control de visibilidad
  cantidadItems: number = 0;
  enRutaAdmin: boolean = false;

  get rutaInicio(): string {
    return this.enRutaAdmin ? '/admin/productos' : '/';
  }

  ngOnInit(): void {
    // 1. Contador de carrito en tiempo real
    this.carritoService.carrito$.subscribe(items => {
      this.cantidadItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    });

    // 2. Control de Rutas (Admin y Visibilidad en Login)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const urlActual = event.urlAfterRedirects || event.url;
      
      // Lógica de Administrador
      this.enRutaAdmin = urlActual.includes('/admin');

      // Lógica de Visibilidad: Ocultar si la ruta es exactamente '/login'
      this.mostraNavbar = !urlActual.includes('/login');
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}