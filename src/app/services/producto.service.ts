import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos'

  constructor(private http: HttpClient) { }

  listarParaCatalogo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  listarTodoParaAdmin(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/admin`);
  }

  filtrarPorCategoria(idCat: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${idCat}`);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }     
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
  guardarConImagen(producto: Producto, archivo: File | null): Observable<Producto> {
    const formData = new FormData();

    const productoBlob = new Blob([JSON.stringify(producto)], {
      type: 'application/json'
    });
    
    formData.append('producto', productoBlob);

    if (archivo) {
      formData.append('archivo', archivo);
    }

    if (producto.id) {
      return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, formData);
    } else {
      return this.http.post<Producto>(this.apiUrl, formData);
    }
  }
}
