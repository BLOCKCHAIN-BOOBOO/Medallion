import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const ResponseObject = {
  data: null,
  status: null,
  message: null,
};

const ChainNetworks = {
  reth: {
    chainId: "0x4",
  },
  matic: {
    chainId: "0x13881",
  },
};

//Metamask UserAccount
export const MetaMaskUserAccount = async () => {
  try {
    if (typeof window.ethereum === "undefined") {
      ResponseObject.status = "error";
      ResponseObject.message = "MetaMask is not installed!";
      ResponseObject.data = null;
      throw ResponseObject;
    } else {
      // //Ask permission to connect account
      // await window.ethereum.request({
      //   method: "wallet_requestPermissions",
      //   params: [
      //     {
      //       eth_accounts: {},
      //     },
      //   ],
      // });
      //Get Account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    }
  } catch (error) {
    console.log(error);
    ResponseObject.status = "error";
    ResponseObject.message = error.message;
    ResponseObject.data = null;
    throw ResponseObject;
  }
};

//Is MetaMask
export const WalletName = () => {
  if (window.ethereum.isMetaMask) {
    console.log("Meta Mask Wallet");
  }
};

//Wallet Balance
export const Meta_WalletBalance = async (chain_type) => {
  chain_type && (await Meta_CheckChangeNetwork(chain_type));
  try {
    const user_account = await MetaMaskUserAccount();
    const AccountBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [user_account, "latest"],
    });
    console.log("Metamask Balance", ethers.utils.formatEther(AccountBalance));
    return AccountBalance;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Metamask Provider
export const Meta_Provider = async () => {
  try {
    const provider = await detectEthereumProvider();
    console.log("Metamask Provider", provider);
    return provider;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Current Connected Chain Id
export const ConnectedChainId = async () => {
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    return chainId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Check Network Change
export const Meta_CheckChangeNetwork = async (chain_type) => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  try {
    const current_chain_id = await ConnectedChainId();
    if (current_chain_id !== ChainNetworks[chain_type]) {
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              ...ChainNetworks[chain_type],
            },
          ],
        })
        .then((response) =>
          console.log("Chainging Network to", ChainNetworks[chain_type])
        )
        .catch((error) => console.log(error));
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Chain Change
export const ChainIdChange = async () => {
  try {
    const changed_chainid = await window.ethereum.on("chainChanged");
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (changed_chainid) {
      console.log("Chain ID Changed and Current Chain is", chainId);
    }
  } catch (error) {
    console.log(error);
  }
};

//Buy medallion with Metamask
export const Meta_BuyMedallion = async (medallion_price) => {
  const provider = await Meta_Provider();
  if (!provider) {
    console.log("Provider not set");
    return false;
  }
  try {
    const providers = new ethers.providers.Web3Provider(provider);
    const signer = providers.getSigner();
    let address = await signer.getAddress();
    console.log("Signer Address", address);
    const tx = await signer.sendTransaction({
      to: "0xb29061feF085EA807847DE47038Ac0e9942FEaD2",
      value: ethers.utils.parseEther(medallion_price.toString()),
    });
    console.log("Transaction response", tx);
    return tx.hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
