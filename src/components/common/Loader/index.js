import React from 'react';

type Props = {
  styleBlock: Object
};

export const Loader = (props: Props): React$Element<string> => {
  const { styleBlock } = props;
  return (
    <div className={styleBlock}>
      <i className="fa fa-spinner fa-pulse fa-4x fa-fw" aria-hidden="true" />
    </div>
  );
};

export default Loader;
