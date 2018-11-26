import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[] = [];
  page: number = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // console.log(this.navParams.get("searchQuery"));

    this.searchQuery = this.navParams.get("searchQuery");
    this.WooCommerce = WC({
      url: "http://rafidfeed.com",
      consumerKey: "ck_d9e1d9540aa7fdc421eae68dc456c18294f54658",
      consumerSecret: "cs_d5d8c3819670edc5baefcc2fba077d7bc2bb501e"
    });
     this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then((searchData) => {
      this.products = JSON.parse(searchData.body).products;
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
