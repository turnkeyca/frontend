import { HTMLAttributes } from "react";

export interface IIcon extends HTMLAttributes<HTMLElement> {
  name: "chevron_right" | "error_outline" | "arrow_back" | "edit" | "logout";
  handleClick?: () => any;
  small?: boolean;
  className?: string;
}
export const Icon = ({
  name,
  handleClick,
  small,
  className,
  ...rest
}: IIcon) => {
  let iconClasses = "material-icons";
  let containerClasses = className ? className : "";
  if (small) {
    iconClasses += " md-18";
    containerClasses += " h-4";
  } else {
    iconClasses += " md-24";
    containerClasses += " h-6";
  }
  if (handleClick) {
    containerClasses += " cursor-pointer";
  }

  return (
    <div className={containerClasses} onClick={handleClick}>
      <span className={iconClasses}>{name}</span>
    </div>
  );
};