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
        font-bold
        font-mono
        text-white
        border-2
        border-white/50
        hover:border-white
        shadow-lg
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-yellow-400`
      )}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
      {text}
    </button>
  );
}
