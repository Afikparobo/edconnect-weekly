import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "./App";

const CreateProject = () => {
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [tags, setTags] = useState("");
  let location = useHistory();
  const fetchCookie = getCookie("uid");
  
  
  const handleSubmit = async (eve) => {
    eve.preventDefault();
    await addProject();
  };

  const addProject = async () => {
    const data = {
      name: name,
      abstract: abstract,
      authors: authors,
      tags: tags,
    };
    const url = "/api/projects";
    const resp = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const reply = await resp.json();
    if (resp.status === 200) {
      location.push("/");
    } else {
      setAlert(reply.errors);
      setShow(true);
    }
  };

  function AlertDanger() {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          {show &&
            alert.map((err, i) => {
              return <p key={i}>{err}</p>;
            })}
        </Alert>
      );
    }
  }

  if (fetchCookie !== "") {
    return (
        <Layout>
          <div className="mx-auto w-50 mt-5">
            <h2>Submit Project</h2>
            {show && <AlertDanger />}
            <Form
              onSubmit={handleSubmit}
              name="submitProject"
              id="createProjectForm"
            >
              <Form.Row>
                <Form.Label htmlFor="name"> Project Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  name="name"
                  onChange={(eve) => {
                    setName(eve.target.value);
                  }}
                />
              </Form.Row>
  
              <Form.Row>
                <Form.Label htmlFor="abstract"> Project Abstract</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={abstract}
                  name="abstract"
                  onChange={(eve) => {
                    setAbstract(eve.target.value);
                  }}
                />
              </Form.Row>
  
              <Form.Row>
                <Form.Label htmlFor="authors"> Author(s)</Form.Label>
                <Form.Control
                  value={authors}
                  name="authors"
                  onChange={(eve) => {
                    let authorsTxt = eve.target.value.split(",");
                    let authorArr = authorsTxt.map((author) => author.trim());
                    setAuthors(authorArr);
                  }}
                />
              </Form.Row>
  
              <Form.Row>
                <Form.Label htmlFor="tags"> Tag(s)</Form.Label>
                <Form.Control
                  value={tags}
                  name="tags"
                  onChange={(eve) => {
                    let tagsTxt = eve.target.value.split(",");
                    let tagsArr = tagsTxt.map((tag) => tag.trim());
                    setTags(tagsArr);
                  }}
                />
              </Form.Row>
  
              <Button className="mt-3 mb-3" variant="primary" type="submit">
                Continue
              </Button>
            </Form>
          </div>
        </Layout>
      );
    } else {
      location.push("/login");
      return null;
    }
  };
  
  export default CreateProject;