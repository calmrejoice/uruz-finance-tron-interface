import { Button, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { InfoTooltip } from "@components/Shared/InfoTooltip";
import { AiOutlinePlus } from "react-icons/ai";

export const ProposalsCard = () => {
  return (
    <Card flex={2} alignItems="flex-start">
      <Heading fontSize="lg">Proposals</Heading>
      <Spacer />

      <HStack>
        <Button variant="outline" size="sm" leftIcon={<AiOutlinePlus />}>
          Create Proposal
        </Button>
        <InfoTooltip label="You need to have 300k voting power to create a proposal" />
      </HStack>
    </Card>
  );
};
