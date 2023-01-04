import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ethers } from "ethers";
import Web3 from "web3";

// // Subscribe to connection events
// connector.on("connect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get provided accounts and chainId
//   const { accounts, chainId } = payload.params[0];
// });

// connector.on("session_update", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get updated accounts and chainId
//   const { accounts, chainId } = payload.params[0];
// });

// connector.on("disconnect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Delete connector
// });

// Draft transaction

export const WalletConnect_Balance = async (user_account) => {
  try {
    console.log(user_account);
    const AccountBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [user_account, "latest"],
    });

    // const connector = new WalletConnect({
    //   bridge: "https://bridge.walletconnect.org", // Required
    //   qrcodeModal: QRCodeModal,
    // })();
    // const web3 = new Web3.providers.HttpProvider(connector);
    // var AccountBalance = await web3.eth.getBalance(user_account);

    console.log(AccountBalance);
    console.log(
      "WalletConnect Balance",
      ethers.utils.formatEther(AccountBalance)
    );
    return AccountBalance;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const WalletConnect_Transaction = async (user_account, chainId) => {
  console.log("Initiating WalletConnect Transaction");

  const connector = await new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  })();

  if (!connector.connected) {
    // create new session
    console.log("Creating Session");
    await connector.createSession();
  } else {
    console.log("Starting Transaction");
    const tx = {
      from: user_account, // Required
      to: "0xb29061feF085EA807847DE47038Ac0e9942FEaD2", // Required (for non contract deployments)
      data: "0x1", // Required
      // gasPrice: "0x02540be400", // Optional
      // gas: "0x9c40", // Optional
      value: "0x00", // Optional
      // nonce: "0x0114", // Optional
    };

    //Send transaction
    connector
      .sendTransaction(tx)
      .then((result) => {
        // Returns transaction id (hash)
        console.log(result);
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error);
      });
  }
};
