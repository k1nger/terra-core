import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './_Tag.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The content of the tag.
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback function triggered when the tag is deselected.
   */
  onDeselect: PropTypes.func.isRequired,
  /**
   * The value of the tag.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// TODO:
/* eslint-disable jsx-a11y/no-static-element-interactions */
const Tag = ({ children, onDeselect, value }) => (
  <li className={cx('tag')}>
    <span className={cx('content')}>
      {children}
    </span>
    <span className={cx('deselect')} onClick={() => { onDeselect(value); }}>
      <span className={cx('icon')} />
    </span>
  </li>
);

Tag.propTypes = propTypes;

export default Tag;
