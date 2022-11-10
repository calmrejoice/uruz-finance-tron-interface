import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { IProposalDetails } from "@constants/IProposalDetails";
import { useAuth } from "@context/AuthContext";
import { useStakeDetails } from "@hooks/swrHooks";
import { onCastVote } from "@hooks/useGovernance";
import { useState } from "react";
import { ProposalVoteModal } from "./ProposalVoteModal";

type ProposalCardProps = {
  proposal: IProposalDetails | undefined;
  isLoadingProposal: boolean;
};

export const ProposalCard = ({
  proposal,
  isLoadingProposal,
}: ProposalCardProps) => {
  const { tron, address } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voteFor, setVoteFor] = useState(false);

  return (
    <Card flex={2}>
      <ProposalVoteModal
        isOpen={isOpen}
        onClose={onClose}
        voteFor={voteFor}
        proposalId={proposal?.id}
      />
      <Flex flexDir="column" alignItems="flex-start" width="100%">
        <Badge># {proposal?.id}</Badge>
        <Heading fontSize="lg" my="6">
          {proposal?.description?.title}
        </Heading>

        <HStack spacing="9" width="100%">
          <Flex flexDir="column" width="100%">
            <HStack>
              <Text variant="helper">For</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="sm">
                {proposal?.forVotes}
              </Text>
            </HStack>

            <Progress
              colorScheme="yellow"
              borderRadius="full"
              size="xs"
              value={20}
              my="3"
              bgColor="gray.400"
            />

            <Button
              onClick={() => {
                setVoteFor(true);
                onOpen();
              }}
            >
              For
            </Button>
          </Flex>
          <Flex flexDir="column" width="100%">
            <HStack>
              <Text variant="helper">Against</Text>
              <Spacer />
              <Text fontWeight="semibold" fontSize="sm">
                {proposal?.againstVotes}
              </Text>
            </HStack>

            <Progress
              colorScheme="yellow"
              borderRadius="full"
              size="xs"
              value={20}
              my="3"
              bgColor="gray.400"
            />

            <Button
              onClick={() => {
                setVoteFor(false);
                onOpen();
              }}
            >
              Against
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Card>
  );
};
