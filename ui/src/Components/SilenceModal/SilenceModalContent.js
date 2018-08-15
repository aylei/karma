import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { SilenceForm } from "./SilenceForm";
import { SilenceSubmitController } from "./SilenceSubmitController";

class SilenceModalContent extends Component {
  static propTypes = {
    alertStore: PropTypes.object.isRequired,
    silenceFormStore: PropTypes.object.isRequired
  };

  render() {
    const { alertStore, silenceFormStore } = this.props;

    return ReactDOM.createPortal(
      <div className="modal d-block bg-primary-transparent-80" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new silence</h5>
              <button
                type="button"
                className="close"
                onClick={silenceFormStore.toggle.hide}
              >
                <span className="align-middle">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {silenceFormStore.data.inProgress ? (
                <SilenceSubmitController silenceFormStore={silenceFormStore} />
              ) : (
                <SilenceForm
                  alertStore={alertStore}
                  silenceFormStore={silenceFormStore}
                />
              )}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
}

export { SilenceModalContent };