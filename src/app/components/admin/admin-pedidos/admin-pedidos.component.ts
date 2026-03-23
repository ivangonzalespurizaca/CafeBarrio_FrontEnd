import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoResponse } from '../../../models/pedido-response.model';
import Swal from 'sweetalert2'; // 1. Importar SweetAlert2

type EstadoPedido = 'PENDIENTE' | 'EN_PREPARACION' | 'ENTREGADO' | 'TODOS';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  
  pedidos: PedidoResponse[] = [];
  pedidoDetalleSeleccionado: PedidoResponse | null = null;
  filtroActual: EstadoPedido = 'PENDIENTE';

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(estado: EstadoPedido = 'PENDIENTE') {
    this.filtroActual = estado;
    
    if (estado === 'TODOS') {
      this.pedidoService.listarTodos().subscribe(res => this.pedidos = res);
    } else {
      this.pedidoService.listarPorEstado(estado as any).subscribe(res => this.pedidos = res);
    }
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    // 2. Definir textos y colores dinámicos según el flujo del café
    const esPreparar = nuevoEstado === 'EN_PREPARACION';
    const titulo = esPreparar ? '¿Empezar a preparar?' : '¿Confirmar entrega?';
    const texto = esPreparar 
      ? 'El pedido pasará a la lista de preparación.' 
      : 'Asegúrate de que el cliente haya recibido su café.';
    const colorBoton = esPreparar ? '#212529' : '#198754'; // Dark para preparar, Verde para entregar

    // 3. Confirmación de SweetAlert2
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: colorBoton,
      cancelButtonColor: '#6c757d',
      confirmButtonText: esPreparar ? 'Sí, preparar' : 'Sí, entregado',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Mostrar cargando mientras el servidor responde
        Swal.fire({
          title: 'Actualizando estado...',
          didOpen: () => { Swal.showLoading(); }
        });

        this.pedidoService.cambiarEstado(id, nuevoEstado).subscribe({
          next: () => {
            // 4. Feedback rápido (Toast) de éxito
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });

            Toast.fire({
              icon: 'success',
              title: esPreparar ? 'Pedido en preparación' : 'Pedido entregado'
            });

            this.cargarPedidos(this.filtroActual);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el pedido.',
              confirmButtonColor: '#212529'
            });
          }
        });
      }
    });
  }

  verDetalle(pedido: PedidoResponse) {
    this.pedidoDetalleSeleccionado = pedido;
  }
}