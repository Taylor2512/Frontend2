import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadeerComponent } from './layout/headeer/headeer.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './shared/primeng.module';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PersonaModule } from './modules/persona/persona.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';


 
import { CollapseModule } from "ngx-bootstrap/collapse";   
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
  
 @NgModule({
  declarations: [
    AppComponent,
    HeadeerComponent,
    ContentLayoutComponent,
 
    
    

  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    // core & shared
     SharedModule,
     AppRoutingModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 4000,
      progressBar: true,
      preventDuplicates: true
    }),
    
    CollapseModule.forRoot(),
  ],
  providers: [
     MessageService,
    ConfirmationService,
    DatePipe,
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
