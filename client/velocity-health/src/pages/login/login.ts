import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 //pages
import { RegPage } from '../reg/reg';
import { MemberPage } from '../member/member';
import { AdminPage } from '../admin/admin';
import { PartnerPage } from '../partner/partner';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  baseUrl:string;
  creds:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public events: Events) {
    this.creds = {
      email: "",
      password: ""
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  reg(){
    	// go to the MyPage component
    	this.navCtrl.push(RegPage);
  	};

   login(){

     this.rest.login(this.creds).then((res) => {
       console.log(res);
       if(res.userType == 'memberPaid' || res.userType == 'member'){
         this.events.publish('user:memberPaid');
         this.navCtrl.setRoot(MemberPage, { user: res });

       }
        if (res.userType == 'admin') { 

         this.events.publish('user:memberAdmin');
         this.navCtrl.setRoot(AdminPage, { user: res });
         
       } 
        if (res.userType == 'partner'){
         this.events.publish('user:memberPartner');
         this.navCtrl.setRoot(PartnerPage, { user: res });
       }

     });
   } 

}
