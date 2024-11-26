import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
      role: ['admin'],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, fullName, role } = this.registerForm.value;

      this.authService.registerAdmin(email, password, fullName, role).subscribe({
        next: () => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          this.errorMessage = 'Correo registrado. Intenta nuevamente.';
        },
      });
    }
  }
}