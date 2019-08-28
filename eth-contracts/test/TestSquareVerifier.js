// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const SquareVerifier = artifacts.require('Verifier');
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
const proofs = require('./proofs.js');
let proof = proofs[0].proof; 
    
// Test verification with incorrect proof

contract('SquareVerifier', accounts => {
    beforeEach(async () => {
        this.contract = await SquareVerifier.new({from: accounts[0]});
    });

    it('should be verified with correct proof', async() =>{
        let result = await this.contract.verifyTx.call(
            proof.A,
            proof.A_p,
            proof.B,
            proof.B_p,
            proof.C,
            proof.C_p,
            proof.H,
            proof.K,
            proofs[0].input,
            {from: accounts[0]});

            assert.equal(result, true, "proof should be verified to true");
    });

    it('should not verify when using incorrect proof', async() =>{
        let invalidInput = [10,50];
        let result = await this.contract.verifyTx.call(
                proof.A,
                proof.A_p,
                proof.B,
                proof.B_p,
                proof.C,
                proof.C_p,
                proof.H,
                proof.K,
                invalidInput,
           {from: accounts[0]});

           assert.equal(result, false, "proof should be verified to false");

    });
});