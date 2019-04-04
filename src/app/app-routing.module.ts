import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';
import { CommunicationPageComponent } from './components/pages/communication-page/communication-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent
  },
  {
    path: 'components/table',
    component: TablePageComponent
  },
  {
    path: 'intro',
    component: IntroPageComponent
  },
  {
    path: 'style/communication',
    component: CommunicationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
