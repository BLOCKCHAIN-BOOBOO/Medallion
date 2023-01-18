function AlertHandler(props) {
  return (
    <div className="bg-white rounded-xl p-3 m-3 ">
      <div className="flex place-items-center">
        <span className="pt-2">
          {props.status === "success" ? (
 <ion-icon
 name="close-circle"
 size="large"
 style={{ color: "#CC0000" }}
 ></ion-icon>

         
          ) : (
            <ion-icon
            name="checkmark-circle"
            size="large"
            style={{ color: "#007E33" }}
          ></ion-icon>
          )}
        </span>
        <p className="mx-2 text-xl">{props.status_message}</p>
      </div>
    </div>
  );
}

export default AlertHandler;
