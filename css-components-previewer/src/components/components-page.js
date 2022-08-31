import {PreviewComponent} from './preview-component';
import {PlatformSelect} from './platform-select';
import {ThemeSelect} from './theme-select';

export const ComponentsPage = {
  props: ['components', 'categories', 'query'],
  template: `
    <div class="pv-content">
      <platform-select :platform="query.platform" />

      <h2 class="pv-content__header">Components</h2>

      <theme-select :theme="query.theme" :query="query" />

      <div class="pv-components">
        <css-component v-for="component in filterComponents" :component="component" :key="component.id" />
      </div>
    </div>
  `,
  data: () => ({
    themes: window.themes
  }),
  components: {
    'css-component': PreviewComponent,
    'platform-select': PlatformSelect,
    'theme-select': ThemeSelect
  },
  computed: {
    filterComponents() {
      const components = this.components;
      if (this.query.platform === 'android') {
        return components.filter(function(component) {
          return component.name.match(/Material/);
        });
      } else if (this.query.platform === 'ios') {
        return components.filter(function(component) {
          return !component.name.match(/Material/);
        });
      }
      return components;
    }
  },
  methods: {
    download(event) {
      const theme = this.$refs.themeSelect.value;
      if (!theme) {
        window.open('/onsen-css-components.css');
      } else {
        window.open(`${theme}.css`);
      }
      event.preventDefault();
    },
    changeTheme(event) {
      const theme = event.target.value;
      const suffix = this.query.platform ? `platform=${this.query.platform}` : '';

      if (theme === 'onsen-css-components') {
        if (suffix === '') {
          page.show('/');
        } else {
          page.show(`?${suffix}`);
        } 
      } else {
        page.show(`?theme=${theme}${suffix === '' ? '' : `&${suffix}`}`);
      }
    }
  }
};
