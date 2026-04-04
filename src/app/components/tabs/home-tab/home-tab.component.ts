import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeTabComponent  implements OnInit {

  constructor() { }

  images: string[] = [
    'https://global-static.popmart.com/globalAdmin/1775027077402____pc____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1775027278429____pc____.jpg?x-oss-process=image/format,webp',
    'https://global-static.popmart.com/globalAdmin/1775027623074____pc____.jpg?x-oss-process=image/format,webp'
  ];

  ngOnInit() {}

}
