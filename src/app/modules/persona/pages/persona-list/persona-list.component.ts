import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaDto, PersonaRequest, Sort } from 'src/app/data/PersonaModel';
import { PersonaService } from '../persona.service';
import { OperationResultList } from 'src/app/data/OperationResul';
import { EventManager } from '@angular/platform-browser';
  @Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit{
  loading: any;
  logsList!:PersonaDto[];
  entityFilterRequest:PersonaRequest | undefined;
  totalRows:any;
  constructor(private route: Router,private personaService:PersonaService){
    this.InitData();
  
  }
    private InitData() {
      this.entityFilterRequest = {};
      this.queryDataToServiceRemote(this.entityFilterRequest);
    }

    ngOnInit(): void {
      this.InitData();
    }
  loadLogsLazy(event: any) {
    if(!this.entityFilterRequest){
      return;
    }
    let sortCol = event.sortField;
    let sortColOrder = event.sortOrder;
    let offset = event.first/event.rows;
    let take = event.rows;
    let sortStr = "";
 
  console.log('offset',event);
  
    this.entityFilterRequest.sort = sortStr;
    this.entityFilterRequest.take = take;
    this.entityFilterRequest.offset = offset;
  
  this.personaService.getPersons(this.entityFilterRequest)
  
     this.queryDataToServiceRemote(this.entityFilterRequest);
  }
  
  editPerson(id: number){
    if(id > 0) {
      this.logsList=[];
      this.navieditPerson(id);
    }
  }
  deletePerson(id: number){
    this.personaService.delettePerson( id)
    .subscribe((result) => {
      // Maneja la respuesta del servicio
    });    this.entityFilterRequest={
  
    }
    this.InitData();

  }
  navieditPerson(id:number) {
    console.log('id',id);
    this.route.navigate(['persona/edit', id]); // Navegación a 'persona/edit/:id'
  }
  queryDataToServiceRemote(entityRequest: PersonaRequest) {
   
    this.personaService.getPersons(entityRequest)
    .subscribe(
        {
          next: (data) => {
            let dataTmp = <OperationResultList<PersonaDto>>data;
            if(dataTmp) {
              if(dataTmp.result){
                if(dataTmp.result.length === 0){
                  
                  return;
                }
              }
  
              this.totalRows = dataTmp.length;
              this.logsList = dataTmp.result;
              console.log('resul', dataTmp.result);
  
  
            }
          },
          error: (error) => {
            this.loading = false;
           
          },
          complete: () => {
            this.loading = false;
          }
        }
      );
  }
  
  }
  