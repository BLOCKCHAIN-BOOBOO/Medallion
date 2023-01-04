import { Web3Auth } from "@web3auth/web3auth";
import { useEffect, useState } from "react";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId =
  "BAA_gBk19IGc_q8cDY5iEH8gGwaxiIWt4ZgJWwJxiJeyRviol-x8R8Hntvcy05rqTpJ2oRN-lnQWIc9AyXmHRO0";

const useWalletConnect = () => {
  const [web3auth, Setweb3auth] = useState(null);
  const [ConnectionError, SetConnectionError] = useState(false);

  useEffect(() => {
    const ConnectionInit = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x4",
            rpcTarget:
              "https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        console.log(web3auth);
        Setweb3auth(web3auth);
        return await web3auth.initModal();
      } catch (error) {
        SetConnectionError(true);
        return console.log(error);
      }
    };
    ConnectionInit();
  }, []);

  return { web3auth, ConnectionError };
};

export default useWalletConnect;
