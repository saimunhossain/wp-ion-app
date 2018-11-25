import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("searchQuery"));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
