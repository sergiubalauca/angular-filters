import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SelectComponent } from './dropdown/select/select.component';
import { SearchMultiSelectComponent } from './dropdown/search-multi-select/search-multi-select.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    SelectComponent,
    SearchMultiSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
