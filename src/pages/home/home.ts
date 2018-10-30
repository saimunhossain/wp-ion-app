import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];

  @ViewChild('productSlides') productSlides:Slides;

  constructor(public navCtrl: NavController) {

    this.WooCommerce = WC({
      url: "http://rafidfeed.com",
      consumerKey: "ck_d9e1d9540aa7fdc421eae68dc456c18294f54658",
      consumerSecret: "cs_d5d8c3819670edc5baefcc2fba077d7bc2bb501e"
    });

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

}
