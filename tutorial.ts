// Session 1: Function, Variable Defined
let id:number =5;
let company:string= "Hi";
let isPub: boolean =true;

let ids:number[]=[1,3,4];
let x:any[]=[1,2,3];

// you can specify TYPE of paramters
const concatValues=(a:string,b:string)=>{
    return a+b;
};
console.log(concatValues("5","6"));

// Session 2: Interface->Object
// To make an object, we need Interface (for OBJECT)
interface UserInterface{
    id: number,
    name: string,
    age?:number, // optional by using "?"
    greet(msg:string): void; // why use "void" because we return nothing in the greet function
}
// Define Object, User is the object of UserInterface
const User: UserInterface={
    id:1,
    name: "rlla",
    age:22,
    greet(msg:string):void{
        console.log(msg);
    }
};
User.greet("Hiiiii");
if (User.age){
    console.log(User.age);
}


// Session 3: Type
type IDType = string | number;
// this function can take string or number as parameter
// type = parameter type
const printID=(id: IDType)=>{
    console.log(id);
};
printID("13");


// Session 4: Type + Interface + Function + Object
interface BusinessPartner{
    name:string,
    creditScore:number,
}
interface UserIdentity{
    id:number;
    email:string,
}
// Interface can be type also
type Employee = BusinessPartner & UserIdentity;
// signContract expect an {OBJECT}
const signContract = (employee: Employee)=>{
    console.log("Contract signed by "+employee.name);
}
signContract({name:"ella",creditScore:100,id:1,email:"acs@gmail.com"});


// Session 5: enum, print ERROR message
// ERROR can be more than one: unauthorized, user doesn't exist, etc
enum LoginError{
    Unauthorized = "Unauthorized",
    NoUser = "User doesn't exist",
}
const printErrorMsg=(error: LoginError)=>{
    if (error == LoginError.Unauthorized){
        console.log("You are not authorized");
    }else if (error == LoginError.NoUser){
        console.log("No user");
    }
}
printErrorMsg(LoginError.NoUser);


// Session 6: Class
// readonly = final, cannot change the value once define
// readonly can be used in interface
class StorageContainer<T>{
    private contents: T[]

    constructor(){
        this.contents=[];
    }

    addItem(item:T):void{
        this.contents.push(item);
    }

    getItem(idx:number): T | undefined{
        return this.contents[idx];
    }
}

const usernames = new StorageContainer<string>();
usernames.addItem("a");
usernames.addItem("b");
console.log(usernames.getItem(0));