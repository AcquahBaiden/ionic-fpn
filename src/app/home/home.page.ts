import { Component, OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { tap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
name = 'Apply one';
token: string = null;
  constructor(private afMessagining: AngularFireMessaging,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {}


ngOnInit() {
  console.log('Initializing HomePage');
  console.log('checking isNativePlatform:',Capacitor.isNativePlatform);
  if(!Capacitor.isNativePlatform) {
    console.log('inside true');
    this.reguestNativePermission();
  }else{
    console.log('inside false');
    this.listenForMessages();
  }
}

reguestNativePermission(){
 // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token: Token) => {
      console.log('Push registration succes & toekn:',token.value);
      alert('Push registration success, token: ' + token.value);
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      console.log('Push registration error:',error);
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('pushNotificationReceived');
      alert('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    }
  );

}

//PWA Controls
listenForMessages(){
  this.getMessages().subscribe(async (msg: any)=>{
    console.log('New MeSSAGE:', msg);
    const alert = await this.alertCtrl.create({
      header: msg.notification.title,
      subHeader: msg.notification.body,
      message: msg.data.info,
      buttons: ['OK'],
    });
    await alert.present();
  });
}

requestUserPermission(){
  this.requestPermission().subscribe(
    async token =>{
      const toast = await this.toastCtrl.create({
        message: 'Got your token',
        duration: 2000
      });
      toast.present();
    },
    async (err)=>{
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err,
        buttons: ['Ok']
      });
    }
  );
}

async deleteUserToken(){
  this.deleteToken();
  const toast = await this.toastCtrl.create({
    message: 'Token removed',
    duration: 2000
  });
  toast.present();
}

 //PWA Functions
 requestPermission(){
  return this.afMessagining.requestToken.pipe(
    tap(token => {
      this.token = token;
      console.log('Token received in requestPermission: ',token);
    })
  );}

getMessages(){
  return this.afMessagining.messages;
}

deleteToken(){
  if(this.token){
    this.afMessagining.deleteToken(this.token);
    this.token = null;
  }
}

}
