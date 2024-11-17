import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent {
  constructor(private cartService: CartService, private authService: AuthService) {}

  downloadReceipt() {
    this.authService.getFirebaseUserId().subscribe((firebaseUserId) => {
      if (firebaseUserId) {
        this.cartService.getReceipt(firebaseUserId).subscribe(
          (response) => {
            const blob = new Blob([response], { type: 'application/xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'receipt.xml';
            a.click();
            window.URL.revokeObjectURL(url);
          },
          (error) => {
            console.error('Error al descargar el recibo:', error);
          }
        );
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }
}
