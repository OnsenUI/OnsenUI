import React from 'react';

import {
  Page,
  Row,
  Col
} from 'react-onsenui';

import MyToolbar from './MyToolbar';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifier: 'material'
    };
  }

  toggleModifier() {
    this.setState({
      modifier: this.state.modifier === 'material' ? '' : 'material'
    });
  }

  render() {
    return (
      <Page
        renderToolbar={() => <MyToolbar title='Grid' />}
        >
        <h3>Bottom-aligned Grid Cells</h3>
        <Row >
          <Col>
            <div className='Demo'>
              This cell should be bottom-aligned.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do euismod tempor incididunt ut larbore et dolore magna aliqua.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              This cell should be bottom-aligned.
            </div>
          </Col>
        </Row>


        <h3>Vertically Centered Grid Cells</h3>
        <Row >
          <Col>
            <div className='Demo'>
              This cell should be verticaly-centered with the cell to its right.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do euismod tempor incididunt ut larbore et dolore magna aliqua.
            </div>
          </Col>
        </Row>

        <h3>Equally spaced</h3>
        <Row>
          <Col>Col</Col>
          <Col>Col</Col>
        </Row>
        <p></p>
        <Row>
          <Col>Col</Col>
          <Col>Col</Col>
          <Col>Col</Col>
        </Row>
        <p></p>
        <Row>
          <Col>Col</Col>
          <Col>Col</Col>
          <Col>Col</Col>
          <Col>Col</Col>
        </Row>

        <h3>Full height</h3>
        <Row>
          <Col>
            <div className='Demo'>
              This column's height will grow to the same height as the tallest column.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu.
            </div>
          </Col>
        </Row>

        <h3>Individual Sizing</h3>
        <Row>
          <Col width='160px'>Col width='160px'</Col>
          <Col>Col</Col>
          <Col>Col</Col>
        </Row>
        <p></p>
        <Row>
          <Col>
            <div className='Demo'>Col</div>
          </Col>
          <Col width='33%'>
            <div className='Demo'>Col width='33%'</div>
          </Col>
        </Row>
        <p></p>
        <Row>
          <Col width='25%'>
            <div className='Demo'>Col width='25%'</div>
          </Col>
          <Col>
            <div className='Demo'>Col</div>
          </Col>
          <Col width='33%'>
            <div className='Demo'>Col width='33%'</div>
          </Col>
        </Row>
        <p></p>
        <Row>
          <Col width={100}>
            <div className='Demo'>Col width='100px'</div>
          </Col>
          <Col>
            <div className='Demo'>Col</div>
          </Col>
          <Col width={50}>
            <div className='Demo'>Col width='50px'</div>
          </Col>
        </Row>

        <h3>Top-aligned Grid Cells</h3>
        <Row >
          <Col>
            <div className='Demo'>
              This cell should be top-aligned.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do euismod tempor incididunt ut larbore et dolore magna aliqua.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              This cell should be top-aligned.
            </div>
          </Col>
        </Row>

        <h3>Mixed Vertical Alignment</h3>
        <Row>
          <Col >
            <div className='Demo'>
              This cell should be top aligned.
            </div>
          </Col>
          <Col>
            <div className='Demo'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do euismod tempor incididunt ut larbore et dolore magna aliqua.
            </div>
          </Col>
          <Col >
            <div className='Demo'>
              This cell should be center-aligned.
            </div>
          </Col>
          <Col >
            <div className='Demo'>
              This cell should be bottom-aligned.
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}
