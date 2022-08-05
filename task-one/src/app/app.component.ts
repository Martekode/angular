import { Component } from '@angular/core';
import { Friend } from './friend';
import { AddFriendService } from './add-friend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-one';
  langArray = ["PHP","C#","C++","Python", "javascript", "java", "typescript", "Assembly", "native C", "scratch", "kotlin", "Swift"];
  friendModel = new Friend(null,null, null,null,null);
  neen = "lele";
  lala  : Friend  | null= null;

  constructor(private addFriendService: AddFriendService){
  }

  makeNewFriend(){
    console.log(this.friendModel);
    this.lala = this.friendModel;
    let observable = this.addFriendService.addFriend(this.friendModel);
    observable.subscribe(data => console.log(data), error => console.error(error));
  }
}
