import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';
import { DetallePedidoRequest } from '../models/detalle-pedido-request.model';
import { PedidoRequest } from '../models/pedido-request.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Lista interna de productos con su cantidad
  private items: { producto: Producto, cantidad: number }[] = [];

  // Observable para que los componentes se suscriban a los cambios
  private _carrito = new BehaviorSubject<{ producto: Producto, cantidad: number }[]>([]);
  carrito$ = this._carrito.asObservable();

  constructor() {}

  // Agregar producto (RF-FE-04)
  agregar(producto: Producto, cantidad: number = 1) {
    const itemExistente = this.items.find(i => i.producto.id === producto.id);
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;

    if (cantidadActual + cantidad <= producto.stock) {
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({ producto, cantidad });
        }
        this.notificar();
    } else {
        alert(`Solo quedan ${producto.stock} unidades disponibles de ${producto.nombre}`);
    }
  }

  quitar(productoId: number) {
    this.items = this.items.filter(i => i.producto.id !== productoId);
    this.notificar();
  }

  // Calcular Total General (RF-FE-05)
  obtenerTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  }

  // --- TRANSFORMAR PARA EL BACKEND (Mapeo a tus DTOs) ---
  prepararPedido(nombre: string, cel: string, dir: string): PedidoRequest {
    const detalles: DetallePedidoRequest[] = this.items.map(item => ({
      idProducto: item.producto.id!,
      cantidad: item.cantidad
    }));

    return {
      clienteNombre: nombre,
      celular: cel,
      direccion: dir,
      items: detalles // Nombre exacto como en tu PedidoRequestDTO.java
    };
  }

  quitarUno(productoId: number) {
  const item = this.items.find(i => i.producto.id === productoId);
  
  if (item) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      // Si solo queda 1 y le dan a "-", lo borramos
      this.quitar(productoId);
      return; // evitamos el doble notificar()
    }
    this.notificar();
  }
}

  limpiarCarrito() {
    this.items = [];
    this.notificar();
  }

  private notificar() {
    this._carrito.next([...this.items]);
  }
}