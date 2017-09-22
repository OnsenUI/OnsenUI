import {PreviewComponent} from './preview-component';

export const IndexPage = {
  props: ['components', 'platform', 'categories', 'query'],
  template: `
    <div class="content">
      <div class="platform-filter">
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform !== 'ios' && this.platform !== 'android'}" href="?platform=all">All</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'ios'}"  href="?platform=ios">iOS</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'android'}"  href="?platform=android">Android</a>
      </div>

      <h2 class="content__header">All Components</h2>

      <div class="built-css">
        <select ref="themeSelect" class="built-css__select" @change="changeTheme($event)">
          <option v-for="theme in themes" :value="theme">{{theme}}.css</option>
        </select>
        <button class="built-css__button" @click="download($event)">Download</button>
      </div>

      <div class="components">
        <css-component v-for="component in filterComponents()" :component="component" :key="component.id" />
      </div>
    </div>
  `,
  data: () => ({
    themes: window.themes
  }),
  components: {
    'css-component': PreviewComponent
  },
  mounted() {
    if (this.query.theme) {
      this.$refs.themeSelect.value = this.query.theme;
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
    },
    filterComponents() {
      const components = this.components;
      if (this.platform === 'android') {
        return components.filter(function(component) {
          return component.name.match(/Material/);
        });
      } else if (this.platform === 'ios') {
        return components.filter(function(component) {
          return !component.name.match(/Material/);
        });
      }
      return components;
    }
  }
};
