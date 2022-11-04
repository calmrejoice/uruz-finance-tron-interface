import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  tron: any;
  name: string;
  address: string;
  network: string;
  ready: boolean;
  installed: boolean;
  trxBalance: number;
  onConnectWallet: any;
}

const AuthContext = createContext<AuthContextValue>({
  tron: {},
  name: "",
  address: "",
  network: "",
  ready: false,
  installed: false,
  trxBalance: 0,
  onConnectWallet: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [tron, setTron] = useState<any>({});
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);
  const [installed, setInstalled] = useState<boolean>(false);
  const [trxBalance, setTrxBalance] = useState<number>(0);

  useEffect(() => {
    if (window) {
      const { tronWeb } = window as any;
      const setDetails = () => {
        if (tronWeb) {
          setTron(tronWeb);
          setInstalled(true);
          setName(tronWeb.defaultAddress.name);
          setAddress(tronWeb.defaultAddress.base58);
          setNetwork(tronWeb.fullNode.host);
        }
      };
      const interval = setInterval(async () => {
        setDetails();
        //wallet checking interval 2sec
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const onConnectWallet = async () => {
    const res = await tron?.request({ method: "tron_requestAccounts" });
    if (res.code === 4001) {
      setReady(false);
    }
    if (res.code === 200) {
      setReady(true);
      setName(tron.defaultAddress.name);
      setAddress(tron.defaultAddress.base58);
      setNetwork(tron.fullNode.host);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        tron,
        name,
        address,
        network,
        ready,
        installed,
        trxBalance,
        onConnectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
