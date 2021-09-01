import React, { Component } from "react";
import axios from "axios";

const endPoint = "https://jsonplaceholder.typicode.com/posts";

axios.interceptors.response.use(null, (error) => {
  console.log("interceptor");
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log("Logging the error:", error);
    alert("Unexpected Error happen");
  }
  return Promise.reject(error);
});

class HttpApp extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(endPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(endPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await axios.put(`${endPoint}/${post.id}`, post);
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
      await axios.delete(`s${endPoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="my-2">
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
