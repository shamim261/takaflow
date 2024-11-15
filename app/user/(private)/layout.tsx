import Navbar from "@/components/Navbar";
import { getUser } from "@/utils/auth";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const info = await getUser();

  return <Navbar user={info}>{children}</Navbar>;
};

export default Layout;
