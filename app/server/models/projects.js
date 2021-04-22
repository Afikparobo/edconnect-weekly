const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
          this.id = id;
          this.name = name;
          this.abstract = abstract;
          this.authors = authors;
          this.tags = tags;
          this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = [];
        let msg;
        let isEmpty; 
        let checkAuthors = Array.isArray(obj.authors); 
        let checkTags = Array.isArray(obj.tags);

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

            if (obj.authors == item.authors){
                checkAuthors = true;
                msg = "Authors should be an array";
                this.errors.push(msg);
            }
        }
        
        for (let index = 0; index < this.data.length; index++){
            const item = this.data[index];

            if (obj.tags == item.tags){
                checkTags = true;
                msg = "Tags should be an array";
                this.errors.push(msg);
            }
        }

        if (isEmpty || checkAuthors || checkTags){
            return true} else {
                return false;
        }
    }
}

//let checkAuthors = Array.isArray(obj.authors);
//let checkTags = Array.isArray(obj.tags);

//let value = true;
//for (const item in obj) {
    //if (!obj[item]  || obj[item] === null){
        //value =false;
    //}
//}


  //if (value && checkAuthors && checkTags){
    //return true
  //}

   //return false 




// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};