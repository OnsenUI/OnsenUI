import React from 'react';
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
 * [jp][/jp]
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

    this.refs.lazyRepeat.delegate = {
      calculateItemHeight: function(index) {
        return props.calculateItemHeight(index);
      },
      _render: function(items, newHeight) {
        var createElement = function({index: index, top: top}) {
          return props.renderRow(index);
        };

        var el = items.map(createElement);
        self.setState({children: el, height: newHeight},
                      () => {
                        var list = this.refs.list;
                        // ignore i=0 <lazy repat
                        for (var i = 1; i < list.children.length; i++) {
                          list.children[i].style.position = 'absolute';
                          list.children[i].style.top = items[i - 1].top + 'px';
                          list.children[i].style.left = '0px';
                          list.children[i].style.right = '0px';
                        }
                      });
      }.bind(this),
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
      <ons-list {...this.props} ref='list'
        class='list' style={{position: 'relative', height: this.state.height}}
        >
        <ons-lazy-repeat ref='lazyRepeat' />
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
   *  [jp] [/jp]
   */
  modifier: React.PropTypes.string,

  /**
   * @name length
   * @type number
   * @description
   *  [en]The length of the list.[/en]
   *  [jp] [/jp]
   */
  length: React.PropTypes.number.isRequired,

  /**
   * @name renderRow
   * @type function
   * @description
   *  [en] A function given the index of the to display row, renders it.[/en]
   *  [jp] [/jp]
   */
  renderRow: React.PropTypes.func.isRequired,

  /**
   * @name calculateItemHeight
   * @type function
   * @description
   *  [en] A function given the index of the to row, returns the height of it.[/en]
   *  [jp] [/jp]
   */
  calculateItemHeight: React.PropTypes.func.isRequired
};

export default LazyList;
