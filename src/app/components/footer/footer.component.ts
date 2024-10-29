import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-light text-dark pt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6 mb-3">
            <h5>Acerca de GadgetZone</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-dark text-decoration-none">Nuestra Compañía</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Sostenibilidad</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Carreras</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Proveedores</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Ver Más</a></li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 mb-3">
            <h5>Explorar GadgetZone</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-dark text-decoration-none">Tecnología</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Exploración Digital</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Blog de GadgetZone</a></li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 mb-3">
            <h5>Productos</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-dark text-decoration-none">Electrónicos</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Accesorios</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Ofertas</a></li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 mb-3">
            <h5>Soporte</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-dark text-decoration-none">Soporte al Cliente</a></li>
              <li><a href="#" class="text-dark text-decoration-none">Centro de Ayuda</a></li>
            </ul>
          </div>
        </div>
        <div class="text-center my-3">
          <a href="#" class="text-dark me-3"><i class="bi bi-linkedin" aria-hidden="true"></i></a>
          <a href="#" class="text-dark me-3"><i class="bi bi-facebook" aria-hidden="true"></i></a>
          <a href="#" class="text-dark me-3"><i class="bi bi-twitter" aria-hidden="true"></i></a>
          <a href="#" class="text-dark me-3"><i class="bi bi-youtube" aria-hidden="true"></i></a>
          <a href="#" class="text-dark"><i class="bi bi-instagram" aria-hidden="true"></i></a>
        </div>
        <div class="text-center border-top pt-3">
          <p>&copy; 2024 GadgetZone. Todos los derechos reservados. | <a href="#" class="text-dark text-decoration-none">Contacto</a> | <a href="#" class="text-dark text-decoration-none">Privacidad</a> | <a href="#" class="text-dark text-decoration-none">Términos de Uso</a></p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container a:hover {
      text-decoration: underline;
    }
  `]
})
export class FooterComponent {}
