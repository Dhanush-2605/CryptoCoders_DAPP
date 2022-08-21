// const CryptoCoders = artifacts.require("../contracts/CryptoCoders.sol");
const CryptoCoders=artifacts.require("../contracts/CryptoCoder.sol");

// const CryptoCoders=require("./")

contract('CryptoCoders', () => {
  let contract;
  before(async()=>{
     contract=await CryptoCoders.deployed();
    })
  it('...get deployed', async() => {
    assert.notEqual(contract,"");


  });
  it ("...get's minted and added",async ()=>{
    const result=await contract.mint("dhanush");
    let coder=await contract.coders(0);
    console.log(coder);
  })
});
