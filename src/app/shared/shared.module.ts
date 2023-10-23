import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module'; 
import {RippleModule} from "primeng/ripple";  



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PrimengModule,
    RippleModule
  ],
  declarations: [ 
  ],
  exports: [
    CommonModule,
  
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PrimengModule,
      
  ],
  providers: [
      ]
})
export class SharedModule { }
