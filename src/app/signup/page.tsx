"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
// interface UserType {
//   username: string;

//   email: string;
//   password: string;
// }
const SignupPage = () => {
  const navigator = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      // setButtonDisabled(true);
      const res = await axios.post("/api/users/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log({ res });
      setLoading(false);
      // setButtonDisabled(false);
      toast.success("Signup Success");
      setUser({
        username: "",
        email: "",
        password: "",
      });
      navigator.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log({ error });
    }
  };
  const changeHandler = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user.email === "" || user.password === "" || user.password === "") {
      setButtonDisabled(true);
    } else setButtonDisabled(false);
  }, [user]);
  return (
    <div>
      <h1>{loading ? "Processing " : "Signup"}</h1>
      <hr />

      <form
        className="flex flex-col items-center justify-center min-h-screen py-2"
        onSubmit={onSignup}
        method="post"
      >
        <input
          onChange={changeHandler}
          value={user.username}
          type="text"
          placeholder="Username"
          name="username"
        />
        <br />
        <input
          onChange={changeHandler}
          value={user.email}
          type="text"
          placeholder="Email"
          name="email"
        />
        <br />
        <input
          onChange={changeHandler}
          value={user.password}
          type="password"
          placeholder="Password"
          name="password"
        />
        <br />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          disabled={buttonDisabled}
          type="submit"
        >
          Signup
        </button>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
