import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonGrid,
  IonToast,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Product } from 'src/app/model/product';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { ProductRecommendComponent } from 'src/app/shared/product-recommend/product-recommend.component';
import {
  bagCheckOutline,
  bagOutline,
  globe,
  menuOutline,
  searchOutline,
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CarouselComponent,
    ProductRecommendComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeTabComponent implements OnInit {
  images: string[] = [
    'https://global-static.popmart.com/globalAdmin/1775027077402____pc____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1775027278429____pc____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1775027623074____pc____.jpg?x-oss-process=image/format,webp',
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Angry Molly – Angry Energy Series Plush Pendant',
      price: 900,
      imageUrl:
        'https://prod-eurasian-res.popmart.com/default/20260224_141040_794721____1_____1200x1200.jpg?x-oss-process=image/resize,p_40,format,webp,format,webp',
      isNew: false,
    },
    {
      id: 2,
      name: 'SKULLPANDA × GUO PEI 1/6 Action Figure',
      price: 8300,
      imageUrl:
        'https://prod-eurasian-res.popmart.com/default/20260228_150519_084460____1_____1200x1200.jpg?x-oss-process=image/resize,p_40,format,webp,format,webp',
      isNew: true,
      isOutOfStock: true,
    },
    {
      id: 3,
      name: 'Bunny Family Series Figure',
      price: 1200,
      imageUrl:
        'https://prod-eurasian-res.popmart.com/default/20260228_150945_366856____1_____1200x1200.jpg?x-oss-process=image/resize,p_40,format,webp,format,webp',
      isNew: true,
    },
    {
      id: 4,
      name: 'Lucky Bag Surprise Collection',
      price: 2500,
      imageUrl:
        'https://prod-eurasian-res.popmart.com/default/20260306_135252_580247____list_pic_____800x800.png?x-oss-process=image/resize,p_40,format,webp,format,webp',
      isNew: true,
      badge: 'LUCKY BAG',
    },
  ];

  product = {
    id: 1,
    name: 'Angry Molly – Angry Energy Series Plush Pendant',
    price: 900,
    imageUrl: 'https://picsum.photos/seed/toy1/400/400',
    isNew: false,
  };

  ngOnInit() {}

  searchQuery = '';

  constructor() {
    addIcons({ searchOutline, bagOutline, menuOutline, bagCheckOutline });
  }

  openCart() {}
  openMenu() {}
}
