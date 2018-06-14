/* @flow */
import React, { Fragment } from 'react';
import type { Node } from 'react';

type Props = {
  bodyTable: Array<Object>,
  itemTR: Object,
  index: number,
  formatTime: (time: string, str: ?boolean) => string | null,
  pres: (lang: string, num: number, pres: number) => void,
  countryFormat: (contry: string) => Node,
  ssr: boolean
};

export const BodyTable = (props: Props): Fragment => {
  const {
    bodyTable,
    itemTR,
    index,
    formatTime,
    pres,
    countryFormat,
    ssr
  } = props;

  return (
    <Fragment>
      <tr key={`tr-itemTR-${index}`}>
        {bodyTable.map(
          (itemTD: Object, j: number): any => {
            const keyNum = j;
            const key: string = Object.keys(itemTD)[0];
            const nowrap: boolean = !!itemTD.nowrap;

            if (itemTR[key]) {
              switch (itemTD[key]) {
                case 'date':
                  return (
                    <td nowrap={nowrap.toString()} key={`td-itemTD-${keyNum}`}>
                      {formatTime(itemTR[key], true)}
                    </td>
                  );
                case 'string': {
                  return (
                    <td nowrap={nowrap.toString()} key={`td-itemTD-${keyNum}`}>
                      {itemTR[key]}
                    </td>
                  );
                }
                case 'number': {
                  const value = itemTD.amount
                    ? Number(itemTR[key]) / 100
                    : Number(itemTR[key]);
                  const precision = itemTD.precision ? itemTD.precision : 2;
                  return (
                    <td nowrap={nowrap.toString()} key={`td-itemTD-${keyNum}`}>
                      {pres.set(
                        ssr ? 'en-EN' : window.navigator.language,
                        value,
                        Number(precision)
                      )}
                    </td>
                  );
                }
                case 'country':
                  return (
                    <td nowrap={nowrap.toString()} key={`td-itemTD-${keyNum}`}>
                      {countryFormat(itemTR[key])}
                    </td>
                  );
                default:
                  return null;
              }
            } else {
              return (
                <td nowrap={nowrap.toString()} key={`td-itemTR-${keyNum}`}>
                  {itemTR[key]}
                </td>
              );
            }
          }
        )}
      </tr>
    </Fragment>
  );
};
export default BodyTable;
