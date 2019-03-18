import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/material/material.module';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { TestComponent } from './components/test/test.component';
import { NavigationMenuComponent } from './core/modules/navigation/components/navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    TestComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
