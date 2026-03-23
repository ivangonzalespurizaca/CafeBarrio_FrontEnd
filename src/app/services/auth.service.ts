import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  login(email: string, pass: string) {
    return this.http.post<any>(this.API_URL, { email, password: pass }).pipe(
      tap(res => {
        // Guardamos todo en el localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', res.nombre);
        localStorage.setItem('userEmail', res.email);
        localStorage.setItem('userRole', res.rol);
        this.router.navigate(['/admin/productos']);
      })
    );
  }

  // Getters para usar en los componentes
  estaLogueado(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getNombreAdmin(): string {
    return localStorage.getItem('userName') || 'Admin';
  }

  logout() {
    localStorage.clear(); // Limpia todo el rastro
    this.router.navigate(['/login']);
  }
}