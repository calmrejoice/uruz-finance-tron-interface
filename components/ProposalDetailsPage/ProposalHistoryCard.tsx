import { Flex, HStack, Icon, Spacer, Text, VStack } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { Card } from "@components/Shared/Card";
import { IProposalDetails } from "@constants/IProposalDetails";
import { formatDate } from "@utils/formatDate";
import { ProposalState } from "./ProposalState";

type ProposalHistoryCardProps = {
  proposal: IProposalDetails | undefined;
  isLoading: boolean;
};

export const ProposalHistoryCard = ({
  proposal,
  isLoading,
}: ProposalHistoryCardProps) => {
  return (
    <Card flexDir="column" flex={1}>
      <Text variant="helper">Proposal History</Text>

      <VStack alignItems="flex-start" mt="6">
        <ProposalState title={"Created"} date={proposal?.createdDate} />
        <ProposalState title={"Active"} date={proposal?.startDate} />
        <ProposalState title={"Succeed"} date={proposal?.endDate} />
        <ProposalState title={"Queue"} date={proposal?.queuedDate} />
        <ProposalState title={"Execute"} date={proposal?.executedDate} />
      </VStack>
    </Card>
  );
};
