import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
	baseUrl:string;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log('RestProvider Provider');
    this.storage.get('baseUrl').then(val => {
    	this.baseUrl = val;
    })
  }
//Login a user
  login(data){
  	console.log(data)
  	return new Promise(resolve => {
	    this.http.post(this.baseUrl + '/auth/authenticate', data).subscribe((data:any) => {
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
  }

//Register a user
  reg(data){
  	return new Promise(resolve => {
	    this.http.post(this.baseUrl + '/auth/register', data).subscribe((data:any) => {
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
  }  

}
