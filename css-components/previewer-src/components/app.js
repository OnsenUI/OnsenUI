export const createAppComponent = ({components, categories, platform}) => ({
  el: '#app',
  data: {
    components,
    categories,
    platform
  },
  template: `
    <div>
      <div class="side-navi">
        <a class="side-navi__title" href="/">
          Onsen<br />
          CSS<br />
          Components
        </a>

        <div class="category-list">
          <div class="category-list__header">Categories</div>
          <div v-for="category in categories" class="category-list__item">
            <a :href="'/categories/' + category.hash" class="category-list__item-link">{{category.name}}</a>
          </div>
        </div>
      </div>


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
    </div>
  `,
  components: {
    'css-component': PreviewComponent
  },
  methods: {
    filterComponents() {
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
});

const PreviewComponent = {
  props: ['component'],
  template: `
      <div class="component-preview">
        <a class="component-preview__title" :href="'/components/' + component.id">{{component.name}}</a>

        <div class="page component-preview__example">
          <div style="width: 100%;" v-html="component.markup"></div>
        </div>
      </div>
    `
};
