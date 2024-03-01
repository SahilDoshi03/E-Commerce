"use client";

import { useRouter } from "next/navigation";

const Protected = ({ children }: React.PropsWithChildren) => {
  const token = localStorage.getItem("token");

  if (!token) {
    useRouter().push("/login");
  }
  return children;
};

export default Protected;
