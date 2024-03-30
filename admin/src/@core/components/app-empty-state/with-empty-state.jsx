// ** Components Imports
import AppEmptyState from "./app-empty-state";

// ** Utils Imports
import PropTypes from "prop-types";

const WithEmptyState = ({ show, children, ...props }) => {
  if (!show) {
    return <AppEmptyState {...props} />;
  }

  return children;
};

WithEmptyState.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default WithEmptyState;
