import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

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

}
