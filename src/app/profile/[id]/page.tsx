import React from "react";

const page = ({ params }: any) => {
  return (
    <div>
      dynamic LoginPage
      {params.id}
    </div>
  );
};

export default page;
