import {
  BASE_URL,
  GET_SINGLE_NFT_BY_MEDALLIONID,
  CLAIM_FUND,
  GET_MARKET_PLACE_SINGLE_NFT_BY_MEDALLIONID,
} from "../../api";

import GetFunction from "../common/GetFunction";
import HandleError from "../common/HandleError";
import PostFunction from "../common/PostFunction";
import { Meta_BuyMedallion, Meta_WalletBalance } from "../Wallets/MetaMask";
import {
  WalletConnect_Transaction,
  WalletConnect_Balance,
} from "../Wallets/WalletConnect";
import { DollarsToETH } from "../../Utils/Helper";

const ResponseObject = {
  data: null,
  status: null,
  message: null,
};

//Purchase NFT
export const Purchase = async (
  Token,
  MedallionId,
  UserAccount,
  ChainId,
  WalletName
) => {
  try {
    const ValidatedResponse = await ValidateMedallionPrice(Token, MedallionId);

    // const UserWalletBalance = await GetWalletBalance(
    //   ValidatedResponse.chain_type
    // );

    //Metamask Wallet Balance

    const UserWalletBalance = await Meta_WalletBalance(
      ValidatedResponse.chain_type
    );

    // const UserWalletBalance = await WalletConnect_Balance(UserAccount);

    if (UserWalletBalance < ValidatedResponse.medallion_price) {
      ResponseObject.status = "error";
      ResponseObject.message = "Insufficient Funds";
      throw ResponseObject;
    } else {
      // const transaction_response = await BuyMedallion(
      //   ValidatedResponse.medallion_price,
      //   ValidatedResponse.chain_type
      // );

      const transaction_response = await WalletType_Transaction_Handler(
        WalletName,
        ValidatedResponse
      );

      const VerifiedTransactionResponse = await VerifyTransaction(
        MedallionId,
        transaction_response,
        Token
      );
      return VerifiedTransactionResponse;
    }
  } catch (error) {
    ResponseObject.status = "error";
    ResponseObject.message = error.message;
    ResponseObject.data = null;
    throw ResponseObject;
  }
};

//Medallion Price Validation
const ValidateMedallionPrice = async (Token, MedallionId) => {
  try {

    const usdtoeth = await DollarsToETH();
    const GET_SINGLE_NFT_API =
      BASE_URL + GET_MARKET_PLACE_SINGLE_NFT_BY_MEDALLIONID + MedallionId;
    const { result, RequestResolved } = await GetFunction(
      GET_SINGLE_NFT_API,
      Token
    );


    if (RequestResolved) {
      const { ResultType, Message } = HandleError(result);
      if (ResultType === "success") {
        if (result.data.data.records) {
          const medallion_data = { ...result.data.data.records };
          const medallion_price = (medallion_data[0].price * usdtoeth).toFixed(
            8
          );
          const chain_type = medallion_data[0].currency;
          const data = {
            chain_type: chain_type,
            medallion_price: medallion_price,
          };
          return data;
        } else {
          ResponseObject.status = "error";
          ResponseObject.message = "No Medallion Found";
          ResponseObject.data = null;
          throw ResponseObject;
        }
      } else {
        ResponseObject.status = "error";
        ResponseObject.message = Message;
        ResponseObject.data = null;
        throw ResponseObject;
      }
    }
  } catch (error) {
    ResponseObject.status = "error";
    ResponseObject.message = error.message;
    ResponseObject.data = null;
    throw ResponseObject;
  }
};

//Wallet Based Transaction Handler
const WalletType_Transaction_Handler = async (
  WalletType,
  ValidatedResponse
) => {
  if (WalletType === "MetaMask") {
    //Metamask wallet Buy Medallion
    return await Meta_BuyMedallion(ValidatedResponse.medallion_price);
  } else if (WalletType === "WalletConnect") {
    //Wallet Connect Buy Medallion
    return await WalletConnect_Transaction(ValidatedResponse.medallion_price);
  }
};

//Verify Transaction
export const VerifyTransaction = async (
  medallion_id,
  TrasactionHash,
  UserToken
) => {
  try {
    const VerifyUrl = BASE_URL + "/nfts/crypto_buy";
    const form_data = new FormData();
    form_data.append("medallion_id", medallion_id);
    form_data.append("tx", TrasactionHash);
    const { result, RequestResolved } = await PostFunction(
      VerifyUrl,
      form_data,
      UserToken
    );
    if (RequestResolved) {
      const { ResultType, Message } = HandleError(result);
      if (ResultType === "success") {
        ResponseObject.status = "success";
        ResponseObject.message = Message;
        ResponseObject.data = result;
        return ResponseObject;
      } else {
        ResponseObject.status = "error";
        ResponseObject.message = Message;
        ResponseObject.data = result;
        throw ResponseObject;
      }
    }
  } catch (error) {
    ResponseObject.status = "error";
    ResponseObject.message = error.message;
    ResponseObject.data = null;
    throw ResponseObject;
  }
};

//Claim Fund
export const ClaimFund = async (UserAccount, Token) => {
  try {
    const ClaimUrl = BASE_URL + CLAIM_FUND;
    const form_data = new FormData();
    form_data.append("address", UserAccount);
    const { result, RequestResolved } = await PostFunction(
      ClaimUrl,
      form_data,
      Token
    );
    if (RequestResolved) {
      const { ResultType, Message } = HandleError(result);
      if (ResultType === "success") {
        console.log("Claim Function", Message);
        return Message;
      } else {
        ResponseObject.status = "error";
        ResponseObject.message = Message;
        ResponseObject.data = null;
        throw ResponseObject;
      }
    }
  } catch (error) {
    ResponseObject.status = "error";
    ResponseObject.message = error.message;
    ResponseObject.data = null;
    throw ResponseObject;
  }
};
