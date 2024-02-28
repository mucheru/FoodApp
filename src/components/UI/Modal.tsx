import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./Modal.module.scss";
//import { ReactDOM } from "react";
import Overlay from 'react-bootstrap/Overlay';


const Backdrop = (props:any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props:any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.createElement("Overlay")!;

const Modal = (props:any) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;