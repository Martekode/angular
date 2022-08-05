import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  private _url:string = "http://localhost:6969/";

  constructor(private httpclient:HttpClient) {
  }

  addFriend(friend : Friend){
    console.log("friend added");
    return this.httpclient.post(this._url, friend);
  }
}
