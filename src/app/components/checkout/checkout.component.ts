import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el formulario
import { CarritoService } from '../../services/carrito.service'; // Debes crear este servicio
import { Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  // Datos del formulario
  nombreCliente: string = '';
  celular: string = '';
  direccion: string = '';
  items: any[] = [];
  totalCarrito: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.totalCarrito = this.carritoService.obtenerTotal();
  }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(data => {
      this.items = data; // <--- Ahora 'items' ya existe y el HTML no dará error
      this.totalCarrito = this.carritoService.obtenerTotal();
    });
  }

  procesarPedido() {
    // 1. Preparamos el objeto usando la lógica que ya tienes en el CarritoService
    const pedidoParaEnviar = this.carritoService.prepararPedido(
      this.nombreCliente, 
      this.celular, 
      this.direccion
    );

    // 2. Enviamos al Backend
    this.pedidoService.registrar(pedidoParaEnviar).subscribe({
      next: (res) => {
        alert(`¡Pedido #${res.id} realizado con éxito!`);
        this.carritoService.limpiarCarrito();
        this.router.navigate(['/']); // Volver al catálogo
      },
      error: (err) => alert('Error al procesar pedido: ' + err.error.message)
    });
  }
}