import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario tiene la sesión activa en el localStorage
  if (authService.estaLogueado()) {
    return true; // ¡Adelante, pase!
  } else {
    // Si no está logueado, lo mandamos al login
    router.navigate(['/login']);
    return false; // Bloqueado
  }
};