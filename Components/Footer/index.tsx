import { Flex, HStack, Text } from "@chakra-ui/react";

import { SocialIcon } from "./SocialIcon";
import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";

export const Footer = () => {
  return (
    <Flex my="12" flexDir="row" justifyContent="center">
      <HStack>
        <SocialIcon icon={SiGitbook} aria="documents" />
        <SocialIcon icon={FaGithub} aria="github" />
        <SocialIcon icon={FaDiscord} aria="discord" />
        <SocialIcon icon={FaTelegram} aria="telegram" />
      </HStack>
    </Flex>
  );
};
