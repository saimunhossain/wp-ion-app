import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController) {
    
    this.storage.ready().then(()=>{

      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;
        console.log(this.cartItems);
        
      })

    )}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
