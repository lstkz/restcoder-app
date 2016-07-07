import React, { PropTypes } from 'react';
import styles from './ShortModal.scss';
import {Modal} from 'react-bootstrap';
import classNames from 'classnames';

export default class ShortModal extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  render() {
    const {children, show, onHide, title, className} = this.props;
    return (
      <Modal show={show} onHide={onHide} className={classNames(styles.ShortModal, className)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    );
  }
}
