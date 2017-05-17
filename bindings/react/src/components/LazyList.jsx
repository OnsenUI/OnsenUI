import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from './BasicComponent.jsx';

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
class LazyList extends BasicComponent {
  constructor(...args) {
    super(...args);
    this.state = {children: []};
    this.update = this.update.bind(this);
  }

  update(props) {
    var self = this;

    this._lazyRepeat.delegate = {
      calculateItemHeight: function(index) {
        return props.calculateItemHeight(index);
      },
      // _render: function(items, newHeight) {
      _render: function(start, limit, updateTop) {
        var createElement = function(index) {
          return props.renderRow(index);
        };

        const el = [];
        for (let i = start; i < limit; i++) {
          el.push(createElement(i));
        }

        self.setState({children: el}, updateTop);
      },
      countItems: function() {
        return props.length;
      }
    };
  }

  componentWillReceiveProps(newProps) {
    var helpProps = {
      ...this.props,
      ...newProps
    };
    this.update(helpProps);
  }

  componentDidMount() {
    super.componentDidMount();
    this.update(this.props);
  }

  render() {
    return (
      <ons-list {...this.props} ref={(list) => { this._list = list; }}
        class='list' style={{position: 'relative', height: this.state.height}}
        >
        <ons-lazy-repeat ref={(lazyRepeat) => { this._lazyRepeat = lazyRepeat; }} />
        {this.state.children}
       </ons-list>
    );
  }
}

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
