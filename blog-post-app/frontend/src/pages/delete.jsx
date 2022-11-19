import { useState } from "react";
import { Link } from "react-router-dom";

export function Delete() {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({ title });
    const headers = { "content-type": "application/json" };

    // The correct password is in the env file. It is "password"
    fetch("http://localhost:3000/blog/delete-post", {
        method: "DELETE",
      body: requestData,
      headers: headers,
    })
    console.log(requestData);
  }
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <br></br>
        Enter the title of a blog to delete:
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button>Delete</button>
      </form>
    </div>
  );
}
