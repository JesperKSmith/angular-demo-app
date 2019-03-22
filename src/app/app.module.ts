import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/material/material.module';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { TestComponent } from './components/test/test.component';
import { NavigationMenuComponent } from './core/modules/navigation/components/navigation-menu/navigation-menu.component';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';
// import { TableModule } from './core/modules/table/table.module';
import { MomentService } from './core/services/moment.service';
import { MaterialTableModule } from './modules/material-table/material-table.module';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    TestComponent,
    NavigationMenuComponent,
    TablePageComponent,
    IntroPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    // TableModule,
    MaterialTableModule
  ],
  providers: [MomentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
