import Navbar from "@/components/Navbar";
import { getUser } from "@/utils/auth";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const info = await getUser();
  // TODO: Fix ts error

  return <Navbar user={info}>{children}</Navbar>;
};

export default Layout;
