"use strict";
// Session 1: Function, Variable Defined
let id = 5;
let company = "Hi";
let isPub = true;
let ids = [1, 3, 4];
let x = [1, 2, 3];
// you can specify TYPE of paramters
const concatValues = (a, b) => {
  return a + b;
};
console.log(concatValues("5", "6"));
// Define Object
const User = {
  id: 1,
  name: "rlla",
  age: 22,
  greet(msg) {
    console.log(msg);
  },
};
User.greet("Hiiiii");
if (User.age) {
  console.log(User.age);
}
// this function can take string or number as parameter
// type = parameter type
const printID = (id) => {
  console.log(id);
};
printID("13");
// signContract expect an {OBJECT}
const signContract = (employee) => {
  console.log("Contract signed by " + employee.name);
};
signContract({ name: "ella", creditScore: 100, id: 1, email: "acs@gmail.com" });

// Session 5: enum, print ERROR message
// ERROR can be more than one: unauthorized, user doesn't exist, etc
var LoginError;
(function (LoginError) {
  LoginError["Unauthorized"] = "Unauthorized";
  LoginError["NoUser"] = "User doesn't exist";
})(LoginError || (LoginError = {}));
const printErrorMsg = (error) => {
  if (error == LoginError.Unauthorized) {
    console.log("You are not authorized");
  } else if (error == LoginError.NoUser) {
    console.log("No user");
  }
};
printErrorMsg(LoginError.NoUser);

// Session 6: Class
class StorageContainer {
  constructor() {
    this.contents = [];
  }
  addItem(item) {
    this.contents.push(item);
  }
  getItem(idx) {
    return this.contents[idx];
  }
}
const usernames = new StorageContainer();
usernames.addItem("a");
usernames.addItem("b");
console.log(usernames.getItem(0));
