import type { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}