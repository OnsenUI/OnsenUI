import {PreviewComponent} from './preview-component';
import {ThemeSelect} from './theme-select';

export const CategoryPage = {
  props: ['components', 'categories', 'id', 'query'],
  template: `
    <div class="pv-content">

      <h2 class="pv-content__header">{{category.name}} Components</h2>

      <theme-select :theme="query.theme" :query="query" />

      <div class="pv-components">
        <css-component v-for="component in filterComponents()" :component="component" :key="component.id" />
      </div>
    </div>
  `,
  components: {
    'css-component': PreviewComponent,
    'theme-select': ThemeSelect
  },
  computed: {
    category() {
      return this.categories.filter(category => category.hash === this.id)[0];
    }
  },
  methods: {
    filterComponents() {
      const category = this.category;
      const components = this.components.filter(component => {
        return component.category === category.name;
      });
      return components;
    },
  }
};
