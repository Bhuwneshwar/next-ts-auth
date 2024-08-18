"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.post("/api/users/me");
      console.log({ data });
      setData(data);
    } catch (error) {
      console.log({ error });
    }
  };
  const logOut = async () => {
    try {
      const { data } = await axios.get("/api/users/logout");
      console.log({ data });
      router.push("/login");
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      <h1>ProfilePage</h1>
      {data && (
        <div>
          <p> user name {data.user.username}</p>
          <p>email {data.user.email}</p>
          <Link href={"/profile/" + data.user._id}>Go to profile</Link>
        </div>
      )}

      <button
        className="bg-green-500 mt-4 hover:bg-blue-400 text-blue-50 font-bold py-2 px-4 rounded"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
