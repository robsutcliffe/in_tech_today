import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ExtendedButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  text: string;
  Icon?: React.ComponentType<any>;
  disabled?: boolean;
  onClick?: () => void;
} & ExtendedButtonProps;
export default function Button({
  text,
  Icon,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        group
        relative
        isolate
        inline-flex
        items-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        text-black
        shadow-lg
        hover:bg-blue-900
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-sky-400`,
        disabled ? "bg-gray-500" : "bg-blue-600"
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4 text-black" aria-hidden="true" />}
      {text}
      <span className="absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-30"></span>
      <span className="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-30"></span>
    </button>
  );
}
