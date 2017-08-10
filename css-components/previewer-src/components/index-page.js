
const PreviewComponent = {
  props: ['component'],
  template: `
      <div class="component-preview">
        <a class="title-label" :href="'/components/' + component.id">{{component.name}}</a>

        <div class="page component-example">
          <div style="width: 100%;" v-html="component.markup"></div>
        </div>
      </div>
    `
};

export const IndexPage = {
  props: ['components', 'platform'],
  components: {
    'css-component': PreviewComponent
  },
  template: `
    <div class="content">
      <div class="platform-filter">
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform !== 'ios' && this.platform !== 'android'}" href="?">All</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'ios'}"  href="?platform=ios">iOS</a>
        <a class="platform-filter__link" :class="{'platform-filter__link--active': this.platform === 'android'}"  href="?platform=android">Android</a>
      </div>

      <h2 class="content__header">All Components</h2>

      <div class="components">
        <css-component v-for="component in filterComponents()" :component="component" :key="component.id" />
      </div>
    </div>
  `,
  methods: {
    filterComponents() {
      console.log('filter', this.components);
      var components = this.components;
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
