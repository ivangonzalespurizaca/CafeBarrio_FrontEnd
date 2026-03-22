import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
  items: { producto: Producto, cantidad: number }[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios del carrito
    this.carritoService.carrito$.subscribe(data => {
      this.items = data;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  aumentar(producto: Producto) {
    this.carritoService.agregar(producto, 1);
  }

  disminuir(productoId: number) {
    this.carritoService.quitarUno(productoId);
  }

  eliminar(productoId: number) {
    this.carritoService.quitar(productoId);
  }
}