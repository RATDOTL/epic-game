const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["ZORO", "NAMI", "USOPP"], // キャラクターの名前
        ["QmWhURqyPdxS1hmwr73U9gVTk32K5EBS6V29eKaLyr2aet",  // キャラクターの画像
            "QmehV6z8qo6vSjazFd2cjDKahDvNNdg56pwKS3oEfnCCCp",
            "QmXZBQ4d4DZzXo7CWLCbTxfQXh8Lggp8zTKYDRfdFtSM6W"],
        [100, 200, 300],                    // キャラクターのHP
        [100, 50, 25],
        "CROCODILE", // Bossの名前
        "https://i.imgur.com/BehawOh.png", // Bossの画像
        10000, // Bossのhp
        50 // Bossの攻撃力                       // キャラクターの攻撃力
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
    // 再代入可能な変数 txn を宣言
    let txn;
    // 3体のNFTキャラクターの中から、3番目のキャラクターを Mint しています。
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    // 2回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();
    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // NFTのURIの値を取得します。tokenURI は ERC721 から継承した関数です。
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
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