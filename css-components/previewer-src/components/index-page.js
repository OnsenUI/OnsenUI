import {PreviewComponent} from './preview-component';

export const IndexPage = {
  props: ['components', 'platform'],
  template: `
    <div class="content">
      <div class="platform-filter">
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform !== 'ios' && this.platform !== 'android'}" href="?">All</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'ios'}"  href="?platform=ios">iOS</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'android'}"  href="?platform=android">Android</a>
      </div>

      <h2 class="content__header">All Components</h2>

      <div class="build-css">
        <span class="build-css__file">onsen-css-components.css</span>
        <a class="build-css__button" href="/onsen-css-components.css" @click="download()">Download</a>
      </div>

      <div class="components">
        <css-component v-for="component in filterComponents()" :component="component" :key="component.id" />
      </div>
    </div>
  `,
  components: {
    'css-component': PreviewComponent
  },
  methods: {
    download() {
      window.open('/onsen-css-components.css');
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
