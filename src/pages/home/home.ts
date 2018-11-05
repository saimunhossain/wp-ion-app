import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetailsPage } from './../product-details/product-details';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides:Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://rafidfeed.com",
      consumerKey: "ck_d9e1d9540aa7fdc421eae68dc456c18294f54658",
      consumerSecret: "cs_d5d8c3819670edc5baefcc2fba077d7bc2bb501e"
    });

    this.loadMoreProducts(null)

    this.WooCommerce.getAsync("products").then((data) => {
        console.log(JSON.parse(data.body));
        this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err);
    })

  }

  ionViewDidLoad(){
   setInterval(() => {

    if(this.productSlides.getActiveIndex() == this.productSlides.length() -1 )
    this.productSlides.slideTo(0);

    this.productSlides.slideNext();
   }, 3000)
  }

  loadMoreProducts(event){

    if(event == null){
      this.page = 2
      this.moreProducts = [];
    }
    else
      this.page ++;

    this.WooCommerce.getAsync("products?page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null){
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products avaialable!",
          duration: 3000
        }).present();
      }
  }, (err) => {
    console.log(err);
    
  })
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

}
