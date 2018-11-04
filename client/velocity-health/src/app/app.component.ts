import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MemberPage } from '../pages/member/member';
import { AdminPage } from '../pages/admin/admin';
import { PartnerPage } from '../pages/partner/partner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    //member
    this.events.subscribe('user:memberPaid', ()=>{
      this.pages = [
      { title: 'Home', component: MemberPage }
    ];

    });
     //admin
    this.events.subscribe('user:memberAdmin', ()=>{
      this.pages = [
      { title: 'Home', component: AdminPage }
    ];

    });
     //patner
    this.events.subscribe('user:memberPartner', ()=>{
      this.pages = [
      { title: 'Home', component: PartnerPage }
    ];

    });

    this.storage.set("baseUrl", "http://localhost:3000")

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
