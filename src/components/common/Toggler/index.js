import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './toggler.scss';

type Props = { id: string, name: string };

const Toggler = (props: Props): React$Element<string> => (
  <div className={cx([s.btnFilter, 'container'])}>
    <span>{props.name}</span>
    <button disable className="btn btn-link">
      Show
    </button>
    <label htmlFor="checkInp" className={s.switch}>
      <input
        id="checkInp"
        type="checkbox"
        data-toggle="collapse"
        href={`#${props.id}`}
        aria-controls={props.id}
      />
      <span className={cx([s.slider, s.round])} />
    </label>
  </div>
);

export default withStyles(s)(Toggler);
