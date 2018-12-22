import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TabsPage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

/*
export class MyApp {
  constructor(... public splashScreen: SplashScreen, ...) {
  this.initializeApp();
}
initializeApp() {

 this.platform.ready().then(() => {
   setTimeout(() => {
     this.splashScreen.hide();
   }, 2000);
 });
}
*/

/*
export class MyApp {
  rootPage:any = TabsPage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}*/


/*
  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.hideSplashScreen();
    });
      }
      hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
           Splashscreen.hide();
      }, 100);
     }
}*/