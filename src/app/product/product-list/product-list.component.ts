import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
 
 products:Product[]=[];
filteredProducts:Product[]=[];
sortOrder:string="";


 constructor(
  private productService:ProductService,
private cartService:CartService,
private snackbar:MatSnackBar){}


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
        this.products=data;
        this.filteredProducts=data;
    })

  }



addToCart(product:Product){
  this.cartService.addToCart(product).subscribe({
    next:()=>{
      this.snackbar.open("Product added to cart","",{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })

  }})
}

applyFilter(event:Event):void{
  let searchTerm = (event.target as HTMLInputElement).value;
  searchTerm=searchTerm.toLowerCase();
  this.filteredProducts=this.products.filter(
    product => product.name.toLowerCase().includes(searchTerm))

    this.sortProducts(this.sortOrder);
  }


sortProducts(sortValue:string){
this.sortOrder=sortValue;

if(this.sortOrder==="priceLowHigh"){
  this.filteredProducts.sort((a,b)=>a.price - b.price)
}

if(this.sortOrder==="priceHighLow"){
    this.filteredProducts.sort((a,b)=>b.price - a.price)

}

}

}
