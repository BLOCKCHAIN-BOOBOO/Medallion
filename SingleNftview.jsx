import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, GET_SINGLE_NFT_BY_MEDALLIONID } from "../api";
import useFetch from "../Hooks/useFetch";

function SingleNftview() {
  const { TokenId } = useParams();
  const token = useSelector((state) => state.user.token);

  const { Data, Loading, Error } = useFetch(
    BASE_URL + GET_SINGLE_NFT_BY_MEDALLIONID + TokenId,
    token
  );

  return (
    <div className="container vh-100">
      {!Loading && Data
        ? Data.map((SingleNft, index) => {
            return (
              <div
                className="row gx-4 gx-lg-5 align-items-center"
                style={{ position: "relative", top: "10vh" }}
                key={SingleNft.medallion_ID}
              >
                <div className="col-md-6">
                  <img
                    style={{ width: "500px", height: "500px" }}
                    src={BASE_URL + "/" + SingleNft.model_url}
                    alt="Medallion"
                  />
                </div>
                <div className="col-md-6">
                  <div className="banner-box">
                    <br></br>
                    <div className="mb-1">
                      Medallion Id: #{SingleNft.medallion_ID}
                    </div>
                    <h1 className="display-5 fw-bolder nfts-m overflow-hidden">
                      {SingleNft.name}
                    </h1>
                    <div className="mt-3 mb-3">
                      {/* <span>Ocean ID : #{SingleNft.oceanid}</span>
                      <br></br> */}
                      <span>Membership Status : {SingleNft.elite_status}</span>
                      <br></br>
                      <span>Status : {SingleNft.status}</span>
                      <br></br>
                      <span>
                        Owner :{" "}
                        <span className="text-info">
                          <strong>{SingleNft.owner}</strong>
                        </span>
                      </span>
                      <br></br>
                      <span>Created On : {}</span>
                      <br></br>
                    </div>

                    <div className="line"></div>
                    <p className="text-white mt-2 mb-2">
                      This part will enlist the benefits associated with this
                      Medallion NFT
                    </p>
                 
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default SingleNftCard;
