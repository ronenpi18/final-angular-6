import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}