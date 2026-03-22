import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit {
  producto?: Producto;

  constructor(
    private route: ActivatedRoute,         
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Obtenemos el ID de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // 2. Llamamos al backend
    this.productoService.obtenerPorId(id).subscribe({
      next: (data) => this.producto = data,
      error: (err) => console.error('Error al cargar el detalle', err)
    });
  }

  agregarAlCarrito(): void {
    if (this.producto) {
      this.carritoService.agregar(this.producto);
      this.router.navigate(['/carrito']);
    }
  }
}