import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Display content under transparent status bar (Android only)
      StatusBar.setOverlaysWebView({ overlay: true });
      SplashScreen.hide();

      // Trigger the fcm service setup here
      // this.fcmService.initPush();
    });
  }
}
