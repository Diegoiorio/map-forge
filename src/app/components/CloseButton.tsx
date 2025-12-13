import { CloseButton as ChakraCloseButton, HStack } from "@chakra-ui/react";

type CloseButtonProps = {
  variant?: React.ComponentProps<typeof ChakraCloseButton>["variant"];
  onClick: () => void;
};

export default function CloseButton({
  variant = "solid",
  onClick,
}: CloseButtonProps) {
  return (
    <HStack>
      <ChakraCloseButton size={"2xs"} variant={variant} onClick={onClick} />
    </HStack>
  );
}
