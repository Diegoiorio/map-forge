import { Button } from "@chakra-ui/react";

export default function AppButton(props: {
  children: React.ReactNode;
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      size={props.size ?? "md"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`!pl-8 !pr-8 ${props.className}`}
    >
      {props.children}
    </Button>
  );
}
