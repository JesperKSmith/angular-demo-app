import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { TestComponent } from './components/test/test.component';
import { TablePageComponent } from './components/pages/table-page/table-page.component';
import { IntroPageComponent } from './components/pages/intro-page/intro-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'test',
    component: TestComponent
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
