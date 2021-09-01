import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import http from "../services/httpService";
import config from "../config.json";

class HttpApp extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(`${config.apiEndpoint}/${post.id}`, post);
    const posts = this.state.posts;
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`s${config.apiEndpoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="my-2">
        <ToastContainer />
        <button onClick={this.handleAdd} className="btn btn-primary">
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>{"Title"}</th>
              <th>{"Update"}</th>
              <th>{"Delete"}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    onClick={() => this.handleUpdate(post)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HttpApp;

// hello(input) {
//   console.log(input);
// }
// componentDidMount() {
//   const result = axios.get("https://jsonplaceholder.typicode.com/posts");
//   console.log("promis is", result);
//   result
//     .then((r) => {
//       this.hello("kull");
//       return r.data;
//     })
//     .then((r) => r)
//     .then((r) => {
//       console.log("this is my name");
//       const posts = [...r];
//       this.setState({ posts });
//     });
// }
