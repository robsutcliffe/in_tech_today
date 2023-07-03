import { LeftSide } from "@components";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <LeftSide />
      <main className="border-t border-slate-200 lg:relative lg:ml-112 lg:border-t-0 xl:ml-120">
        <div className="relative">{children}</div>
      </main>
    </>
  );
}
