/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.domain.ionicfpn',
  appName: 'ionic-FPN',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreens: {
      launchShowDuration: 0
    },
    PushNotifications : {
      presentationOptions: ['badge','sound','alert']
    }
  },
  cordova:{}
};

export default config;
