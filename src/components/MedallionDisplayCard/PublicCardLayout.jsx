import BasicData from "./BasicData";
import BuyComponent from "./BuyComponent";
import PriceComponent from "./PriceComponent";
import ViewComponent from "./ViewComponent";
import forsale from "./../../theme/images/forsale.png";
import "./../../theme/output.css";

function PublicCardLayout({ medallion }) {
  console.log("Public Card", medallion);
  return (
    <div className="medallion-card mx-auto self-center flex flex-col">
       <div className="float-right self-end">
       <img
        src={forsale}
        alt="" 
        style={{ width: "60px", height: "60px" }}
        className="-mt-1 z-10 absolute -ml-16 "
      />
      </div>
      <BasicData medallion={medallion} />
      <PriceComponent medallion_price={medallion.price} />
      <div className="flex py-2 self-center text-center justify-center">
        <ViewComponent
          ViewUrl="/view-single-nft/"
          MedallionId={medallion.medallion_ID}
        />
        <BuyComponent MedallionId={medallion.medallion_ID} />
      </div>
    </div>
  );
}

export default PublicCardLayout;