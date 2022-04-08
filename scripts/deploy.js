const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

	const gameContract = await gameContractFactory.deploy(
		["ZORO", "NAMI", "USOPP"], // キャラクターの名前
		["QmWhURqyPdxS1hmwr73U9gVTk32K5EBS6V29eKaLyr2aet",  // キャラクターの画像
			"QmehV6z8qo6vSjazFd2cjDKahDvNNdg56pwKS3oEfnCCCp",
			"QmXZBQ4d4DZzXo7CWLCbTxfQXh8Lggp8zTKYDRfdFtSM6W"],
		[100, 200, 300],
		[100, 50, 25],
		"CROCODILE", // Bossの名前
		"https://i.imgur.com/BehawOh.png", // Bossの画像
		10000, // Bossのhp
		50 // Bossの攻撃力
	);
	// ここでは、nftGame コントラクトが、
	// ローカルのブロックチェーンにデプロイされるまで待つ処理を行っています。
	const nftGame = await gameContract.deployed();

	console.log("Contract deployed to:", nftGame.address);
};
const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
runMain();