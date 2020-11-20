import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';
import { stringify } from 'querystring';
import { AuthorizeService } from './authorize.service';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

constructor(private http: HttpClient, private authorizeService: AuthorizeService) { }
user:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  // user:string  = AuthorizeService.getUser().pipe(map(u => u && u.userId));

  public userID: Observable<string>;


  getData(){
    this.authorizeService.getUser()
    .subscribe(data => {
      console.log(data["sub"]); //You will get all your user related information in this field
      this.user=data["sub"];

    });
    console.log("Inside Service of Get");
    localStorage.setItem["userId"]=this.user;
    console.log(this.userID); //this.user
    return this.http.get('https://localhost:44312/api/contacts?userid='+this.user);  //https://localhost:44352/ webapi host url
    // return this.http.get('https://localhost:44312/api/contacts');  //https://localhost:44352/ webapi host url
  }

  postData(formData){
    console.log("inside Post data");
    formData.UserId=this.user;
    return this.http.post('https://localhost:44312/api/contacts',formData);
  }

  putData(id,formData){
    console.log("inside PUT data");
    formData.UserId=this.user;
    return this.http.put('https://localhost:44312/api/contacts/'+id,formData);
  }
  deleteData(id){
    console.log(id)
    return this.http.delete('https://localhost:44312/api/contacts/'+id);
  }

}
