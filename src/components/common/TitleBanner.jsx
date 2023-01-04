function TitleBanner(props) {
  return (
    <div className="flex justify-between z-0">
      <p className="second-header-text market-font float-left mx-2 md:mx-0">
        {props.title}
      </p>
    </div>
  );
}

export default TitleBanner;
