import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  errorMsg: string = '';
  loading: boolean = false;
  emailVal: string = '';
  passVal: string = '';

  onSubmit(event: any) {
    event.preventDefault();
    this.loading = true;
    this.errorMsg = '';

    this.authService.login(this.emailVal, this.passVal).subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        // Manejamos los errores que definimos en el backend (401, 404)
        this.errorMsg = err.error || 'Error al conectar con el servidor';
      }
    });
  }
}