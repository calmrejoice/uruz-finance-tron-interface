import { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { format } from "date-fns";

import { IProposal, mockProposals } from "@constants/mockProposals";
import { Card } from "@components/Shared/Card";
import { formatDate } from "@utils/formatDate";
import { ProposalHistoryCard } from "@components/ProposalDetailsPage/ProposalHistoryCard";
import { ProposalVotesCard } from "@components/ProposalDetailsPage/ProposalVotesCard";

const ProposalDetailsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { proposalId } = query;
  const [proposal, setProposal] = useState<IProposal>();

  useEffect(() => {
    if (proposalId) {
      const data = mockProposals.filter(
        (mockProposal) => mockProposal.id.toString() === proposalId
      )[0];
      setProposal(data);
    }
  }, [proposalId]);

  return (
    <Flex mx="32" flexDir="column">
      <Flex flexDir="row">
        <ProposalVotesCard proposal={proposal} />
        <ProposalHistoryCard proposal={proposal} />
      </Flex>

      <Card flexDir="column">
        <Heading fontSize="lg" mb="6">
          Description
        </Heading>
        <Text>{proposal?.description?.description}</Text>
      </Card>
    </Flex>
  );
};

export default ProposalDetailsPage;
