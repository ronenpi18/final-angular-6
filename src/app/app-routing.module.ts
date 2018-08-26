import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
    {
      path: 'families/:familyId/processes/:processId',
      pathMatch: 'full',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'families/1/processes/100'
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}