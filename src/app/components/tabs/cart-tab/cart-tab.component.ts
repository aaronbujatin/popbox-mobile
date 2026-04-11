import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Product } from 'src/app/model/product';
import { DecimalPipe } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
}

@Component({
  selector: 'app-cart-tab',
  templateUrl: './cart-tab.component.html',
  styleUrls: ['./cart-tab.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    DecimalPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartTabComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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

  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Hirono Little Mischief Series',
      variant: 'Whole set',
      price: 7200,
      quantity: 1,
      image: 'https://picsum.photos/seed/cart1/200/200',
      selected: false,
    },
    {
      id: 2,
      name: 'Hirono Little Hare Plush Doll Pendant',
      variant: '1 Set',
      price: 1700,
      quantity: 1,
      image: 'https://picsum.photos/seed/cart2/200/200',
      selected: true,
    },
  ];

  get allSelected(): boolean {
    return this.cartItems.length > 0 && this.cartItems.every((i) => i.selected);
  }

  get selectedCount(): number {
    return this.cartItems.filter((i) => i.selected).length;
  }

  get selectedTotal(): number {
    return this.cartItems
      .filter((i) => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  toggleSelectAll() {
    const next = !this.allSelected;
    this.cartItems = this.cartItems.map((i) => ({ ...i, selected: next }));
  }

  toggleItem(id: number) {
    this.cartItems = this.cartItems.map((i) =>
      i.id === id ? { ...i, selected: !i.selected } : i,
    );
  }

  increase(id: number) {
    this.cartItems = this.cartItems.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }

  decrease(id: number) {
    this.cartItems = this.cartItems.map((i) =>
      i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i,
    );
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter((i) => i.id !== id);
  }
}
