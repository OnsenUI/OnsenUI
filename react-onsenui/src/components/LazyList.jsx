import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-lazy-repeat';

import List from './List';

/**
 * @original ons-lazy-repeat
 * @category list
 * @tutorial react/Reference/lazy-list
 * @description
 * [en] Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 [/en]
 * [ja][/ja]
 * @example
 *
  renderRow(index) {
    return (
      <ListItem key={index}>
        {'Item ' + (index + 1)}
      </ListItem>
    );
  }

  render() {
    return (
      <Page renderToolbar={() => <MyToolbar title='LazyList' />} >
        <div style={{height: 100}}>
          <LazyList
            length={1000}
            renderRow={() =>
              <ListItem key={index}>
                {'Item ' + (index + 1)}
              </ListItem>
            }
            calculateItemHeight={() => 44}
          />
        </div>
      </Page>
    );
  }
}
 */
const LazyList = React.forwardRef((props, forwardedRef) => {
  const ref = forwardedRef || useRef();
  const [children, setChildren] = useState([]);
  const [, setUpdateTop] = useState();

  const {calculateItemHeight, renderRow, length, ...rest} = props;

  useEffect(() => {
    ref.current.delegate = {
      calculateItemHeight: function(index) {
        return calculateItemHeight(index);
      },
      _render: function(start, limit, updateTop) {
        const el = [];
        for (let i = start; i < limit; i++) {
          el.push(renderRow(i));
        }
        setChildren(el);
        setUpdateTop(updateTop); // doesn't work without this, but why? does it just trigger a rerender?
      },
      countItems: function() {
        return length;
      }
    };
  }, [calculateItemHeight, renderRow, length]);

  return (
    <List
      {...rest}
      style={{position: 'relative'}}
    >
      <ons-lazy-repeat ref={ref} />
      {children}
    </List>
  );
});

LazyList.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the lazy list.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name length
   * @type number
   * @description
   *  [en]The length of the list.[/en]
   *  [ja][/ja]
   */
  length: PropTypes.number.isRequired,

  /**
   * @name renderRow
   * @type function
   * @description
   *  [en] A function given the index of the to display row, renders it.[/en]
   *  [ja][/ja]
   */
  renderRow: PropTypes.func.isRequired,

  /**
   * @name calculateItemHeight
   * @type function
   * @description
   *  [en] A function given the index of the to row, returns the height of it.[/en]
   *  [ja][/ja]
   */
  calculateItemHeight: PropTypes.func.isRequired
};

export default LazyList;
