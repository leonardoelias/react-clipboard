import React from 'react';
import PropTypes from 'prop-types';

class Clipboard extends React.Component {

  copyToClipboard() {
    return document.execCommand('copy');
  }

  copy(text) {
    const hiddenElem = document.createElement('textarea');
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;

    hiddenElem.style.fontSize = '12pt';
    hiddenElem.style.border = '0';
    hiddenElem.style.padding = '0';
    hiddenElem.style.margin = '0';
    hiddenElem.style.position = 'absolute';
    hiddenElem.style.top = `${yPosition}px`;
    hiddenElem.setAttribute('readonly', '');
    hiddenElem.value = text;

    document
      .body
      .appendChild(hiddenElem);

    hiddenElem.select();

    let succeeded,
      error;

    try {
      succeeded = this.copyToClipboard();
    } catch (err) {
      succeeded = false;
      error = err;
    }

    document
      .body
      .removeChild(hiddenElem);

    this.handleResult(succeeded, error);
  }

  handleResult(succeeded, error) {
    if (succeeded) {
      this.props.onSuccess && this
        .props
        .onSuccess();
    } else {
      this.props.onError && this
        .props
        .onError(error);
    }
  }

  render() {
    const {render, text, props} = this.props;

    return render({
      ...props,
      copy: () => this.copy(text)
    });
  }
}

Clipboard.propTypes = {
  render: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  props: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Clipboard;
