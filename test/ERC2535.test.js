```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SyntheticTokenFactory", function () {
  let SyntheticTokenFactory, syntheticTokenFactory, owner, addr1, addr2;

  beforeEach(async () => {
    SyntheticTokenFactory = await ethers.getContractFactory("SyntheticTokenFactory");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    syntheticTokenFactory = await SyntheticTokenFactory.deploy();
    await syntheticTokenFactory.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await syntheticTokenFactory.hasRole(syntheticTokenFactory.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await syntheticTokenFactory.balanceOf(owner.address);
      expect(await syntheticTokenFactory.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await syntheticTokenFactory.balanceOf(owner.address);

      await expect(syntheticTokenFactory.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith("Not enough tokens");

      expect(await syntheticTokenFactory.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await syntheticTokenFactory.balanceOf(owner.address);

      await syntheticTokenFactory.transfer(addr1.address, 100);

      await syntheticTokenFactory.transfer(addr2.address, 50);

      const finalOwnerBalance = await syntheticTokenFactory.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await syntheticTokenFactory.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await syntheticTokenFactory.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
```
