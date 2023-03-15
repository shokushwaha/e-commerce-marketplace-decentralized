async function main() {
  const Dkart = await hre.ethers.getContractFactory("Dkart");
  const dkart = await Dkart.deploy();
  await dkart.deployed();
  console.log("Contract address :", dkart.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
