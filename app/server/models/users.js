const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
           this.id = id;
           this.firstname = firstname;
           this.lastname = lastname;
           this.email = email;
           this.password = password;
           this.matricNumber = matricNumber;
           this.program = program;
           this.graduationYear = graduationYear;
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`

    }
}

class Users extends DataModel {
    authenticate(email, password) {
        let user = this.data.find((item) => item.email === email && item.password === password);
        return (user ? true : false)

    }

    getByEmail(email) {
   let user = this.data.find((item) => item.email === email);
    return (user ? user : null)

    }

    getByMatricNumber(matricNumber) {
let user = this.data.find((item) => item.matricNumber === matricNumber);
    return (user ? user : null)

    }

    validate(obj) {
let value = true;
for (const item in obj) {
    if (obj[item] === null  || obj[item] === undefined){
        value =false;
    }
  }

  let checkEmail = this.data.find((item) => item.email === obj.email);
  let checkMatric = this.data.find((item) => item.matricNumber === obj.matricNumber);
  let passCheck = obj.password.length >= 7 ?  true : false;

//   if (passCheck === true && value === true) {
//     if (checkEmail === false || checkEmail === undefined) {
//         if (checkMatric == false || checkMatric == undefined) {
//             return true;
//         }
//     }
// }
// return false;


  if (value && checkEmail && checkMatric && passCheck){
      return true
  }

  return false  

    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};