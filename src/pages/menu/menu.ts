import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from './../signup/signup';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from './../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://rafidfeed.com",
      consumerKey: "ck_d9e1d9540aa7fdc421eae68dc456c18294f54658",
      consumerSecret: "cs_d5d8c3819670edc5baefcc2fba077d7bc2bb501e"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);
      
      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i=0; i < temp.length; i++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "accessories"){
            temp[i].icon = "game-controller-b";
          }
          if(temp[i].slug == "clothing"){
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "music"){
            temp[i].icon = "musical-notes";
          }
          if(temp[i].slug == "posters"){
            temp[i].icon = "images";
          }

          this.categories.push(temp[i]);
        }
      }
    }, (err) => {
      console.log(err);
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category});
  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push(SignupPage);
    }
  }

}