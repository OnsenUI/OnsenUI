import {
  bootstrap,
  Component,
} from '../src/angular2-onsenui';

@Component({
  selector: 'app',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">Grid Example</div>
    </ons-toolbar>

    <div class="page__background"></div>
    <div class="page__content">

      <div style="padding: 10px">
        <h3>Equally spaced</h3>

        <ons-row>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
        </ons-row>

        <p></p>

        <ons-row>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
        </ons-row>

        <p></p>

        <ons-row>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
        </ons-row>

        <h3>Full height</h3>

        <ons-row>
          <ons-col>
            <div class="Demo">
              This column's height will grow to the same height as the tallest column.
            </div>
          </ons-col>

          <ons-col>
            <div class="Demo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu.
            </div>
          </ons-col>
        </ons-row>

        <h3>Individual Sizing</h3>

        <ons-row>
          <ons-col width="50%">Col width="50%"</ons-col>
          <ons-col>Col</ons-col>
          <ons-col>Col</ons-col>
        </ons-row>

        <p></p>
        <ons-row>
          <ons-col width="200px">
            <div class="Demo">Col width="200px"</div>
          </ons-col>
          <ons-col>
            <div class="Demo">Col</div>
          </ons-col>
        </ons-row>

        <p></p>
        <ons-row>
          <ons-col width="100px">
            <div class="Demo">100px</div>
          </ons-col>
          <ons-col width="50px">
            <div class="Demo">50px</div>
          </ons-col>
          <ons-col>
            <div class="Demo">Col</div>
          </ons-col>
        </ons-row>

        <p></p>
        <ons-row>
          <ons-col>
            <div class="Demo">Col</div>
          </ons-col>
          <ons-col width="33%">
            <div class="Demo">Col width="33%"</div>
          </ons-col>
        </ons-row>

        <p></p>
        <ons-row>
          <ons-col width="25%">
            <div class="Demo">Col width="25%"</div>
          </ons-col>
          <ons-col>
            <div class="Demo">Col</div>
          </ons-col>
          <ons-col width="33%">
            <div class="Demo">Col width="33%"</div>
          </ons-col>
        </ons-row>


        <h2>Alignment Features</h2>

        <h3>Top-aligned Grid Cells</h3>

        <ons-row align="top">
          <ons-col>
            <div class="Demo">
              This cell should be top-aligned.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              This cell should be top-aligned.
            </div>
          </ons-col>
        </ons-row>


        <h3>Bottom-aligned Grid Cells</h3>
        <ons-row align="bottom">
          <ons-col>
            <div class="Demo">
              This cell should be bottom-aligned.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              This cell should be bottom-aligned.
            </div>
          </ons-col>
        </ons-row>

        <h3>Vertically Centered Grid Cells</h3>

        <ons-row align="center">
          <ons-col>
            <div class="Demo">
              This cell should be vertically-centered with the cell to its right.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.</div>
          </ons-col>
        </ons-row>

        <h3>Mixed Vertical Alignment</h3>
        <ons-row>
          <ons-col align="top">
            <div class="Demo">
              This cell should be top aligned.
            </div>
          </ons-col>
          <ons-col>
            <div class="Demo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </ons-col>
          <ons-col align="center">
            <div class="Demo">
              This cell should be center-aligned.
            </div>
          </ons-col>
          <ons-col align="bottom">
            <div class="Demo">
              This cell should be bottom-aligned.
            </div>
          </ons-col>
        </ons-row>
      </div>

    </div>
  </ons-page>
  `
})
export class AppComponent {
  constructor() { }
}

bootstrap(AppComponent);
