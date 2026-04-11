import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToast
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonBackButton,
    CommonModule,
    IonToast
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('ProductViewComponent initialized');
  }

  images = [
    'https://prod-thailand-res.popmart.com/default/20260327_144433_389253____1_____1200x1200.jpg?x-oss-process=image/format,webp',
    'https://prod-thailand-res.popmart.com/default/20260327_144433_740394____2_____1200x1200.jpg',
    'https://prod-thailand-res.popmart.com/default/20260327_144433_371773____4_____1200x1200.jpg',
  ];

  sizes = [
    { label: 'Single Box', value: 'single', icon: 'https://prod-thailand-res.popmart.com/default/20260327_144131_098078____6_____1200x1200.jpg' },
    { label: 'Whole Set', value: 'set', icon: 'https://prod-thailand-res.popmart.com/default/20260327_144155_311895____7_____1200x1200.jpg' },
  ];

  selectedSize = 'single';
  quantity = 1;

  increaseQty() { this.quantity++; }
  decreaseQty() { if (this.quantity > 1) this.quantity--; }

  addToCart() { console.log('Added to cart', this.selectedSize, this.quantity); }
  buyNow() { console.log('Buy now', this.selectedSize, this.quantity); }
}
