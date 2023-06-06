import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  styles?: string;
}

function Wrapper({ children, styles }: Props) {
  return (
    <div className={`w-full ${styles}`}>
      <div className="w-full max-w-[1280px] m-auto md:px-8 px-4">{children}</div>
    </div>
  );
}

export default Wrapper;
