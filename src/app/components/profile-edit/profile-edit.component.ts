import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit() {
    this.authService.getUserData().subscribe((user) => {
      if (user) {
        console.log('Datos del usuario cargados:', user);
        this.profileForm.patchValue({
          name: user.name || '',
          email: user.email || '',
          address: user.address || '',
          phone: user.phone || '',
        });
      } else {
        console.error('No se encontraron datos del usuario');
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
  
      this.authService.getUserData().subscribe((user) => {
        if (user) {
          formData.role = user.role;
          console.log('Formulario enviado con los siguientes datos (incluyendo rol):', formData);
  
          this.authService.updateUserData(formData).subscribe({
            next: (response) => {
              console.log('Respuesta del servidor al actualizar:', response);
              alert('Datos actualizados correctamente.');
            },
            error: (err) => {
              console.error('Error al actualizar la información del usuario:', err);
              alert('Ocurrió un error al guardar los cambios. Intenta nuevamente.');
            },
          });          
        } else {
          console.error('No se pudo obtener el rol del usuario.');
          alert('No se pudo cargar el rol del usuario. Intenta nuevamente.');
        }
      });
    } else {
      console.error('Formulario inválido, revisa los campos obligatorios.');
      alert('Formulario inválido. Por favor, revisa los campos obligatorios.');
    }
  }
  

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada exitosamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      },
    });
  }
}
