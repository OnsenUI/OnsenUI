import {
  Component,
  ViewChild,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

@Component({
  selector: 'app-list',
  template: `
  <ons-page>
    <ons-toolbar>
      <div class="center">List</div>
    </ons-toolbar>
    <div class="background"></div>
    <div class="content">
      <ons-list-title>List Title</ons-list-title>
      <ons-list>
        <ons-list-header>
          Normal List Items
        </ons-list-header>

        <ons-list-item>
          <div class="center">
            Two
          </div>
          <div class="right">
            label
          </div>
        </ons-list-item>
      </ons-list>

      <ons-list-title>Expandable List Items</ons-list-title>
      <ons-list>
        <ons-list-item expandable>
          Tap to expand
          <div class="expandable-content">
            I have been expanded!
          </div>
        </ons-list-item>
        <ons-list-item expandable tappable>
          Tap to expand (tappable)
          <div class="expandable-content">
            I have also been expanded!
          </div>
        </ons-list-item>
        <ons-list-item expandable>
          Expandable with custom icon
          <div class="right">...</div>
          <div class="expandable-content">
            How do you like the icon?
          </div>
        </ons-list-item>
      </ons-list>
    </div>
  </ons-page>
  `
})
export class ListComponent {
}

@NgModule({
  imports: [OnsenModule],
  exports: [ListComponent],
  declarations: [ListComponent],
  bootstrap: [ListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListModule { }

