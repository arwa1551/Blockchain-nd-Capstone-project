
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

const proofs = require('./proofs.js');
const index = 1;
let proof = proofs[0].proof;


contract( 'SolnSquareVerifier', accounts => {
    describe('Test SolnSquareVerifier', () => {
        beforeEach(async() => {
            const verifierContract = await Verifier.new({
                from: accounts[0]
            });
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {
                from: accounts[0]
            });
        });
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Should be able to add a new solution for contract', async() =>{
            
            const result = await this.contract.mintNFT.call(
                accounts[1],
                index,
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

            assert.equal(result, true, "Solution cannot be added");

        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it(`ERC721 should be minted for contract`, async() => {
            const result = await this.contract.mint.call(accounts[1], index, {from: accounts[0]});

            assert.equal(result, true, "ERC721 token cannot be minted");
        });

    });
});
