import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationResultDo } from 'src/app/data/OperationResul';
import { PersonaDto } from 'src/app/data/PersonaModel';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent {
  loading: any;
  personDatoResul!:PersonaDto;
  formEditPerson!: FormGroup;
  fields!: any;
  constructor(private formBuilder: FormBuilder,
     private location: Location,

    private personaService: PersonaService ) {
      this.BuildForm();
 
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
 
    }
    saveEditPerson(){
      const personaDto = this.mapFormToDto<PersonaDto>(this.formEditPerson);
  this.personaService.createPerson( personaDto)
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
