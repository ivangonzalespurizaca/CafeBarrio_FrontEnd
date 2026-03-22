import { DetallePedidoRequest } from './detalle-pedido-request.model';

export interface PedidoRequest {
    clienteNombre: string;
    celular: string;
    direccion: string;
    items: DetallePedidoRequest[]; // <-- ¡IMPORTANTE! Debe llamarse "items" como en Java
}