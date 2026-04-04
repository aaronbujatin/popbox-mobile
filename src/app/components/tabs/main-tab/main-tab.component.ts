import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainTabComponent  {

  constructor() { 
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

}
