import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productoService.listarParaCatalogo().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  cargarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  filtrar(idCategoria: number): void {
    this.categoriaSeleccionada = idCategoria;
    if (idCategoria === 0) {
      this.cargarProductos(); 
    } else {
      this.productoService.filtrarPorCategoria(idCategoria).subscribe({
        next: (data) => this.productos = data,
        error: (err) => console.error('Error al filtrar', err)
      });
    }
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
    this.router.navigate(['/carrito'])
  }
}