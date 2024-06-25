import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </>
  );
}
