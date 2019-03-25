import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/material/material.module';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { NavigationMenuComponent } from './core/modules/navigation/components/navigation-menu/navigation-menu.component';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';
import { MomentService } from './core/services/moment.service';
import { MaterialTableModule } from './modules/material-table/material-table.module';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { InterfacesComponent } from './components/style/interfaces/interfaces.component';
import { TestingComponent } from './components/style/testing/testing.component';
import { CommunicationComponent } from './components/style/communication/communication.component';
import { ResponsibilityComponent } from './components/style/responsibility/responsibility.component';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    NavigationMenuComponent,
    TablePageComponent,
    IntroPageComponent,
    CodeBlockComponent,
    SafeHtmlPipe,
    InterfacesComponent,
    TestingComponent,
    CommunicationComponent,
    ResponsibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MaterialTableModule
  ],
  providers: [MomentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
