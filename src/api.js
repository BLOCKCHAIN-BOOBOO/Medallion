export const BASE_URL = "https://nft.radiqal.com:8000";

//Public URI's
export const MARKET_PLACE_NFTS = "/nfts/marketplace?status=on_sale";
export const GET_ALL_ONSALE_NFTS = "/nfts/get_nfts?status=on_sale"; //GET REQUEST

export const GET_MARKET_PLACE_SINGLE_NFT_BY_MEDALLIONID =
  "/nfts/marketplace?medallion_ID=";
// export const GET_SINGLE_NFT_BY_MEDALLIONID = "/nfts/get_nfts?medallion_ID="; //GET REQUEST
export const GET_SINGLE_NFT_BY_MEDALLIONID = "/nfts/collections?medallion_ID="; //GET REQUEST

export const GET_MEDALLION_ACTIVITY = "/records/get_records"; //GET REQUEST
export const GET_SINGLE_MEDALLION_ACTIVITY =
  "/records/get_records?medallion_ID="; //GET REQUEST
export const GET_ACTIVITIES_BY_USER = "/records/get_records_by_users";

//Private URI's
export const NFT_COLLECTION = "/nfts/collections"; //Get Request

//Authentication
export const USER_SIGNUP_URL = "/users/register";
export const USER_SIGNIN_URL = "/users/login";
export const USER_INFO = "/users/get_user_info";
export const USER_INFO_UPDATE = "/users/update_info";
export const USER_PASSWORD_UPDATE = "/users/update_pass";

//NFT Related
export const CLAIM_NFT = "/nfts/claim_nft"; //POST Request
export const CLAIM_FUND = "/nfts/claim_fund"; //POST Request
export const TRANSFER_NFT = "/nfts/transfer_nft"; //POST Request
export const GET_ALL_OWNER_NFTS = "/nfts/get_nfts?status&elite_status&owner="; //GET REQUEST
export const GET_OWNER_SINGLE_NFT_BY_MEDALLIONID =
  "/nfts/get_nfts?status&elite_status&owner&medallion_ID="; //GET REQUEST
export const UPDATE_NFT_DATA = "/nfts/update_nft_data"; //POST REQUEST

//Payment Gateway
export const RAZORPAY_CREATE_ORDER = "/transactions/create_order";
export const RAZORPAY_PAYMENT_STATUS = "/transactions/payment_status";

export const GET_PAYMENT_METHODS =
  "/transactions/get_payment_method_for_customer";
export const MEDPAY_BUY = "/nfts/MedPay_buy";

