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
        let valUser = this.data.find(item => item.email === email && item.password === password);
        return (valUser ? true : false);

    }

    getByEmail(email) {
   let user = this.data.find(obj =>{
        return obj.email === email;
    });
    return (user ? user : null);

    }

    getByMatricNumber(matricNumber) {
let user = this.data.find(item => { 
        return item.matricNumber === matricNumber;
    });
    return (user ? user : null)

    }

    validate(obj) {
        this.errors = [];
        let msg;
        let isEmpty, userEmail, userMatric, passNot;

        for (const x in obj){
            if (Object.hasOwnProperty.call(obj, x)){
                const item = obj[x];
                if (item == ""){
                    isEmpty = true;
                    msg = x + " should not be empty"
                    this.errors.push(msg)
                }
            }
        }

        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index];

            if (obj.email == item.email){
                userEmail = true;
                msg = "A user with specified email address already exists";
                this.errors.push(msg);
            }
        }

        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index];

            if (obj.matricNumber == item.matricNumber){
                userMatric = true;
                msg = "A user with specified matric number already exists";
                this.errors.push(msg);
            }
        }

        if (obj.password.length < 7){
            passNot = true;
            msg = "Password should have at least 7 characters"
            this.errors.push(msg);
        }

        if (isEmpty || userEmail || userMatric || passNot){
            return false} else {
                return true;
        }
    }
}

//let value = true
//for(const prop in obj){
    //if(obj[prop] === undefined || obj[prop] === null){
       // value = false;
    //}
//}
//let valEmail = this.data.find(item => item.email === obj.email);
//let valMatric = this.data.find(item => item.matricNumber === obj.matricNumber);
//let passCheck = obj.password.length >= 7 ? true : false;

   //if (passCheck === true && value === true) {
     //if (valEmail === false || valEmail === undefined) {
         //if (valMatric == false || valMatric == undefined) {
             //return true;
            //}
        //}
    //}
    //return false;



    
// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};