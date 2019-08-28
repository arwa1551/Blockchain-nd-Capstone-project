const web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const config = require('./deployment-config');
const proofs = require('./eth-contracts/test/proofs');
const abi = require('./eth-contracts/build/contracts/SolnSquareVerifier').abi;

const MNEMONIC = config.mnemonic;
const OWNER_ADDRESS = config.ownerAddress
const INFURA_KEY = config.projectId;
const NFT_CONTRACT_ADDRESS = config.solnSquaqreVerifierAddress;
const NETWORK = 'rinkeby';
const NUM_TOKENS = 10;

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, and network.")
    return
}

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )
    
    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(abi, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" , from: OWNER_ADDRESS})

        for (var i = 0; i < NUM_TOKENS; i++) {
            let proof = proofs[i].proof;
            let input = proofs[i].input;

            try{
                console.log('Minting token ...');

                const result = await nftContract.methods.mintNFT(
                        OWNER_ADDRESS,
                        i + 1,
                        proof.A,
                        proof.A_p,
                        proof.B,
                        proof.B_p,
                        proof.C,
                        proof.C_p,
                        proof.H,
                        proof.K,
                        input
                    ).send({ from: OWNER_ADDRESS, gas: 5510328 });

                    console.log("Minted Tokens. Transaction: " + result.transactionHash)

            }catch(e){
                console.log('Error minting token: ' + e)
            }
        }
    }
}

main()

