import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OperationResult, OperationResultDo, OperationResultList } from 'src/app/data/OperationResul';
import { PersonaRequest, PersonaRequestDto } from 'src/app/data/PersonaModel';
import { environment } from 'src/environments/environments';
const APIRUL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  constructor(private _http: HttpClient) {
  }
  private getHttpParams(params: any, prefix = ''): HttpParams {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        if (value !== undefined && value !== null) {
          const paramKey = prefix ? `${prefix}.${key}` : key;

          if (typeof value === 'object' && !Array.isArray(value)) {
            httpParams = this.getHttpParams(value, paramKey);
          } else if (Array.isArray(value)) {
            for (const item of value) {
              httpParams = httpParams.append(paramKey, item.toString());
            }
          } else {
            httpParams = httpParams.set(paramKey, value.toString());
          }
        }
      }
    }

    return httpParams;
  }

  getPersons(request: PersonaRequest): Observable<any> {
    const URLSEARCHLISTPERSON: string = APIRUL + "api/persona/get-list-persons";

    const httpParams = this.getHttpParams(request);
    return this._http
      .get<OperationResultList<PersonaRequestDto>>(URLSEARCHLISTPERSON, { params: httpParams })
      .pipe(
        map((res: OperationResultList<PersonaRequestDto>) => {

          if (res === null) {

            throw new Error(`${"erorr"}||${"error"}`);
          }
          if (!res.success) {

            throw new Error(`${res.statusCode}||${res.message}`);
          }

          return res;
        })
      );
  }
  getPersonbyId(id: number): Observable<any> {
    const URLSEARCHPERSON = `${APIRUL}api/persona/get-person-byid/${id}`;

    return this._http
      .get<OperationResultDo<PersonaRequestDto>>(URLSEARCHPERSON)
      .pipe(
        map((res: OperationResultDo<PersonaRequestDto>) => {

          if (res === null) {

            throw new Error(`${"erorr"}||${"error"}`);
          }
          if (!res.success) {

            throw new Error(`${res.statusCode}||${res.message}`);
          }

          return res;
        })
      );
  }

  createPerson(request: PersonaRequest): Observable<any> {
    const URLCREATEPERSON: string = APIRUL + "api/persona/create-person";

    return this._http
      .post<OperationResultDo<PersonaRequestDto>>(URLCREATEPERSON, request)
      .pipe(
        map((res: OperationResultDo<PersonaRequestDto>) => {

          if (res === null) {

            throw new Error(`${"erorr"}||${"error"}`);
          }
          if (!res.success) {

            throw new Error(`${res.statusCode}||${res.message}`);
          }

          return res;
        })
      );

  }
  editPerson(id: number, request: PersonaRequest): Observable<any> {
    const URLUPDATEPERSON: string = APIRUL + `api/persona/${id}/update-person`;

    return this._http
      .put<OperationResultDo<PersonaRequestDto>>(URLUPDATEPERSON, request)
      .pipe(
        map((res: OperationResultDo<PersonaRequestDto>) => {

          if (res === null) {

            throw new Error(`${"erorr"}||${"error"}`);
          }
          if (!res.success) {

            throw new Error(`${res.statusCode}||${res.message}`);
          }

          return res;
        })
      );

  }
  delettePerson(id: number): Observable<any> {
    const URLDELETTEPERSON: string = APIRUL + `api/persona/delte-person/${id}`;

    return this._http
      .delete<OperationResultDo<PersonaRequestDto>>(URLDELETTEPERSON)
      .pipe(
        map((res: OperationResultDo<PersonaRequestDto>) => {

          if (res === null) {

            throw new Error(`${"erorr"}||${"error"}`);
          }
          if (!res.success) {

            throw new Error(`${res.statusCode}||${res.message}`);
          }

          return res;
        })
      );

  }
}