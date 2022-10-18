import { Button } from "@chakra-ui/react";

export const ToastLinkButton = (hash: string) => (
  <Button
    as="a"
    variant="unstyled"
    textDecoration="underline"
    href={`https://nile.tronscan.org/#/transaction/${hash}`}
    target="_blank"
  >
    View on TRON Scan
  </Button>
);
