import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import { getConfig } from "./constants";

class Wallet {
  web3;
  walletType = '';

  constructor() {
    this.web3 = new Web3(Web3.givenProvider);
  }

  async setProvider(type: string) {
    let provider;
    console.log(type)
    switch (type) {
      case 'metamask':
        provider = await detectEthereumProvider();

        const { ethereum } = window;

        if (provider === ethereum) {
          //@ts-ignore
          this.web3.setProvider(provider);
          this.walletType = type;
        }

        break;

      case 'walletconnect':
        provider = new WalletConnectProvider({
          infuraId: getConfig().infuraId,
        });
        this.walletType = type;

        //@ts-ignore
        this.web3.setProvider(provider);
        console.log("current provider ", this.web3.currentProvider);
        break;

      default:
        throw new Error("Invalid wallet type");
    }
  }

  login = async (type: string) => {
    let accounts;
    switch (type) {
      case 'metamask':
        //@ts-ignore
        accounts = await this.web3.currentProvider.request({
          method: "eth_requestAccounts",
        });

        //@ts-ignore
        const chainId = await this.web3.currentProvider.request({
          method: "eth_chainId",
        });

        console.log("chainId ", chainId);

        if (accounts.length) {
          const address = accounts[0];
          // store.dispatch(login({ address }, chainId));
        } else {
          throw new Error("No account found");
        }

        //@ts-ignore
        this.web3.currentProvider.on(
          "accountsChanged",
          async (accounts: any) => {
            console.log("accounts on change", accounts);

            //@ts-ignore
            const chainId = await this.web3.currentProvider.request({
              method: "eth_chainId",
            });

            if (accounts.length) {
              const address = accounts[0];
              // store.dispatch(login({ address }, chainId));
            } else {
              console.log('-------', 'disconnect')
              this.disconnect();
            }
          }
        );

        //@ts-ignore
        this.web3.currentProvider.on("chainChanged", () => {
          console.log('---------', 'chain changed')
          window.location.reload();
        });

        break;

      case 'walletconnect':
        //@ts-ignore
        accounts = await this.web3.currentProvider.enable();

        const chainIdWalletConnect: number = await this.web3.eth.getChainId();

        if (accounts.length) {
          const address = accounts[0];
          // store.dispatch(
          //   login(
          //     { address },
          //     Number(this.web3.utils.toHex(chainIdWalletConnect.toString()))
          //   )
          // );
        } else {
          throw new Error("No account found");
        }

        //@ts-ignore
        this.web3.currentProvider.on("chainChanged", () => {
          window.location.reload();
        });

        //@ts-ignore
        this.web3.currentProvider.on(
          "accountsChanged",
          async (accounts: any) => {
            if (accounts.length) {
              const address = accounts[0];

              const chainIdWalletConnect = await this.web3.eth.getChainId();

              // store.dispatch(
              //   login(
              //     { address },
              //     Number(this.web3.utils.toHex(chainIdWalletConnect.toString()))
              //   )
              // );
            }
          }
        );

        break;

      default:
        throw new Error("Invalid wallet type");
    }
  };

  disconnect = async () => {
    switch (this.walletType) {
      case 'metamask':
        // @ts-ignore
        const res = await this.web3.currentProvider._handleDisconnect();
        // store.dispatch(logout());
        break;

      case 'walletconnect':
        // store.dispatch(logout());
        break;

      default:
        throw new Error("Invalid wallet type");
    }
  };
}

export default new Wallet();
