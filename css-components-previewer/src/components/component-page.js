import {ComponentExample} from './preview-component.js';
import {ThemeSelect} from './theme-select';

export const ComponentPage = {
  props: ['components', 'id', 'query'],
  components: {
    'component-example': ComponentExample,
    'theme-select': ThemeSelect
  },
  computed: {
    component() {
      return this.components.filter(component => component.id === this.id)[0];
    }
  },
  template: `
    <div class="pv-content" v-if="component">
      <div>
        <h2 class="pv-content__header">{{component.name}}</h2>

        <theme-select :theme="query.theme" :query="query" />

        <h3 class="pv-title-label">Example</h3>

        <component-example :component="component" />

        <h3 class="pv-title-label">HTML</h3>

        <pre class="pv-markup">{{component.markup}}</pre>
      </div>
    </div>
  `
};
