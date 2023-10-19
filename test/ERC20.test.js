```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SyntheticToken", function () {
  let SyntheticToken;
  let syntheticToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    SyntheticToken = await ethers.getContractFactory("SyntheticToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    syntheticToken = await SyntheticToken.deploy(1000);
    await syntheticToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await syntheticToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await syntheticToken.balanceOf(owner.address);
      expect(await syntheticToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await syntheticToken.transfer(addr1.address, 50);
      const addr1Balance = await syntheticToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await syntheticToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await syntheticToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await syntheticToken.balanceOf(owner.address);

      await expect(
        syntheticToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await syntheticToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await syntheticToken.balanceOf(owner.address);

      await syntheticToken.transfer(addr1.address, 100);
      await syntheticToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await syntheticToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await syntheticToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await syntheticToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
```
