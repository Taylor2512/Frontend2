import {  NgModule } from '@angular/core';
 
 import { PersonaListComponent } from './pages/persona-list/persona-list.component';
import { PersonaEditComponent } from './pages/persona-edit/persona-edit.component';
import { PersonaCreateComponent } from './pages/persona-create/persona-create.component';
import { PersonaViewComponent } from './pages/persona-view/persona-view.component';
 
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonaRoutingModule } from './persona-routing.module';
 
@NgModule({
  declarations: [

    PersonaListComponent,
    PersonaEditComponent,
    PersonaCreateComponent,
    PersonaViewComponent
  ],
  imports: [
    PersonaRoutingModule,
    SharedModule,
 
   ],
   providers:[SharedModule],
   exports:[ ],
 })
export class PersonaModule {}