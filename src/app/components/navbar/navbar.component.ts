import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  cantidadItems: number = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    // Nos suscribimos para que el contador cambie en tiempo real
    this.carritoService.carrito$.subscribe(items => {
      // Sumamos todas las cantidades de los productos en el carrito
      this.cantidadItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    });
  }
}