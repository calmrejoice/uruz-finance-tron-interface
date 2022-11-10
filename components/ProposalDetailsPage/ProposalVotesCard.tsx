import { Button, Flex, HStack, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { config } from "@constants/config";
import { useAuth } from "@context/AuthContext";
import { useBalance } from "@hooks/useBalance";
import { useVotesCastedOnProposal } from "@hooks/useGovernance";
import { formatDisplayBalance, numberWithCommas } from "@utils/formatBalance";

export const ProposalVotesCard = ({ proposalId }: any) => {
  const { tron, address } = useAuth();
  const { balanceNum: wurzBalanceNum } =
    useBalance(tron, address, config.wurzAddress, false) || 0;

  const { votesCasted } = useVotesCastedOnProposal(tron, address, proposalId);

  return (
    <Card flexDir="column">
      <HStack mb="3">
        <Text variant="helper">My total votes on UFP-{proposalId}</Text>
        <Spacer />
        <Text fontWeight="bold">{votesCasted}</Text>
      </HStack>

      <HStack mb="6">
        <Text variant="helper">My total votes remaining</Text>
        <Spacer />
        <Text fontWeight="bold">
          {numberWithCommas(wurzBalanceNum?.toFixed(0))}
        </Text>
      </HStack>

      <Tooltip label="Votes can be redeemed after voting period has ended or in the event where the proposal is cancelled.">
        <Button
          w="100%"
          variant="outline"
          fontSize="sm"
          //   onClick={handleExchange}
          isDisabled={true}
        >
          Redeem votes back to URZ
        </Button>
      </Tooltip>
    </Card>
  );
};
