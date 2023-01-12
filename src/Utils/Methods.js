import {
  BASE_URL,
  USER_INFO_UPDATE,
  USER_PASSWORD_UPDATE,
  USER_INFO,
  NFT_COLLECTION,
  GET_SINGLE_NFT_BY_MEDALLIONID,
  UPDATE_NFT_DATA,
  TRANSFER_NFT,
  CLAIM_NFT,
  CLAIM_FUND,
  GET_SINGLE_MEDALLION_ACTIVITY,
  GET_MARKET_PLACE_SINGLE_NFT_BY_MEDALLIONID,
} from "../api";
import { GetFunction, PostFunction } from "./Helper";

const UpdateProfileUrl = BASE_URL + USER_INFO_UPDATE;
const UpdatePasswordUrl = BASE_URL + USER_PASSWORD_UPDATE;
const GetUserInfoUrl = BASE_URL + USER_INFO;
const GetUserCollectionUrl = BASE_URL + NFT_COLLECTION;
const UpdateNftDataUrl = BASE_URL + UPDATE_NFT_DATA;
const MedallionTransferUrl = BASE_URL + TRANSFER_NFT;
const ClaimMedallionUrl = BASE_URL + CLAIM_NFT;
const ClaimFundUrl = BASE_URL + CLAIM_FUND;

//Error Message Handler
export const ErrorMessageHandler = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

//Update User Profile
export const UpdateUserProfile = async (FirstName, LastName, Email, Token) => {
  try {
    const form_data = new FormData();
    form_data.append("first_name", FirstName);
    form_data.append("last_name", LastName);
    form_data.append("current_email", Email);
    const result = await PostFunction(UpdateProfileUrl, form_data, Token);
    return result;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Update User Password
export const UpdateUserPassword = async (
  CurrentPassword,
  NewPassword,
  Token
) => {
  try {
    const form_data = new FormData();
    form_data.append("current_password", CurrentPassword);
    form_data.append("new_password", NewPassword);
    const result = await PostFunction(UpdatePasswordUrl, form_data, Token);
    return result;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get UserInfo
export const GetUserInfo = async (Token) => {
  try {
    const result = await GetFunction(GetUserInfoUrl, Token);
    return result.data.data;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get User Medallion Collection
export const GetUserCollection = async (Token) => {
  try {
    const result = await GetFunction(GetUserCollectionUrl, Token);
    return result.data.data.records;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get Marketplace Medallions
export const GetMarketPlaceMedallions = async (
  MarketPlaceCollectionUri,
  Token
) => {
  try {
    const MarketPlaceCollectionUrl = BASE_URL + MarketPlaceCollectionUri;
    const result = await GetFunction(MarketPlaceCollectionUrl, Token);
    return result.data.data.records;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get SingleMedallion Data
export const GetSingleMedallionData = async (MedallionId, Token,from) => {
  try {
    const SingleMedallionUrl =
    from === "collectons"
      ? // BASE_URL + GET_SINGLE_NFT_BY_MEDALLIONID + MedallionId;
        BASE_URL + GET_SINGLE_NFT_BY_MEDALLIONID + MedallionId
      : BASE_URL + GET_MARKET_PLACE_SINGLE_NFT_BY_MEDALLIONID + MedallionId;

    const result = await GetFunction(SingleMedallionUrl, Token);
    return result.data.data.records;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get SingleMedallion Data
export const GetMedallionActivity = async (Medallion_ID, Token) => {
  try {
    const MedallionActivityUrl =
      BASE_URL + GET_SINGLE_MEDALLION_ACTIVITY + Medallion_ID;
    const result = await GetFunction(MedallionActivityUrl, Token);
    return result.data.data.records;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Medallion Sale, Price, Currency Update
export const MedallionDataUpdate = async (
  MedallionID,
  SaleStatus,
  Currency,
  Price,
  Token
) => {
  try {
    const form_data = new FormData();
    form_data.append("medallion_ID", MedallionID);
    form_data.append("status", SaleStatus);
    form_data.append("currency", Currency);
    form_data.append("price", Price);
    const result = await PostFunction(UpdateNftDataUrl, form_data, Token);
    if (SaleStatus === "on_sale") {
      return "Medallion Listed On MarketPlace";
    } else if (SaleStatus === "off_sale") {
      return "Medallion Unlisted from MarketPlace";
    } else {
      return result.data.message;
    }
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Medallion Transfer
export const MedallionTransfer = async (MedallionID, UserAddress, Token) => {
  try {
    const form_data = new FormData();
    form_data.append("medallion_id", MedallionID);
    form_data.append("email", UserAddress);
    const result = await PostFunction(MedallionTransferUrl, form_data, Token);
    console.log("Transfer Function", result);
    return result.data.code;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Get Wallet Balance
export const GetWalletBalance = async (Token) => {
  try {
    const result = await GetFunction(GetUserInfoUrl, Token);
    return result.data.data.balance / Math.pow(10, 18);
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Claim Medallion
export const ClaimNft = async (medallion_ID, Token) => {
  try {
    const form_data = new FormData();
    form_data.append("medallion_id", medallion_ID);
    const result = await PostFunction(ClaimMedallionUrl, form_data, Token);
    console.log("Claim Function", result);
    return result.data.message;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};

//Claim Fund
export const ClaimFund = async (UserAccount, Token) => {
  try {
    const form_data = new FormData();
    form_data.append("address", UserAccount);
    const result = await PostFunction(ClaimFundUrl, form_data, Token);
    console.log("Claim Fund Function", result);
    return result.data.message;
  } catch (error) {
    const ErrorMessage = ErrorMessageHandler(error);
    throw ErrorMessage;
  }
};
