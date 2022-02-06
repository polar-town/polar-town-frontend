import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function ModalPortals({ children }) {
  return ReactDOM.createPortal(children, document.getElementById("modal"));
}

export default ModalPortals;

ModalPortals.propTypes = {
  children: PropTypes.node.isRequired,
};
