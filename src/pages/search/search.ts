import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
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

  loadMoreProducts(event){
    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData) => {
     this.products = this.products.concat(JSON.parse(searchData.body).products);
      if(JSON.parse(searchData.body).products.length < 10){
       event.enable(false);
        this.toastCtrl.create({
         message: "No more products!",
         duration: 5000
       }).present();
      }
      event.complete();
     this.page ++;
    });
 }

}
