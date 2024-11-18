import { getUser } from "@/utils/auth";
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = async ({ children }: PropsWithChildren) => {
  const info = await getUser();

  return <Navbar user={info}>{children}</Navbar>;
};

export default Layout;
