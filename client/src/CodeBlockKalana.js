import React, { useRef } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import Button from "@material-ui/core/Button";

export default function CodeBlockKalanaComponent() {
    const codeRef = useRef(null);

  const handleCopyClick = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText);
      // You can also provide some user feedback here (e.g., a success message).
    }
  };
  

  return (
    <div>
      <Button onClick={handleCopyClick} variant="contained" color="secondary">
        Copy
      </Button>
      <div className="code-block-container" ref={codeRef}>
    
      <CodeBlock
        text={`
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.12;
        contract choices {
            address payable public customer;
            uint Onewei = 1 wei;
            uint P_dep;
            uint P_F;
            uint P_R;
            uint penalty;
            uint256 random_number = 0;
            uint rn_bits = 0;
            uint P; 
            uint X; 
            uint log2N;
            bool lastIsCreate = false;
            uint concatenatedValue = 0;
            
        
            
            constructor() {
                customer = payable(msg.sender);
            }
            
        
        
            mapping (address => bool) participants; 
            address payable[] participants_address = new address payable[](16) ; 
            uint participant_number = 0; 
            mapping (address => uint256) value_selection; 
            mapping (address => uint256) hash_value;
            mapping (address => bool) isPaidDeposit;
            uint T_S = 0; 
            uint T_V; 
            bool isStartGame = false;
        
            
            function min(uint a, uint b) private pure returns (uint){
                if(a < b) return a;
                return b;
            }
            
            function max(uint a, uint b) private pure returns (uint){
                if(a < b) return b;
                return a;
            }
            
            
            function A_Customer_Call(uint bt, uint p, uint log, uint dep, uint fee, uint pen, uint reward, uint time) payable public{
                require(msg.sender == customer, "You are not Customer");
                require(log & (log-1) == 0, "Invalid log");
                require(bt >= 2 && p >= 2,"Small bt given or participant");
                require(p & (p-1) == 0,"Invalid p");
                require(2**log == bt,"invalid log or bt");
                require(!isStartGame,"isStartGame is true");
                require(msg.value >= fee*p,"msg.value is not enough");
                require(dep >= fee*(p-1)+reward*max(p-1,bt-1)+pen,"dep is not enough");
                require(fee <= reward*min(p-1,bt-1),"fee is too big");
                require(reward*max(p-1,bt-1) <= fee+dep,"fee and dep is not enough");
                X = bt; //number of bits for a participant
                P = p; //Number of participants
                log2N = log;
                P_dep = dep*Onewei;
                P_F = fee*Onewei;  //Reward for partcipant
                P_R = reward*Onewei; //Reward for gained score
                penalty = pen*Onewei;
                T_V = time;
        
                isStartGame = true;
            }
            
            function B_Participant_Recruitment() payable public {
                require(isStartGame,"isStartGame is false");
                require(msg.sender != customer,"You are not Customer");
                require(participant_number < P,"participant number is more than Participant number defined");
                require(!participants[msg.sender],"You are participants");
        
                require(msg.value >= P_dep,"You did not pay deposit enough value");
                
                address payable participant = payable(msg.sender); 
                participants[participant] = true;
                participants_address[participant_number] = participant;
                participant_number++;
            }
        
        
            function C_Initialize_Game() public {
                require(T_S == 0,"T_S is not 0");
                require(msg.sender == customer || participants[msg.sender],"You are not a participants or Customer");
                require(participant_number == P,"participants_number is not P");
                for(uint i=0;i<P;i++){
                    value_selection[participants_address[i]] = X;
                }
                T_S = block.timestamp;
            }
        
            function D_Hash_Submission(uint256 hashValue) public {
                require(participants[msg.sender],"You are not participants");
                //require(T_S <= block.timestamp && block.timestamp < T_S+T_V,"Now is not time for input hash value");
                hash_value[msg.sender] = hashValue;
            }
        
            function E_Input_Submission(uint256 value) public {
                require(participants[msg.sender],"You are not participants");
                //require(T_S+T_V <= block.timestamp && block.timestamp <= T_S+T_V*2,"Now is not time for input value");
                uint256 hashValue = hash(value);
                require(hashValue == hash_value[msg.sender],"The hash value of your input does not match one in advance");
                value_selection[msg.sender] = value%X;
            }
        
            
            function F_End_Game() public {
                require(participants[msg.sender] || msg.sender == customer,"You are not a participant or Customer");
                require(T_S != 0,"T_S is 0");
                //require(T_S+T_V*2 <= block.timestamp,"You can not finish Game now");
                uint cv = value_selection[participants_address[0]];
                bool isCreateRandomNumber = true;
                if(cv == X) {
                    isCreateRandomNumber = false;
                    for(uint i=1;i<P;i++){
                        if(value_selection[participants_address[i]] < X){
                            participants_address[i].transfer(P_dep+P_F+P_R);
                        }
                    }
                } else {
                    int reward = 0;
                    for(uint i=1;i<P;i++){
                        if(value_selection[participants_address[i]] == X){
                            isCreateRandomNumber = false;
                            reward += int(X-1);
                        } else if(cv == value_selection[participants_address[i]]){
                            reward += int(X-1);
                            participants_address[i].transfer(uint256(P_dep+P_F-P_R*(X-1)));
                        } else {
                            reward--;
                            participants_address[i].transfer(uint256(P_dep+P_F+P_R));
                        }
                    }
                    participants_address[0].transfer(uint256(int(P_dep)+int(P_F)+int(P_R)*reward));
                }
        
                if(isCreateRandomNumber){
                    for(uint i=0;i<P;i++){
                        concatenatedValue = concatenatedValue * 10 + value_selection[participants_address[i]]; //added line
                        rn_bits += log2N;
                    }
                    random_number = concatenatedValue; //added line
                    lastIsCreate = true;
                } else {
                    lastIsCreate = false;
                    customer.transfer(penalty);
                }
                resetParameter();
                require(T_S == 0 && participant_number == 0 && !isStartGame,"reset parameters failed 1");
                for(uint i=0;i<P;i++){
                    require(!participants[participants_address[i]],"could not be false participants");
                    require(value_selection[participants_address[i]] == X,"could not be X value_selection");
                }
            }
            
            function hash(uint256 inp) private pure returns (uint256){
                bytes memory tmp = toBytes(inp);
                bytes32 tmp2 = sha256(tmp);
                return uint256(tmp2);
            }
        
            function toBytes(uint256 x) private pure returns (bytes memory b) {
                b = new bytes(32);
                assembly { mstore(add(b, 32), x) }
            }
        
        
            function G_Random_Number_Creation() public returns (uint256){
                require(rn_bits == 256,"rn_bits is not 256");
                require(msg.sender == customer,"You are not Customer");
                rn_bits = 0;
                uint256 ret = hash(random_number);
                random_number = 0;
                return ret;
            }
            
            function resetParameter() private {
                participant_number = 0;
                isStartGame = false;
                T_S = 0;
                for(uint i=0;i<P;i++){
                    participants[participants_address[i]] = false;
                    value_selection[participants_address[i]] = X;
                }
            }
        }
        `}
        language="solidity"
        theme={dracula}
      />
    </div>
    </div>
  );
}
