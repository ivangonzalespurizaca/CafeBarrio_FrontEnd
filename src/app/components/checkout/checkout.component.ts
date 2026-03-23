import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2'; // 1. Importamos SweetAlert2

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  nombreCliente: string = '';
  celular: string = '';
  direccion: string = '';
  items: any[] = [];
  totalCarrito: number = 0;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(data => {
      this.items = data;
      this.totalCarrito = this.carritoService.obtenerTotal();
    });
  }

  procesarPedido() {
    // 2. Mostramos un modal de carga (Loading) para mejorar la UX mientras el servidor responde
    Swal.fire({
      title: 'Procesando tu pedido...',
      text: 'Estamos preparando todo tu café ☕',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const pedidoParaEnviar = this.carritoService.prepararPedido(
      this.nombreCliente, 
      this.celular, 
      this.direccion
    );

    this.pedidoService.registrar(pedidoParaEnviar).subscribe({
      next: (res) => {
        // 3. Éxito: Modal elegante con botón oscuro (estilo marca)
        Swal.fire({
          icon: 'success',
          title: '¡Pedido Realizado!',
          html: `Tu orden <b>#${res.id}</b> ha sido registrada con éxito. <br> En breve nos comunicaremos contigo.`,
          confirmButtonColor: '#212529', // Color Dark de nuestra marca
          confirmButtonText: 'Volver al inicio'
        }).then((result) => {
          this.carritoService.limpiarCarrito();
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        // 4. Error: Modal de advertencia
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un problema al procesar tu pedido: ' + (err.error.message || 'Error de conexión'),
          confirmButtonColor: '#212529'
        });
      }
    });
  }
}