import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FirstPageModule } from './first-page/first-page.module';
import { AppComponent } from './app.component';
import { Guard } from 'src/app/shared/quard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FirstPageModule
  ],
  providers: [
    Guard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
