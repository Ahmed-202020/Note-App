import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import  jwtDecode  from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseURL: string = "https://route-egypt-api.herokuapp.com/";
  token:any = localStorage.getItem("userToken");
  decoded: any = jwtDecode(this.token);
  userID = this.decoded._id;
  constructor(private _HttpClient: HttpClient) { }

  addNote(data:any):Observable<any> {
    return this._HttpClient.post(this.baseURL+"addNote" , data)
  }
  getAllNotes(): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        Token:this.token ,
        userID: this.decoded._id
      }),
      body: {

      }
    }
    return this._HttpClient.get(this.baseURL+"getUserNotes" , options)
  }

  deleteNote(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
      }),
      body: {
        NoteID:data.NoteID ,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.baseURL+"deleteNote" , options)
  }
  updateNote(data:any):Observable<any> {
    return this._HttpClient.put(this.baseURL+"updateNote" , data)
  }
}
