import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import { AdminProductoFormComponent } from '../admin-producto-form/admin-producto-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, AdminProductoFormComponent], // Necesario para pipes como 'number' y 'currency'
  templateUrl: './admin-productos.component.html'
})
export class AdminProductosComponent implements OnInit {
  // Inyección moderna de Angular 19
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  productoSeleccionado: Producto | null = null;
  
  productos: Producto[] = [];
  categorias: Categoria[] = [];

  prepararNuevo() {
    this.productoSeleccionado = null; 
  }

  // Método para el botón de la lapicera
  prepararEditar(item: Producto) {
    this.productoSeleccionado = { ...item };
  }

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listarTodas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error("Error al cargar categorías:", err)
    });
  }

  alCambiarCategoria(event: any) {
  const id = Number(event.target.value);
  
  if (id === 0) {
    this.cargarProductos(); // Tu método que trae todo
  } else {
    this.productoService.filtrarPorCategoria(id).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error(err)
    });
  }
}

  cargarProductos() {
    this.productoService.listarTodoParaAdmin().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error("Error al conectar con la API:", err)
    });
  }

eliminarProducto(item: Producto) {
    const esDesactivar = item.activo;
    const accionText = esDesactivar ? 'desactivar' : 'reactivar';
    const colorBoton = esDesactivar ? '#d33' : '#198754'; // Rojo para desactivar, Verde para reactivar

    // 2. Confirmación con SweetAlert2
    Swal.fire({
      title: `¿Deseas ${accionText} este café?`,
      text: `El producto "${item.nombre}" cambiará su visibilidad en el catálogo.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: colorBoton,
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Sí, ${accionText}`,
      cancelButtonText: 'Cancelar',
      reverseButtons: true // Pone el botón de confirmar a la derecha
    }).then((result) => {
      if (result.isConfirmed) {
        
        // 3. Llamada al servicio
        this.productoService.eliminar(item.id!).subscribe({
          next: () => {
            // Cambio de estado local para reflejar en la tabla inmediatamente
            item.activo = !item.activo; 
            
            // 4. Feedback de éxito tipo "Toast" (esquina superior derecha)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });

            Toast.fire({
              icon: 'success',
              title: `Producto ${item.activo ? 'Reactivado' : 'Desactivado'} correctamente`
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo cambiar el estado del producto.',
              confirmButtonColor: '#212529'
            });
          }
        });
      }
    });
  }
}