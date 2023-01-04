import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { createContext } from "react";

const chain_config = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x4",
  rpcTarget: "https://rinkeby.infura.io/v3/9facc91f8cd24fe693d3f0f4d930a380",
};

export function Web3authComponent({ children }) {
  const [Web3Auth, setWeb3Auth] = useState("");
  const [Loading, SetLoading] = useState(false);

  // const Init = async () => {
  //   try {
  //     SetLoading(true);
  //     const clientId =
  //       "BKPxkCtfC9gZ5dj-eg-W6yb5Xfr3XkxHuGZl2o2Bn8gKQ7UYike9Dh6c-_LaXlUN77x0cBoPwcSx-IVm0llVsLA";
  //     const web3AuthInstance = new Web3Auth({
  //       clientId,
  //       chainConfig: chain_config,
  //     });
  //     const adapter = new OpenloginAdapter({
  //       adapterSettings: { network: web3AuthNetwork, clientId },
  //     });
  //     web3AuthInstance.configureAdapter(adapter);
  //     subscribeAuthEvents(web3AuthInstance);
  //     setWeb3Auth(web3AuthInstance);
  //     await web3AuthInstance.initModal();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     SetLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   Init();
  // }, []);

  return (
    <div>
      <h1>Movies List</h1>
    </div>
  );
}
