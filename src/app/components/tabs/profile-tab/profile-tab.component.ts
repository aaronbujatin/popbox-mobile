import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileTabComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
