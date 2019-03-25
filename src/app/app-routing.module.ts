import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
