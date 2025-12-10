import { Button, HStack } from "@chakra-ui/react";

export default function AppButton(props: {
  children: React.ReactNode;
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <Button size={props.size ?? "md"} type={props.type} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
