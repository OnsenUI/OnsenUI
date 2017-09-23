import {ComponentExample} from './preview-component.js';

export const ComponentPage = {
  props: ['components', 'id'],
  components: {
    'component-example': ComponentExample
  },
  computed: {
    component() {
      return this.components.filter(component => component.id === this.id)[0];
    }
  },
  template: `
    <div class="content" v-if="component">
      <div>
        <h2 class="content__header">{{component.name}}</h2>

        <h3 class="title-label">Example</h3>

        <component-example :component="component" />

        <h3 class="title-label">HTML</h3>

        <pre class="markup">{{component.markup}}</pre>
      </div>
    </div>
  `
};
