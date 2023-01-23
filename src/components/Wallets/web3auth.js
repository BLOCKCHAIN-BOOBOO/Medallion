import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";
import Web3 from "web3";
const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

let GLOBAL_WEB3AUTH = null;
let GLOBAL_WEB3AUTH_PROVIDER = null;
let GLOBAL_WEB3AUTH_ETH = null;
let GLOBAL_WEB3AUTH_MATIC = null;
let GLOBAL_WEB3AUTH_PROVIDER_ETH = null;
let GLOBAL_WEB3AUTH_PROVIDER_MATIC = null;

export const ConnectionInit = async (chain_type) => {
  let chain_config = null;
  if (chain_type === "reth") {
    chain_config = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x4",
      rpcTarget:
        "https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380",
    };
  } else if (chain_type === "matic") {
    chain_config = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x13881",
      rpcTarget: "https://matic-mumbai.chainstacklabs.com",
    };
  } else {
    //Default Configuration
    chain_config = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x4",
      rpcTarget:
        "https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380",
    };
  }

  try {
    const web3auth = new Web3Auth({
      clientId,
      chainConfig: chain_config,
    });
    await web3auth.initModal();
    if (chain_type === "matic") {
      GLOBAL_WEB3AUTH_ETH = web3auth;
      return web3auth;
    } else if (chain_type === "reth") {
      GLOBAL_WEB3AUTH_MATIC = web3auth;
      return web3auth;
    } else {
      GLOBAL_WEB3AUTH = web3auth;
      return web3auth;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Signin to Wallet
export const SignInToWallet = async (chain_type) => {
  if (chain_type === "reth") {
    GLOBAL_WEB3AUTH = GLOBAL_WEB3AUTH_ETH;
  } else if (chain_type === "matic") {
    GLOBAL_WEB3AUTH = GLOBAL_WEB3AUTH_MATIC;
  }
  const web3auth = GLOBAL_WEB3AUTH
    ? GLOBAL_WEB3AUTH
    : await ConnectionInit(chain_type);

  if (!web3auth) {
    return false;
  } else {
    try {
      const web3authProvider = await web3auth.connect();
      if (chain_type === "reth") {
        GLOBAL_WEB3AUTH_PROVIDER_ETH = web3authProvider;
        return web3authProvider;
      } else if (chain_type === "matic") {
        GLOBAL_WEB3AUTH_PROVIDER_MATIC = web3authProvider;
        return web3authProvider;
      }
    } catch (error) {
      return false;
    }
  }
};

// //Get Logged User Info
// export const GetUserInfo = async () => {
//   const web3auth = GLOBAL_WEB3AUTH ? GLOBAL_WEB3AUTH : await ConnectionInit();
//   if (!web3auth) {
//     console.log("Connection Init and Provider Not Established, Please Check");
//     return false;
//   } else {
//     try {
//       console.log("Fethcing User Info");
//       const User = await web3auth.getUserInfo();
//       return User;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }
// };

//Get Account Address
export const GetUserAccount = async (chain_type) => {
  if (chain_type === "reth") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_ETH;
  } else if (chain_type === "matic") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_MATIC;
  }
  const web3authProvider = GLOBAL_WEB3AUTH_PROVIDER
    ? GLOBAL_WEB3AUTH_PROVIDER
    : await SignInToWallet(chain_type);

  if (!web3authProvider) {
    return false;
  } else {
    try {
      const web3 = new Web3(web3authProvider);
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      return false;
    }
  }
};

//Get Wallet Balance
export const GetWalletBalance = async (chain_type) => {
  if (chain_type === "reth") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_ETH;
  } else if (chain_type === "matic") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_MATIC;
  }
  const web3authProvider = GLOBAL_WEB3AUTH_PROVIDER
    ? GLOBAL_WEB3AUTH_PROVIDER
    : await SignInToWallet(chain_type);
  try {
    const web3 = new Web3(web3authProvider);
    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0];
    // Get user's balance in ether
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address) // Balance is in wei
    );
    return balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Buy Medallion
export const BuyMedallion = async (medallion_price, chain_type) => {
  if (chain_type === "reth") {
    GLOBAL_WEB3AUTH = GLOBAL_WEB3AUTH_ETH;
  } else if (chain_type === "matic") {
    GLOBAL_WEB3AUTH = GLOBAL_WEB3AUTH_MATIC;
  }
  const web3auth = GLOBAL_WEB3AUTH
    ? GLOBAL_WEB3AUTH
    : await ConnectionInit(chain_type);

  if (chain_type === "reth") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_ETH;
  } else if (chain_type === "matic") {
    GLOBAL_WEB3AUTH_PROVIDER = GLOBAL_WEB3AUTH_PROVIDER_MATIC;
  }
  const web3authProvider = GLOBAL_WEB3AUTH_PROVIDER
    ? GLOBAL_WEB3AUTH_PROVIDER
    : await SignInToWallet(chain_type);

  if (!web3authProvider) {
    return false;
  } else {
    const providers = new ethers.providers.Web3Provider(web3authProvider);
    const signer = providers.getSigner();
    //   signer.signTransaction({
    //     to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    //     value: '1000000000',
    //     gas: 2000000
    // }).then(console.log)
    //console.log(tx)
    let address = await signer.getAddress();
    //Transaction Block
    try {
      const tx = await signer.sendTransaction({
        to: "0xb29061feF085EA807847DE47038Ac0e9942FEaD2",
        value: ethers.utils.parseEther(medallion_price.toString()),
      });
      return tx.hash;
    } catch (error) {
      throw error;
    }
  }

  // try {

  //   //return { tx_status: 200, response: tx.hash };
  // } catch (error) {
  //   console.log("Transaction Error", error);
  //   return { tx_status: error.code, response: error.message };
  // }

  // console.log(tx_hash, "tx");
  // let formData = new FormData();

  // formData.append("tx", tx_hash);

  // let response = await axios.post("http://localhost:5000/nfts/buy", formData, {
  //   headers: { "Content-Type": "application/json" },
  // });
};

//Wallet Logout
export const WalletLogout = async () => {
  const web3auth = GLOBAL_WEB3AUTH ? GLOBAL_WEB3AUTH : await ConnectionInit();
  try {
    await web3auth.logout();
    return true;
  } catch (error) {
    return false;
  }
};
