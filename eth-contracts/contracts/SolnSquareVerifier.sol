pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ArwaERC721Token{
    Verifier private verifierContract;

    constructor (address verifierAddress) public{
       verifierContract = Verifier(verifierAddress);
    }

// TODO define a solutions struct that can hold an index & an address
struct Solution{
    uint256 index;
    address _address;
}

// TODO define an array of the above struct
Solution[] private _solutions;


// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) private _uniqueSolutions;


// TODO Create an event to emit when a solution is added
event addedSolution(uint256 index, address _address);



// TODO Create a function to add the solutions to the array and emit the event
function addSolution (uint256 index, address _address, bytes32 key)internal{
    _solutions.push(Solution({index: index, _address: _address}));
    _uniqueSolutions[key] = Solution(index, _address);
    emit addedSolution(index, _address);
}



// TODO Create a function to mint new NFT only after the solution has been verified
function mintNFT(
    address to,
    uint256 index,
    uint[2] memory a,
    uint[2] memory a_p,
    uint[2][2] memory b,
    uint[2] memory b_p,
    uint[2] memory c,
    uint[2] memory c_p,
    uint[2] memory h,
    uint[2] memory k,
    uint[2] memory input
    )public returns (bool){
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(_uniqueSolutions[key]._address == address(0), "Solution already exist");
        require(verifierContract.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Invalid solution");
        addSolution(index, to, key);
        return super.mint(to, index);
    }

//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

}
  


























