import { Button, HStack } from "@chakra-ui/react";

export default function AppButton(props: {
  children: React.ReactNode;
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      size={props.size ?? "md"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}
