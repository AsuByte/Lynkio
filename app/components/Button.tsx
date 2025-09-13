"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  width?: boolean;
  disable?: boolean;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  width = false,
  disable = false,
  classNames = "",
}) => {
  const styles =
    "px-4 py-[9px] rounded-lg font-medium transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[var(--color-highlight)]",
    secondary:
      "bg-[var(--color-secondary)] text-[var(--color-text-primary)] hover:bg-opacity-80",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const classes = [
    styles,
    variants[variant],
    width ? "w-full" : "",
    disable ? "opacity-50 cursor-not-allowed" : "",
    classNames,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
