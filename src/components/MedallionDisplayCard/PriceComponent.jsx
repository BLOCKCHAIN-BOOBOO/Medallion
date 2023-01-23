import { useState } from "react";
import { useEffect } from "react";
import { DollarsToETH } from "../../Utils/Helper";

function PriceComponent({ medallion_price }) {
  const [price, setprice] = useState();

  useEffect(() => {
    const handle = async () => {
      const result = await DollarsToETH();

      setprice(result *medallion_price);
    };

    handle();
  });
  return (
    <div className="mt-2 mb-2">
      <p className="font-bold self-center text-center text-truncate h-12">
        USD {medallion_price.toString().slice(0, 8) } ( ETH {price&&price.toString().slice(0, 8)} )
      </p>
    </div>
  );
}

export default PriceComponent;
