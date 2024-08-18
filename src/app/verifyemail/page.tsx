"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  // const router = useRouter();

  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerify(true);
    } catch (error) {
      setError(true);
      console.log({ error });
    }
  };

  useEffect(() => {
    const urltoken = window.location.search.split("=")[0];
    setToken(urltoken || "");

    // const { query } = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col item-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "no token"}
      </h2>
      {verify && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
