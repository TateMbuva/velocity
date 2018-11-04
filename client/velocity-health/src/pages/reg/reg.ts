import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
	user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.user = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegPage');
  }

  //reg user
  reg(){
  	console.log(this.user)

  }

  //go back to login
  login(){
  	this.navCtrl.pop();
  }

}
