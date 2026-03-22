import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoRequest } from '../models/pedido-request.model';// Asegúrate de tener este modelo
import { PedidoResponse } from '../models/pedido-response.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  // RF-FE-07: Registrar el pedido del cliente
  registrar(pedido: PedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, pedido);
  }

  // RF-FE-10: Listar pedidos para el Administrador
  listarTodos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(this.apiUrl);
  }

  // RF-FE-10: Actualizar el estado (PENDIENTE -> ENTREGADO, etc.)
  cambiarEstado(id: number, nuevoEstado: string): Observable<PedidoResponse> {
    return this.http.patch<PedidoResponse>(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado });
  }
}