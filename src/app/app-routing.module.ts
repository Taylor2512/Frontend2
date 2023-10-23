import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'persona',
        loadChildren: () =>
          import('./modules/persona/persona.module').then(m => m.PersonaModule),
      }
    ]
  },
  // Si se intenta acceder a una ruta no coincidente, simplemente redirigir a la ruta 'persona/list'
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
