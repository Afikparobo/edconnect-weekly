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
        //Check if Authors is array 
        let checkAuthor = Array.isArray(obj.authors)
        checkAuthor ? true : this.errors.push("Authors should be an array")

        //Check if Tag is array
        let checkTags = Array.isArray(obj.tags)
        checkTags ? true : this.errors.push("Tags should be an array")

        //Check for empty values
        let value = true;
        for (const key in obj){
            if (!obj [key] || obj[key] === null || obj[key] === undefined || obj[key] === ""){
                value = false;
                this.errors.push("should not be empty")
                break;
            }
        }
        return (checkAuthor && checkTags && value) ? true : false
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