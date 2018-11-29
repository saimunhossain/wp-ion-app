import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsByCategoryPage } from './products-by-category';

@NgModule({
    declarations: [
        ProductsByCategoryPage,
    ],
    imports: [
        IonicPageModule.forChild(ProductsByCategoryPage),
    ],
    exports: [
        ProductsByCategoryPage
    ]
})
export class ProductsByCategoryPageModule {}