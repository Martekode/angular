import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from './friend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  private _url:string = "http://localhost:6969/";

  constructor(private httpclient:HttpClient) {
  }

  addFriend(friend : Friend):Observable<Object>{
    console.log("friend added");
    return this.httpclient.post(this._url + "allFriends", friend);
  }
}
