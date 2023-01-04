function Banner() {
  return (
    <div className="container mx-auto align">
      <div className="flex items-left rounded-full p-4 py-4 medallion-background flex flex-col justify-between xl:flex xl:flex-col xl:justify-between mb-10 xl:mb-0 py-4 mx-4 sm:mx-0 xl:mx-0">
        <img
          src={window.location.origin + "/images/bitcoin.png"}
          alt="Bitcoin"
          className="mx-0 mt-2 sm:mt-0 md:mt-0 lg:mt-0"
          height="25"
          width="25"
        />
        <img
          src={window.location.origin + "/images/ethereum.png"}
          alt="Ethereum"
          className="mx-0 sm:mt-0 md:mt-0 lg:mt-2 ml-0 sm:ml-6 md:ml-6 lg:ml-6"
          height="25"
          width="25"
        />
        <div className="w-full flex flex-col -mt-16">
          <div className="flex justify-between">
            <p className="font-bold text-sm md:text-xl ml-8 sm:ml-16 md:ml-16 lg:text-2xl lg:ml-16">
              Buy MEDALLIONS with krypto
            </p>
            <p className="text-sm font-bold md:text-md">LEARN MORE</p>
          </div>
          <p className="text-xs sm:text-md md:text-md ml-8 sm:ml-16 md:ml-16 lg:text-md font-bold text-slate-600">
            Did you know that you can buy Princess with ETH,BTC,BCH,DAI, and
            USDC?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
