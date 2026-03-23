import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Categoria } from '../../../models/categoria.model';
import Swal from 'sweetalert2'; // 1. Importación esencial

@Component({
  selector: 'app-admin-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-producto-form.component.html'
})
export class AdminProductoFormComponent implements OnChanges {
  private productoService = inject(ProductoService);

  @Input() productoParaEditar: Producto | null = null;
  @Input() categorias: Categoria[] = [];
  @Output() onGuardado = new EventEmitter<void>();

  producto: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    idCategoria: ''
  };

  archivoSeleccionado: File | null = null;
  previsualizacion: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoParaEditar'] && this.productoParaEditar) {
      this.producto = { ...this.productoParaEditar };
      this.previsualizacion = this.productoParaEditar.imagenUrl || null;
    } else if (!this.productoParaEditar) {
      this.resetearFormulario();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();
      reader.onload = () => this.previsualizacion = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    // 2. Feedback de "Subiendo..." (muy importante por la imagen)
    Swal.fire({
      title: 'Guardando producto',
      text: 'Estamos procesando la información...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const datosParaEnviar: Producto = {
      ...this.producto,
      id: this.productoParaEditar?.id,
      activo: this.productoParaEditar ? this.productoParaEditar.activo : true
    };

    this.productoService.guardarConImagen(datosParaEnviar, this.archivoSeleccionado).subscribe({
      next: () => {
        // 3. Éxito: Notificación tipo "Toast" (esquina superior) o Modal
        Swal.fire({
          icon: 'success',
          title: this.productoParaEditar ? 'Producto actualizado' : 'Producto registrado',
          text: `El café "${this.producto.nombre}" está listo.`,
          confirmButtonColor: '#212529',
          timer: 2000
        });

        this.onGuardado.emit();
        this.resetearFormulario();
      },
      error: (err) => {
        // 4. Error: Alerta de fallo
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: 'No se pudo procesar el producto. Inténtalo de nuevo.',
          confirmButtonColor: '#212529'
        });
        console.error("Error al guardar:", err);
      }
    });
  }

  resetearFormulario(form?: NgForm) {
    // Mantenemos el timeout para que el modal de Bootstrap cierre antes de limpiar
    setTimeout(() => {
      if (form) {
        form.resetForm();
      }
      this.producto = { nombre: '', descripcion: '', precio: 0, stock: 0, idCategoria: '' };
      this.archivoSeleccionado = null;
      this.previsualizacion = null;
    }, 350);
  }
}