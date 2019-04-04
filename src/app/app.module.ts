// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/modules/material/material.module';
import { MaterialTableModule } from './modules/material-table/material-table.module';

// Services
import { NavigationService } from './core/modules/navigation/services/navigation.service';
import { TransportService } from './core/services/transport.service';
import { MomentService } from './core/services/moment.service';

// Components
import { AppComponent } from './app.component';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { NavigationMenuComponent } from './core/modules/navigation/components/navigation-menu/navigation-menu.component';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { InterfacesComponent } from './components/style/interfaces/interfaces.component';
import { TestingComponent } from './components/style/testing/testing.component';
import { CommunicationComponent } from './components/style/communication/communication.component';
import { ResponsibilityComponent } from './components/style/responsibility/responsibility.component';
import { CommunicationPageComponent } from './components/pages/communication-page/communication-page.component';
import { TestingPageComponent } from './components/pages/testing-page/testing-page.component';
import { InterfacesPageComponent } from './components/pages/interfaces-page/interfaces-page.component';

// Directives

// Pipes





const COMPONENTS = [
  AppComponent, AppContainerComponent, CodeBlockComponent, CommunicationComponent, InterfacesComponent, NavigationMenuComponent, ResponsibilityComponent, TestingComponent, 
  CommunicationPageComponent, InterfacesPageComponent, IntroPageComponent, TablePageComponent, TestingPageComponent
];
const MODULES = [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, MaterialTableModule, HttpClientModule];
const SERVICES = [MomentService, NavigationService, TransportService];
@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  providers: SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule { }
