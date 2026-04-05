import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

interface CategoryItem {
  id: number;
  name: string;
  image: string;
}

interface Category {
  id: number;
  label: string;
  items: CategoryItem[];
}

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryTabComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  activeCategoryId = 2;

  categories: Category[] = [
    {
      id: 1,
      label: 'NEW & FEATURED',
      items: [
        { id: 1, name: 'New Arrivals', image: 'https://picsum.photos/seed/new1/200/200' },
        { id: 2, name: 'Best Sellers', image: 'https://picsum.photos/seed/new2/200/200' },
      ]
    },
    {
      id: 2,
      label: 'OUR CHARACTERS',
      items: [
        { id: 1, name: 'The Monsters', image: 'https://picsum.photos/seed/m1/200/200' },
        { id: 2, name: 'Hirono',        image: 'https://picsum.photos/seed/m2/200/200' },
        { id: 3, name: 'Skullpanda',    image: 'https://picsum.photos/seed/m3/200/200' },
        { id: 4, name: 'Molly',         image: 'https://picsum.photos/seed/m4/200/200' },
        { id: 5, name: 'Crybaby',       image: 'https://picsum.photos/seed/m5/200/200' },
        { id: 6, name: 'Dimoo',         image: 'https://picsum.photos/seed/m6/200/200' },
        { id: 7, name: 'Twinkle Twinkle', image: 'https://picsum.photos/seed/m7/200/200' },
        { id: 8, name: 'Zsiga',         image: 'https://picsum.photos/seed/m8/200/200' },
        { id: 9, name: 'Angry Molly',   image: 'https://picsum.photos/seed/m9/200/200' },
        { id: 10, name: 'Pucky',        image: 'https://picsum.photos/seed/m10/200/200' },
      ]
    },
    { id: 3, label: 'Event',    items: [] },
    { id: 4, label: 'CATEGORY', items: [] },
    { id: 5, label: 'MEGA',     items: [] },
    { id: 6, label: 'ABOUT US', items: [] },
  ];

  get activeItems(): CategoryItem[] {
    return this.categories.find(c => c.id === this.activeCategoryId)?.items ?? [];
  }

  selectCategory(id: number) {
    this.activeCategoryId = id;
  }

}
