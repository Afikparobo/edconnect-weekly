// g;obal variables
const path = window.location.href;
const alert = document.querySelector(".alert");
const signUpForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const createProjectForm = document.getElementById("createProjectForm");
// handle registration
if (path.includes("register.html")) {
  window.onload = function () {
    getPrograms();
    getGraduationYears();
    register();
  };
  // get list of programs
  let getPrograms = async function () {
    const programsList = signUpForm.querySelector("[name=program]");
    const url = "/api/programs";
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("HTTP Error Status: " + resp.status);
    } else {
      const programs = await resp.json();
      programs.forEach((prog) => {
        const optElement = document.createElement("option");
        optElement.value = prog.split(" ").join("_");
        optElement.innerHTML = prog;
        programsList.append(optElement);
      });
    }
  };

  // getting graduation years
  let getGraduationYears = async () => {
    const graduationYear = signUpForm.querySelector("[name=graduationYear]");

    const url = "/api/graduationYears";
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("HTTP Error Status: " + resp.status);
    } else {
      const years = await resp.json();
      let result = years.map(year =>{
        return `<option value="${year}">${year}</option>`
      }).join("")
      graduationYear.innerHTML = result;
    }
  };

  // register new user
  const error_Alert = document.getElementById("errormsg");
  error_Alert.style.display = "none"; // hide the div display
  const register = async () => {
    const url = "/api/register";
    signUpForm.addEventListener("submit", async (e) => {
      e.preventDefault(e);
      const firstName = signUpForm.querySelector("[name=firstName]").value;
      const lastName = signUpForm.querySelector("[name=lastName]").value;
      const email = signUpForm.querySelector("[name=email]").value;
      const password = signUpForm.querySelector("[name=password]").value;
      const matricNumber = signUpForm.querySelector("[name=matricNumber]").value;
      const program = signUpForm.querySelector("[name=program]").value;
      const graduationYear = signUpForm.querySelector("[name=graduationYear]").value;
      const userData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        matricNumber: matricNumber,
        program: program,
        graduationYear: graduationYear,
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const user = await resp.json();
      if (resp.status === 200) {
        setCookie("uid", user.data.id);
        window.location.href = "index.html";
      } else {
        alert.style.display = "block";
        user.errors.forEach((err) => {
          alert.innerHTML += `<p>${err}</p>`;
        });
      }
    });
  };
}

if (path.includes("login.html")) {
  window.onload = () => {
    postLogin();
  };
}
const postLogin = async () => {
  let errorEl = document.getElementById("errormsg");
  errorEl.style.display = "none";
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector("[name=email]").value;
    const password = loginForm.querySelector("[name=password]").value;
    console.log(email, password);
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (resp.status === 200) {
      const user = await resp.json();
      setCookie("uid", user.data.id);
      window.location.href = "index.html";
    } else {
      alert.style.display = "block";
      alert.textContent = "Invalid email/password";
    }
  });
};

// creating a project by a user

if (path.includes("index.html")) {
  window.onload = () => {
    setLogin();
  };
}
if (path.includes("createproject.html")) {
  window.onload = () => {
    const checkCookieVal = getCookie("uid");

    if (checkCookieVal === "") {
      window.location.href = "login.html";
    } else {
      setLogin();
      createProject();
    }
  };

  const createProject = async () => {
    const error_Alert = document.getElementById("errormsg");
    error_Alert.style.display = "none";
    createProjectForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = createProjectForm.querySelector("[name=name]").value;
      const abstract = createProjectForm.querySelector("[name=abstract]").value;
      let authors = createProjectForm
        .querySelector("[name=authors]")
        .value.split(",");
      let tags = createProjectForm
        .querySelector("[name=tags]")
        .value.split(",");
      let customAuthors = authors.map((author) => author.trim());
      let customTags = tags.map((tag) => "#" + tag.trim());
      const data = {
        name: name,
        abstract: abstract,
        authors: customAuthors,
        tags: customTags,
      };

      const url = "/api/projects";
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const reply = await resp.json();
      if (resp.status === 200) {
        window.location.href = "index.html";
      } else {
        alert.style.display = "block";
        reply.errors.forEach((err) => {
          alert.innerHTML += `<p>${err}</p>`;
        });
      }
    });
  };
}

if (window.location.href.includes('index.html')){
  //  let projectList = document.getElementsByClassName("showcase")
  //   const project_authors = document.getElementById("project_authors");
  fetch('/api/projects/', { //GET projects. All of them. Although, we are gonna be working with the first 4
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
}
})
.then(response => response.json())
.then(function(response){
  console.log(response)
  document.getElementsByClassName('showcase')[0].innerHTML = ""; // Clear previous cards 
  for (let i = 0; i < 4; i++) {
    // card contents
                let projectTitle = document.createElement('h5');
                let projectTitleLink = document.createElement("a");
                projectTitle.append(projectTitleLink);
                projectTitleLink.href = `viewproject.html?id=${response[i].id}`;
                projectTitleLink.className = "card-title text-primary";
                projectTitleLink.textContent = response[i].name;
                let projectAuthor = document.createElement('h6');
                projectAuthor.className = "card-subtitle mb-2 text-muted";
                projectAuthor.textContent = response[i].authors;
                let projectAbstract = document.createElement('p')
                projectAbstract.className = "card-text";
                projectAbstract.textContent = response[i].abstract
                let projectTags = document.createElement('a')
                projectTags.href =`#`
                projectTags.className = "card-text";
                projectTags.textContent = response[i].tags
                // Create card body div
                let cardBody = document.createElement('div');
                cardBody.className = "card-body";
                let generalCardBodyDiv = document.createElement('div');
                generalCardBodyDiv.className = "col-md-3 col-sm-12 col-lg-3 pb-4"
                // Create card main div
                let cardMain = document.createElement('div');
                cardMain.className = "card";
                //  cardMain.classList.add("col");
               // Append all appendables
               generalCardBodyDiv.appendChild(cardMain);
               cardMain.appendChild(cardBody);
               cardBody.appendChild(projectTitle);
               cardBody.appendChild(projectAuthor);
               cardBody.appendChild(projectAbstract);
               cardBody.appendChild(projectTags);
               document.getElementsByClassName("showcase")[0].appendChild(generalCardBodyDiv);
  }
})
.catch(error => {
    console.log(error);
})  
}        



  
let viewProject = function(){
  //step 10
 

const queryString = window.location.search; // retrive the website link
const params = new URLSearchParams(queryString); 
console.log(params)
    let pId = params.get("id");
    fetch(`/api/projects/${pId}`, { //Use the actual id for the GET method. 
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
  }
  })
      .then(response => response.json())
      // console.log(response.json())
      .then(function(response) {
        let projectName = response.name;
        document.getElementById("project_name").innerHTML = projectName;
        let projectAuthors = response.authors;
        document.getElementById("project_authors").innerHTML = projectAuthors;
        let projectTags = response.tags;
        document.getElementById("project_tags").innerHTML = projectTags;
        let projectAbstract = response.abstract;
        document.getElementById("project_abstract").innerHTML = projectAbstract;
        fetch(`/api/users/${response.createdBy}`, { //Use the actual id for the GET method for createdBy. 
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(function(response) {
            // texts replacements
            let projectAuthor = `${response.firstname} ${response.lastname}`;
            document.getElementById("project_author").innerHTML = projectAuthor;
        })
        .catch(error => {
            console.log(error);
        })
});
}

const setLogin = () => {
  if (document.cookie) {
    const signupLink = document.getElementById("signup");
    const loginLink = document.getElementById("login");
    const logout = document.getElementById("logout");
    const userName = document.getElementById("username");
    const cvalue = getCookie("uid");
    console.log(cvalue);
    if (cvalue) {
      fetch(`/api/users/${cvalue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(function (response) {
          console.log(response);
          userName.textContent = `Hi, ${response.firstname} `;
          userName.style.display = "block";
          logout.style.display = "block";
          signupLink.style.visibility = "hidden";
          loginLink.style.visibility = "hidden";
        });

      logout.addEventListener("click", () => {
        deleteCookie("uid");
        window.location.href = "index.html";
        signupLink.style.visibility = "visible";
        loginLink.style.visibility = "visible";
      });
    }
  }
};



// cookie management functions
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" + "path=/";
}

// get cookie
function getCookie(cname) {
  let cvalue;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArr = decodedCookie.split(";");
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i];
    if (c.indexOf(name) == 0) {
      cvalue = c.substring(name.length);
      return cvalue;
    }
    return "";
  }
}

// delete cookie
function deleteCookie(cname) {
  document.cookie =
    cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;" + "path=/";
}

