import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal_Closed } from "../../store/ModalReducer";

const ModalOverLay = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
};

const ModalClass = {
  width: "auto",
  minWidth: "20%",
  height: "auto",
  minHeight: "30%",
  position: "fixed",
  top: "30%",
  left: "40%",
  transform: 'translate("-50%", "-50%")',
  backgroundColor: "#fff",
};

function Modal({ children, hide_close_button }) {
  const ModalState = useSelector((state) => state.Modal);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch({
      type: Modal_Closed,
    });
  };

  if (ModalState && !ModalState.is_open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div style={ModalOverLay} className="z-40">
        <div style={ModalClass} className="p-5 rounded-xl z-50">
          {!hide_close_button && (
            <div>
              <button
                onClick={() => handleModalClose()}
                className="relative bottom-0 p-1 float-right"
              >
              <i className="fa fa-close"></i>
              </button>
            </div>
          )}
          <div className="text-center clear-both p-2">{children}</div>
          <hr />
          <br></br>
        </div>
      </div>
    </>,
    document.getElementById("portal_node")
  );
}

export default Modal;
