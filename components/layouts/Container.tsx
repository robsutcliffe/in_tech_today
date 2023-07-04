import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="lg:px-8">
      <div className="lg:max-w-4xl">
        <div className="mx-auto px-14 sm:px-10 md:max-w-2xl md:px-4 lg:px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
