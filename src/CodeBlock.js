import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';


export default function CodeBlockComponent() {
  

  return (
    
      <CodeBlock
        text={`
        // Use this function to generate true randomness in your code
        function generateTrueRandom(string _userInput) internal view returns (uint256) {
            // Step 1: Generate a seed using block timestamp, block difficulty, and sender's address
            uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, _userInput)));
        
            // Step 2: Initialize variables for accumulating randomness
            uint256 accumulatedRandomness = 0;
            uint256 multiplier = N;
        
            // Step 3: Perform multiple iterations to accumulate randomness
            for (uint256 i = 0; i < 256 / log2N; i++) {
                // Add the seed multiplied by the current multiplier to accumulated randomness
                accumulatedRandomness += seed * multiplier;
        
                // Update the seed with an increment and calculate the next multiplier
                seed += i;
                multiplier *= N;
            }
        
            // Step 4: Convert the accumulated randomness to a hash
            return hash(accumulatedRandomness);
        }
        `}
        language="solidity"
        theme={dracula}
      />
   
  );
}

