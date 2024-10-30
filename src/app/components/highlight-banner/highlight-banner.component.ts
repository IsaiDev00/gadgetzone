import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-highlight-banner',
  templateUrl: './highlight-banner.component.html',
  styleUrls: ['./highlight-banner.component.css'],
  standalone: true
})
export class HighlightBannerComponent implements AfterViewInit {
  @ViewChild('highlightCarousel', { static: false }) highlightCarousel!: ElementRef;

  carouselInstance: any;

  ngAfterViewInit() {
    if (this.highlightCarousel) {
      const carouselElement = this.highlightCarousel.nativeElement;
      this.carouselInstance = new bootstrap.Carousel(carouselElement, {
        interval: 3000, // Tiempo de espera entre imágenes (en ms)
        ride: 'carousel'
      });
    }
  }

  toggleCarousel() {
    if (this.carouselInstance) {
      if (this.carouselInstance._isPaused) {
        this.carouselInstance.cycle();
      } else {
        this.carouselInstance.pause();
      }
    }
  }
}
