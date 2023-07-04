import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type EventAtEndProps = {
  children: React.ReactNode;
  onEnd: () => void;
};

export default function EventAtEnd({ children, onEnd }: EventAtEndProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bottomRef);

  useEffect(() => {
    if (inView) {
      onEnd();
    }
  }, [inView, onEnd]);

  return (
    <>
      {children}
      <div ref={bottomRef} />
    </>
  );
}
