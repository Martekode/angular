import { Component } from '@angular/core';
import { Friend } from './friend';
import { AddFriendService } from './add-friend.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-one';
  langArray = ["PHP","C#","C++","Python", "javascript", "java", "typescript", "Assembly", "native C", "scratch", "kotlin", "Swift"];
  friendModel = new Friend(null,null, null,null,null);
  neen = "lele";
  lala  : Friend  | null= null;
  protected _allFriends:Array<any>;

  constructor(private addFriendService: AddFriendService){
    this._allFriends = new Array<any>();

  }

  makeNewFriend(){
    console.log(this.friendModel);
    this.lala = this.friendModel;
    let observable = this.addFriendService.addFriend(this.friendModel);
    observable.subscribe(succes => this.Obama('http://localhost:6969/allFriends'), error => console.error(error));
    console.log(this.allFriends);
  }

  ngOnInit(): void {
    this.Obama('http://localhost:6969/allFriends');
  }

  public async Obama(url:string) : Promise<any>{
    let response = await fetch(url , {method : 'GET' , headers : {'content-type': 'application/json'}});
    let data = await response.json();
    this._allFriends = data;
    // console.log(this._allFriends);
  }

  get allFriends(){
    return this._allFriends;
  }
}
