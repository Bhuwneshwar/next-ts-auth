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
const LoginPage = () => {
  const navigator = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      // setButtonDisabled(true);
      const res = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      console.log({ res });
      setLoading(false);
      // setButtonDisabled(false);
      toast.success("Login Success");
      setUser({
        email: "",
        password: "",
      });
      navigator.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log({ error });
    }
  };
  const changeHandler = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user.email === "" || user.password === "") {
      setButtonDisabled(true);
    } else setButtonDisabled(false);
  }, [user]);
  return (
    <div>
      <h1>{loading ? "Processing " : "Login"}</h1>
      <hr />

      <form
        className="flex flex-col items-center justify-center min-h-screen py-2"
        onSubmit={onSubmit}
        method="post"
      >
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
          Login
        </button>
        <p>
          If you have no account? <Link href="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
