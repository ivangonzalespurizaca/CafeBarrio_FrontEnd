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
}
