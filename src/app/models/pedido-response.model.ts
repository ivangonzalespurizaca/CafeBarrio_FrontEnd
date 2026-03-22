import { DetallePedidoResponse } from "./detalle-pedido-response.model";


export interface PedidoResponse {
    id: number;
    fecha: string; // El LocalDateTime llega como String (ISO 8601)
    clienteNombre: string;
    celular: string;
    direccion: string;
    estado: string; // 'PENDIENTE', 'ENTREGADO', etc.
    total: number;
    detalles: DetallePedidoResponse[];
}