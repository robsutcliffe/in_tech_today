import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ExtendedButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(
  {
    text,
    Icon,
    disabled,
    onClick,
  }: {
    text: string;
    Icon: any;
    disabled: boolean;
    onClick: () => void;
  },
  ...props: React.ButtonHTMLAttributes<HTMLButtonElement>[]
) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        inline-flex
        items-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        text-white
        shadow-sm
        hover:bg-grey-900
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-indigo-600`,
        disabled ? "bg-gray-400" : "bg-gray-800"
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
      {text}
    </button>
  );
}
