/* @flow */
import React, { Fragment } from 'react';
import SortFunc from './../Sort';

type Props = {
  // queryParams: Object,
  // handleSetFilterData: () => void,
  itemTR: Array<Object>,
  contentTable: Array<{}>,
  handleSetState: (item: string, value: string) => void,
  name: string,
  index: number
};

export const HeaderTable = (props: Props): Fragment => {
  const {
    itemTR,
    name,
    index,
    handleSetState,
    contentTable
    // queryParams,
    // handleSetFilterData
  } = props;

  return (
    <Fragment>
      <tr key={`tr-${name}-${index}`}>
        {itemTR.map(
          (itemTH: Object): any => (
            <th
              rowSpan={itemTH.group ? itemTH.rowspan : 0}
              colSpan={itemTH.group ? itemTH.colspan : 0}
              key={`th-${itemTH.localIndex}`}
            >
              {itemTH.displayName}
              {itemTH.sortable ? (
                <SortFunc
                  handleSetState={handleSetState}
                  path={itemTH.path}
                  type={itemTH.type}
                  field={itemTH.field}
                  contentTable={contentTable}
                />
              ) : (
                ''
              )}
              {/* {itemTH.displayName === 'STATUS' ? (
              <FormControl
                data={itemTH.displayName.toLowerCase()}
                componentClass="select"
                placeholder="select"
                onChange={handleSetFilterData}
              >
                <option value={null} />
                <option value="new">new</option>
                <option value="charged">charged</option>
                <option value="rejected">rejected</option>
                <option value="fraud">fraud</option>
                <option value="declined">declined</option>
                <option value="error">error</option>
              </FormControl>
            ) : null}

            {itemTH.type === 'date' ? (
              <FormControl
                data={itemTH.displayName.toLowerCase()}
                type="date"
                value={queryParams[itemTH.displayName.toLowerCase()]}
                onChange={handleSetFilterData}
              />
            ) : null}

            {itemTH.type === 'string' && itemTH.displayName !== 'STATUS' ? (
              <FormControl
                data={itemTH.displayName.toLowerCase()}
                type="text"
                value={queryParams[itemTH.displayName.toLowerCase()]}
                onChange={handleSetFilterData}
              />
            ) : null}

            {itemTH.type === 'number' ? (
              <FormControl
                data={itemTH.displayName.toLowerCase()}
                type="text"
                value={queryParams[itemTH.displayName.toLowerCase()]}
                onChange={handleSetFilterData}
              />
            ) : null} */}
            </th>
          )
        )}
      </tr>
    </Fragment>
  );
};
export default HeaderTable;
