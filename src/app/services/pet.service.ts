import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet, PetList } from '../model/pet.model';

const baseURL = "http://localhost:3000/api/"

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) {

  }

  getAll(params?:any): Observable<PetList> {
    let queryParams = {}
    if (params) {
      queryParams = {
        params: new HttpParams()
        .set("filter", params.filter && JSON.stringify(params.filter) || "")
        .set("sort", params.sort || "")
      }
    }
    return this.http.get(`${baseURL}pets`, queryParams).pipe(map((data: any) => {
      return new PetList(data);
    }))
  }

  getOne(id: number): Observable<Pet> {
    return this.http.get(`${baseURL}pets/${id}`).pipe(map((data: any) => {
      return new Pet(data);
    }))
  }
}
