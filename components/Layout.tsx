import { LeftSide } from "@components";
export default function Layout({ children }) {
  return (
    <>
      <LeftSide />
      <main className="border-t border-slate-200 lg:relative lg:ml-112 lg:border-t-0 xl:ml-120">
        <div className="relative">{children}</div>
      </main>
    </>
  );
}
