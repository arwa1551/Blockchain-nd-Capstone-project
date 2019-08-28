var ERC721MintableComplete = artifacts.require('ArwaERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
            await this.contract.mint(account_two, 3);
            await this.contract.mint(account_two, 4);
            await this.contract.mint(account_two, 5);
        })

        it('should return total supply', async function () { 
            let total = await this.contract.totalSupply();
            assert.equal(total, 5, "Total supply should be 5");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance.toNumber(), 5, "Token balance should be 5");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, `${baseTokenURI}1`, "Invalid tokon URI");

        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 1, {from: account_two});
            assert.equal(await this.contract.ownerOf(1), account_one, "Owner should be account_one");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail minting when address is not contract owner', async function () { 
            let result = false;
            try{
                await this.contract.mint(account_two, 1, {from: account_two});

            }catch(e){
                console.log(e);
                result = true;
            }
            assert.equal(result, true, "Only contract owner can mint new token!");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner({from: account_one});
            assert.equal(account_one, owner, "This is not the contract owner");
        })

    });
})