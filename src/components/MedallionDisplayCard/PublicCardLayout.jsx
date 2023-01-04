import BasicData from "./BasicData";
import BuyComponent from "./BuyComponent";
import PriceComponent from "./PriceComponent";
import ViewComponent from "./ViewComponent";
import forsale from "./../../theme/images/forsale.png";
import "./../../theme/output.css";

function PublicCardLayout({ medallion }) {
  console.log("Public Card", medallion);
  return (
    <div className="buy-card p-6 md:p-8 text-left">
       <img
        src={forsale}
        alt="" style={{width:"50px",height:"50px"}}
        className="-mt-9 "
      />
      <BasicData medallion={medallion} />
      <PriceComponent medallion_price={medallion.price} />
      <div className="flex flex-row justify-center space-x-2">
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