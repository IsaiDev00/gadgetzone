import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthState();
  }

  updateAuthState() {
    this.authService.getFirebaseUserId().subscribe({
      next: (firebaseUserId) => {
        this.isAuthenticated = !!firebaseUserId;
        console.log('Estado de autenticación:', this.isAuthenticated);

        if (firebaseUserId) {
          this.authService.getUserRole().subscribe({
            next: (role) => {
              this.isAdmin = role === 'admin';
              console.log('Rol actualizado:', role, 'isAdmin:', this.isAdmin);
            },
            error: (err) => {
              console.error('Error al obtener el rol:', err);
              this.isAdmin = false;
            },
          });
        } else {
          this.isAdmin = false;
        }
      },
      error: (err) => {
        console.error('Error al verificar autenticación:', err);
        this.isAuthenticated = false;
        this.isAdmin = false;
      },
    });
  }
}
