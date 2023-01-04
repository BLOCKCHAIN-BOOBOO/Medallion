function TitleBanner(props) {
  return (
    <div className="flex justify-between z-0">
      <p className="market-font text-4xl sm:text-5xl md:text-7xl lg:text-7xl text-white float-left mx-2 md:mx-0">
        {props.title}
      </p>
    </div>
  );
}

export default TitleBanner;
