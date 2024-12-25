import type { Address } from "viem";
import { disasterReliefFundAbi } from "./generated"; // Update this import based on your ABI file

const deployedAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as Address;

// Type inference correctly
const ABI = disasterReliefFundAbi; // Change this to the ABI for your Disaster Relief Fund contract
export { ABI, deployedAddress };
