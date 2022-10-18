import { useToast } from "@chakra-ui/react";

let libraryContractAddress = "TAFLoLQVezWCEYAfyrkx2WBy4vx1JdmZE6"; // Paste Contract address here

export const addBook = async (
  name: string,
  description: string,
  price: number,
  tronWeb: any
) => {
  try {
    const bookRentContract = await tronWeb
      .contract()
      .at(libraryContractAddress);

    const result = await bookRentContract
      .addBook(name, description, price)
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
      });

    return result;
  } catch (error) {
    return error;
  }
};
