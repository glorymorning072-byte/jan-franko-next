import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "outline";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
}

export const Button = ({
  children,
  onClick,
  href,
  variant = "accent",
  className = "",
  disabled = false,
  type = "button",
  target
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-2.5 font-serif font-bold text-xs tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none";

  const variantClasses = {
    accent: "bg-accent text-primary hover:bg-accent/90 shadow-md",
    primary: "bg-primary text-secondary hover:bg-primary/95 shadow-md",
    secondary: "bg-secondary text-primary hover:bg-secondary/95 border border-primary/10",
    outline: "border border-[#c5a880]/30 hover:border-accent text-[#7d603a] hover:text-[#0e3b2e]"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    // If external link or anchor hash link
    if (href.startsWith("http") || href.startsWith("#") || target === "_blank") {
      return (
        <a
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }

    // Default internal routing link
    return (
      <Link href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
      {children}
    </button>
  );
};
