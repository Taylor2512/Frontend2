import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona.service';
import { OperationResultDo } from 'src/app/data/OperationResul';
import { PersonaDto } from 'src/app/data/PersonaModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent {
  idapi!:any;
  loading: any;
  personDatoResul!:PersonaDto;
  formEditPerson!: FormGroup;
  fields!: any;
  constructor(private formBuilder: FormBuilder,
    private routerparams: Router,  
    private activatedRoute: ActivatedRoute,
    private location: Location,

    private personaService: PersonaService ) {
      console.log('ss',this.idapi);

      this.idapi = <number>(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
      console.log('ss',this.idapi);
      this.BuildForm();
    this.prepareDataremote();

  }
   ngOnInit() {
    this.BuildForm();
 
  }
  private BuildForm() {
    this.fields = this.getDatosPersona();
    this.formEditPerson = this.buildForm(this.fields);
  


  }
  goBack() {
    this.location.back(); // Esto ejecutará la acción de retroceso en la navegación
  }
  // Método genérico para mapear un formulario a un DTO
  mapFormToDto<T>(formGroup: FormGroup): T {
    const dto: any = {};

    Object.keys(formGroup.controls).forEach((key) => {
      dto[key] = formGroup.get(key)?.value;
    });

    return dto as T;
  }

    GetFormGoru(){
      this.formEditPerson = this.buildForm(this.getDatosPersona())
    }
    prepareDataremote(){
      this.personaService.getPersonbyId(this.idapi)
      .subscribe(
          {
            next: (data) => {
              let dataTmp = <OperationResultDo<PersonaDto>>data;
              if(dataTmp) {
                if(dataTmp.result){
                  if(dataTmp.result===null){
                    
                    return;
                  }
                }    
                console.log('resul',dataTmp.result);
                 this.formEditPerson.patchValue(dataTmp.result);


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
    saveEditPerson(){
      const personaDto = this.mapFormToDto<PersonaDto>(this.formEditPerson);
  this.personaService.editPerson(this.idapi, personaDto)
      .subscribe((result) => {
        // Maneja la respuesta del servicio
      });
      
    }

    getDatosPersona(): any {
      return {
        username: {name: 'Usuario', required: false},
        cedula: {name: 'Cédula', disabled: false},
        firstName: {name: 'Primer nombre', disabled: false},
        midleName: {name: 'Segundo Nombre', disabled: false},
        lastName: {name: 'Primer Apellido', disabled: false},
        lastNameSecond: {name: 'Segundo Apellido', disabled: false},
        razonSocial: {name: 'Razon Social', disabled: false},
       
      };
    }

    buildForm(fields: any): FormGroup {
      const formGroup: FormGroup = new FormGroup({});
      Object.keys(fields).forEach((key) => {
        const validators = [];
        let value = {};
        if (fields[key].required) validators.push(Validators.required);
        if (fields[key].min) validators.push(Validators.min(fields[key].min));
        if (fields[key].max) validators.push(Validators.max(fields[key].max));
        if (fields[key].maxLength) validators.push(Validators.maxLength(fields[key].maxLength));
        if (fields[key].onlyNumber) validators.push(Validators.pattern('^[0-9]*$'));
        if (fields[key].onlyNumberNotZero) validators.push(Validators.pattern('^(?!0+$)(0|[1-9]\\d*)(\\.\\d+)?$'));
  
        if (fields[key].disabled) {
          value = { value: '', disabled: fields[key].disabled };
        } else {
          value ="";
        }
        formGroup.addControl(key, new FormControl(value, validators));
      });
      return formGroup;
    }
  
}
