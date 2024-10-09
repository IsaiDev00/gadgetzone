import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="container">
        <p>&copy; 2024 GadgetZone. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #333;
      color: white;
      padding: 20px 0;
      text-align: center;
    }
  `]
})
export class FooterComponent {}