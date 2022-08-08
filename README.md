# angular

## we created a form in the app.component.html

this is actually not good practice, normally you would make a component seperatly for that and cast it inside the app.component.html.
every component that is created has a tag which is used to place it in app.component.html.
but for the sake of the exercise i followed it.

---

so we created a form: standard labels and inputs with names and id's.
we used something knew called ngModel.

```html
<form (ngSubmit)="makeNewFriend()" novalidate #friendForm="ngForm">
  <label for="firstName">first name</label>
  <input
    [(ngModel)]="friendModel.firstName"
    pattern="[a-zA-Z' ]*"
    [class.invalid]="firstName.invalid && firstName.touched"
    required
    #firstName="ngModel"
    name="firstName"
    id="firstName"
    type="text"
  />
  <label for="last-name">last name</label>
  <input
    [(ngModel)]="friendModel.lastName"
    pattern="[a-zA-Z' ]*"
    [class.invalid]="lastName.invalid && lastName.touched"
    required
    #lastName="ngModel"
    name="last-name"
    type="text"
  />
  <label for="email">email</label>
  <input
    [(ngModel)]="friendModel.email"
    [email]="true"
    [class.invalid]="email.invalid && email.touched"
    required
    #email="ngModel"
    name="email"
    type="text"
  />
  <label for="phone-number">phone number</label>
  <input
    [(ngModel)]="friendModel.phoneNumber"
    pattern="[+0-9]*"
    [class.invalid]="phoneNumber.invalid && phoneNumber.touched"
    required
    #phoneNumber="ngModel"
    name="phone-number"
    type="text"
  />
  <label for="fav-lang">favorite language</label>
  <select
    [(ngModel)]="friendModel.favLang"
    [class.invalid]="favLang.invalid && favLang.touched"
    required
    #favLang="ngModel"
    name="fav-lang"
    id="fav-lang"
  >
    <option *ngFor="let lang of langArray" [value]="lang">{{lang}}</option>
  </select>
  <button [disabled]="friendForm.form.invalid" id="submit">Submit data!</button>
</form>
```

this ngModel will double bind this, which means that as soon as the input value changes also the elements that us that data will change at the same time.
in the form itself we place an ngsubmit with an onsubmit function that we will write ourselves.
we bind it to our firendModel wich is our instantiation of a new friend with null properties until someone changes the input values.

```ts
friendModel = new Friend(null, null, null, null, null);
```

we use class.invalid to apply that class when the input is empty and touched. otherwise it would always apply that class on load.
we also place required so that everything needs to be filled in.
in the select dropdown we loop over an array we have created with all the languages we want displayed.

```ts
langArray = [
  "PHP",
  "C#",
  "C++",
  "Python",
  "javascript",
  "java",
  "typescript",
  "Assembly",
  "native C",
  "scratch",
  "kotlin",
  "Swift",
];
```

we loop with \*ngFor : we say let lang. it looks a little bit like a foreach from php: foreach(languageArray as language) but then in reverse : let language of languageArray.
we also use {{double curly braces}}, you could see this a little bit like a php tag that echo's: <?= data ?>.
we also disable the button if the form is invalid. when it has not been touced and or the values are not comform.
U can see that by the [disabled ]tag helper.

## we made a friend class

```ts
export class Friend {
  private _firstName: string | null;
  private _lastName: string | null;
  private _email: string | null;
  private _phoneNumber: number | null;
  private _favLang: string | null;

  constructor(
    fname: string | null,
    lname: string | null,
    email: string | null,
    pnumber: number | null,
    favlang: string | null
  ) {
    this._firstName = fname;
    this._lastName = lname;
    this._email = email;
    this._phoneNumber = pnumber;
    this._favLang = favlang;
  }

  set firstName(firstName: string | null) {
    this._firstName = firstName;
  }
  set lastName(name: string) {
    this._lastName = name;
  }
  set email(email: string) {
    this._email = email;
  }
  set phoneNumber(number: number) {
    this._phoneNumber = number;
  }
  set favLang(favLang: string) {
    this._favLang = favLang;
  }
}
```

normally you would put them on public but i didn't want to do that. so i got errors. offcourse sinds the data of the input is double binded to it we need to be able to change them. because they are on private in my case i had to make setters.
also made them nullable because of the task.

---

## now we need the make firend func

```ts
  makeNewFriend(){
    let observable = this.addFriendService.addFriend(this.friendModel);
    observable.subscribe(succes => this.Obama('http://localhost:6969/allFriends'), error => console.error(error));
    console.log(this.allFriends);
  }
```

we make an observable but we then need a service that is going to handle friend submits.

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Friend } from "./friend";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AddFriendService {
  private _url: string = "http://localhost:6969/";

  constructor(private httpclient: HttpClient) {}

  addFriend(friend: Friend): Observable<Object> {
    console.log("friend added");
    return this.httpclient.post(this._url + "allFriends", friend);
  }
}
```

we giva a private url with our default url string. we dependency inject httpclient into the constructor.
this gives ous acces to its methods without ever heving to make a new HTTPclient.
and we have a addfriend func but we'll talk about that later.

## dependecy inject the addservuce we just created

```ts
  constructor(private addFriendService: AddFriendService){
    this._allFriends = new Array<any>();

  }
```

i depency inject for the same reason. in the task this wan't required but i figured it coul be done anyway. sinds we are never going to make a addfriendservice.
we also instantiate a allFriends array. you'll see why later.

# server side

## server code

```ts
let allFriends = [
  {
    _firstName: "Coach",
    _lastName: "Tim",
    _email: "tim.broos@becode.org",
    _phoneNumber: "0469420666",
    _favLang: "Javascript",
  },
];

// Below you can define how your API handles a get or a post request.
// Try sending a get request to the root, you should get a "Hello from server" back.

app.get("/", function (request, response) {
  response.send("Hello from server");
  console.log("started server");
});

app.post("/", function (request, response) {
  response.status(200).send({ message: "Data received" });
});
app.get("/allFriends", function (request, response) {
  response.send(allFriends);
});
app.post("/allFriends", function (request, response) {
  console.log(request.body);
  allFriends.push(request.body);
  response.status(200).send({ message: "Data received" });
});

app.listen(PORT, function () {});
```

so we need an array to store all the data. look at allFriends. i changed the default given a little so it is comform with my friend model. you'll see why when we try todisplay it.

i have a app.get on root that says hello client side and server side

i have a app.post on root that was default and i don't use.

i have an app.get on /allFriends that gives back the allFriends array

i have an app.post on /allFriends that pushes to newly submitted data into the allFriends array.

now we can get the json data and post it. this is basically an api.

## now we need to call this push function in our client to post tha new Friend to the server.

```ts
let observable = this.addFriendService.addFriend(this.friendModel);
```

that's what this observable is for and as you see it calles a method of addfriendservice called addFriend that takes the friendModel as param. let's take a look

```ts
  addFriend(friend : Friend):Observable<Object>{
    console.log("friend added");
    return this.httpclient.post(this._url + "allFriends", friend);
  }
```

as you can see we use httpclient post to post the new friend to the base url + allFriends to get to the right url.
now this is stored under the variable called observable.

## now we create a fetch to get the data from the server and display all the friends

```ts
  public async Obama(url:string) : Promise<any>{
    let response = await fetch(url , {method : 'GET' , headers : {'content-type': 'application/json'}});
    let data = await response.json();
    this._allFriends = data;
    // console.log(this._allFriends);
  }
```

we do this with this method. we fetch into response, we await the response.json into data. and make the property allFriends = to data. now everything is stored into that prop when the func is called.

```ts
observable.subscribe(
  (succes) => this.Obama("http://localhost:6969/allFriends"),
  (error) => console.error(error)
);
```

on succes of the observable we calle the func so tha we get the data from the server after we have pushed our update.

## we also need this on init otherwise we get errors when trying to display.

```ts
 ngOnInit(): void {
    this.Obama('http://localhost:6969/allFriends');
  }
```

we also need an import for this sinds this is build into angular core.
so now on init of the page we will get the data immediately from the server.

## now we can display

```html
<div *ngFor="let friend of allFriends">
  <div>
    <h1>{{friend._firstName + ' ' + friend._lastName}}</h1>
    <ul>
      <li>{{friend._email}}</li>
      <li>{{friend._phoneNumber}}</li>
      <li>{{friend._favLang}}</li>
    </ul>
  </div>
</div>
```

we already know how to do this. it's with \*ngFor.
