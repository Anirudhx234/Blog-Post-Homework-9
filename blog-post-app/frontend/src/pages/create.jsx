import { useState } from "react";
import { Link } from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({ title, content, password });
    const headers = { "content-type": "application/json" };

      // The correct password is in the env file. It is "password"
      fetch("http://localhost:3000/blog/create-post", {
        method: "POST",
        body: requestData,
        headers: headers,
      }).then((response) => {
        if (response.ok) {
          setDone(true);
        } else {
          alert("Incorrect Password");
          setDone(false);
        }
      });
    console.log(requestData);
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <br></br>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button>Post</button>
    </form>
  );
}
