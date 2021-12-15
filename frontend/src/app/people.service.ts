import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from './people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addPeople(pep: People){
    return this.http.post(`${this.url}/POST/person`, pep);
  }

  getPeopleList(){
    return this.http.get<People[]>(`${this.url}/GET/person`);
  }

  deletePeople(id){
    return this.http.delete(`${this.url}/DELETE/person/${id}`);
  }

  updatePeople(pep:People){
    return this.http.put(`${this.url}/PUT/person/${pep._id}`, pep);
  }
}
