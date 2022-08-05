import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  private _http:HttpClient;
  private _url:string = "http://localhost:6969/";

  constructor(httpclient:HttpClient) {
    this._http = httpclient;
  }

  addFriend(friend : Friend){
    console.log("friend added");
    this._http.post(this._url, friend);
  }
}
