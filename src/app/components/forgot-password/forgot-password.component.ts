import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;

      this.authService.resetPassword(email).subscribe({
        next: () => {
          this.successMessage = 'Se envió un correo para restablecer la contraseña. Verifica tu bandeja de entrada.';
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error al enviar el correo de recuperación:', err);
          this.errorMessage = 'Ocurrió un error al enviar el correo. Intenta nuevamente.';
          this.successMessage = '';
        },
      });
    }
  }
}
