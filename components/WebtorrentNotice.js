/* @flow */

import { style } from 'next/css';
import cookie from 'react-cookie';
import React, { Component } from 'react';

import { isServer } from '../env';
import t from '../styles/tachyons';

const CloseIcon = () => (
  <svg width="25" height="25" viewBox="0 0 40 40">
    <path
      style={{
        stroke: 'white',
        fill: 'transparent',
        strokeLinecap: 'round',
        strokeWidth: 5,
      }}
      d="M 10,10 L 30,30 M 30,10 L 10,30"
    />
  </svg>
);

type State = {
  seen: boolean,
};

class WebtorrentNotice extends Component {
  state: State = {
    seen: isServer || !!cookie.load('seenWebtorrentNotice'),
  };

  onClose = () => {
    cookie.save('seenWebtorrentNotice', 1, { path: '/' });
    this.setState({ seen: true });
  }

  render() {
    if (this.state.seen) return null;

    /* eslint-disable max-len */
    return (
      <div className={styles.container}>
        <a
          className={styles.message}
          href="https://webtorrent.io/desktop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ❗ Download <span>WebTorrent</span> to stream the movies on this website.
        </a>
        <button
          className={styles.closeButton}
          onClick={this.onClose}
        >
          <CloseIcon />
        </button>
      </div>
    );
    /* eslint-enable max-len */
  }
}

const styles = {
  container: style({
    ...t.relative,
    ...t.bg_white_10,
    ...t.br2,
    ...t.mb4,
  }),
  message: style({
    ...t.db,
    ...t.bn,
    ...t.dim,
    ...t.pa4,
    '& > span': {
      borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    },
  }),
  closeButton: style({
    ...t.absolute,
    ...t.top_0,
    ...t.right_0,
    ...t.input_reset,
    ...t.button_reset,
    ...t.bg_black_10,
    ...t.pa1,
    ...t.dim,
    ...t.outline_0,
    ...t.bn,
    boxSizing: 'content-box',
    height: 25,
  }),
};

export default WebtorrentNotice;
