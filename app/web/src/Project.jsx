import React from "react";
import Layout from "./shared/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([]);
  const [projectAuthors, setProjectAuthors] = useState([]);
  const [projectTags, setProjectTags] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const path = useParams();

  useEffect(() => {
    const getProject = async () => {
      const projectFromServer = await fetchProject();
      setProject(projectFromServer);
      setProjectAuthors(projectFromServer.authors);
      setProjectTags(projectFromServer.tags);
      // setCreatedBy(projectFromServer.createdBy);
    };
    // get user
    const getUser = async () => {
      const userFromServer = await fetchUser();
      setFirstname(userFromServer.firstname);
      setLastname(userFromServer.lastname);
    };
    getProject();
    getUser();
  }, []);

  // console.log(path.search.substring(4));
  const fetchProject = async () => {
    let projectId = path.id;

    const resp = await fetch(`/api/projects/${projectId}`);
    const data = await resp.json();
    if (resp.ok) {
      return data;
    }
  };

  const fetchUser = async () => {
    const data = await fetchProject();
    const resp = await fetch("/api/users/" + data.createdBy);
    if (resp.ok) {
      const user = await resp.json();
      return user;
    } else {
      console.log(resp);
    }
  };
  return (
    <Layout>
      <main className="project_info">
        <div className="container mt-5 ">
          {/* <!-- single project details start --> */}

          <h1 id="project_name">{project.name}</h1>
          <section>
            <div className="row bg-light p-2">
              <div className="col" id="project_author">
                {
                  <p>
                    {" "}
                    Created By <br /> {firstname} {lastname}{" "}
                  </p>
                }
              </div>
              <div className="col">
                Date Created <br /> 00/00/0000
              </div>
              <div className="col">
                Last Updated <br /> 01/00/0000
              </div>
              <div className="col d-flex justify-content-end">
                <a
                  href="editproject.html"
                  className="btn btn-primary "
                  role="button"
                >
                  Edit Project
                </a>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- single project details end --> */}

        <div className="container mb-5">
          <div className="row">
            <div className="col">
              {/* <!--project abstract begins  --> */}
              <section>
                <h5 className="pt-5 pb-2 border-bottom">Project Abstract</h5>
                <div id="project_abstract">{project.abstract}</div>
              </section>
              <form action="" className="mt-5 border-bottom">
                <h5>Comments</h5>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="comments"
                    placeholder="leave a comment"
                    cols="10"
                    rows="3"
                  ></textarea>
                </div>
                <input type="submit" className="btn btn-primary mb-2" />
              </form>
              <p className="card-text text-center">no comments added yet</p>
              {/* <!--project abstract end  --> */}
            </div>
            <div className="col">
              {/* <!-- Project Details starts  --> */}
              <section>
                <h5 className="pt-5 pb-2 border-bottom">Project Details</h5>
                <h5 className="card-header">Author(s)</h5>
                <div className="card">
                  <div className="card-body" id="project_authors">
                    {projectAuthors.join(", ")}
                  </div>
                  {projectTags.length > 1 ? (
                    <div className="card-footer" id="project_tags">
                      {projectTags.join(", ")}
                    </div>
                  ) : (
                    <div className="card-footer" id="project_tags">
                      {projectTags.join(", ")}
                    </div>
                  )}
                </div>

                <div className="card mt-3">
                  <h5 className="card-header">Project Files</h5>
                  <div className="card-body">
                    <p className="card-text text-center">no files selected</p>
                  </div>
                </div>
              </section>
              {/* <!-- Project Details ends  -->    */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Project;