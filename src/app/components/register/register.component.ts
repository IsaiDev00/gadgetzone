import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // IMPORTA RouterModule AQUÍ
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      role: ['user'],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, fullName, role } = this.registerForm.value;

      this.authService.register(email, password, fullName, role).subscribe({
        next: () => alert('Usuario registrado correctamente'),
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          this.errorMessage = 'Ocurrió un error al registrar el usuario. Intenta nuevamente.';
        },
      });
    }
  }
}
