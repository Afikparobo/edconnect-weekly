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

let checkAuthors = Array.isArray(obj.authors);
let checkTags = Array.isArray(obj.tags);

let value = true;
for (const item in obj) {
    if (obj[item] === null  || obj[item] === undefined){
        value =false;
    }
  }


  if (value && checkAuthors && checkTags){
    return true
}

return false 
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};