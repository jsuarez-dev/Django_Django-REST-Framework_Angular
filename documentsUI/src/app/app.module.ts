import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { FormFilesComponent } from './form-files/form-files.component';
import { FileFieldComponent } from './file-field/file-field.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AppComponent,
    ListFilesComponent,
    FormFilesComponent,
    FileFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
