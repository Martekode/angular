export class Friend {
    private _firstName: string | null;
    private _lastName:string | null;
    private _email:string | null;
    private _phoneNumber:number |null;
    private _favLang:string | null;

    constructor( fname:string | null , lname:string | null , email:string | null , pnumber:number | null , favlang:string | null ){
        this._firstName= fname;
        this._lastName = lname;
        this._email = email;
        this._phoneNumber = pnumber;
        this._favLang = favlang;
    }

    set firstName(firstName:string|null){
        this._firstName = firstName;
    }
    set lastName(name:string){
        this._lastName = name;
    }
    set email(email:string){
        this._email = email;
    }
    set phoneNumber(number:number){
        this._phoneNumber = number;
    }
    set favLang(favLang:string){
        this._favLang = favLang;
    }
}
