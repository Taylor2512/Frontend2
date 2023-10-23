import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-headeer',
  templateUrl: './headeer.component.html',
  styleUrls: ['./headeer.component.css']
})
export class HeadeerComponent {
  createPerson(){
    this.route.navigate(['/persona/create']);

  }
  constructor(private route: Router){}
  listarPersonas(){
    this.route.navigate(['/persona/list']);

   }
}
