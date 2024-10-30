import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent {
  constructor(private cartService: CartService) {}

  downloadReceipt() {
    const userId = 1; // Suponiendo que el userId es 1

    this.cartService.getReceipt(userId).subscribe(
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
  }
}
