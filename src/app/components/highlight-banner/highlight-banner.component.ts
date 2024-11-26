import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { BannerService } from '../../services/banner/banner.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-highlight-banner',
  templateUrl: './highlight-banner.component.html',
  styleUrls: ['./highlight-banner.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HighlightBannerComponent implements OnInit, AfterViewInit {
  @ViewChild('highlightCarousel', { static: false }) highlightCarousel!: ElementRef;

  carouselInstance: any;
  banners: any[] = [];

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.bannerService.getActiveBanners().subscribe({
      next: (data) => {
        this.banners = data;
      },
      error: (err) => {
        console.error('Error al obtener los banners:', err);
      },
    });
  }

  ngAfterViewInit() {
    if (this.highlightCarousel) {
      const carouselElement = this.highlightCarousel.nativeElement;
      this.carouselInstance = new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
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
