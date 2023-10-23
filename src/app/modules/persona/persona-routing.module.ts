import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaCreateComponent } from './pages/persona-create/persona-create.component';
import { PersonaListComponent } from './pages/persona-list/persona-list.component';
import { PersonaEditComponent } from './pages/persona-edit/persona-edit.component';
import { PersonaViewComponent } from './pages/persona-view/persona-view.component';

const routes: Routes = [
  { path: 'create', component: PersonaCreateComponent },
  { path: 'edit/:id', component: PersonaEditComponent },
  { path: 'view/:id', component: PersonaViewComponent },
  { path: 'list', component: PersonaListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
