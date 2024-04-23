import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserRoutingModule } from '../Features/user/user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,  
    HttpClientModule ,
    ReactiveFormsModule,
    FormsModule, 
  ]
  ,
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
