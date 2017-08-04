import {getPlatform, getPlatformFilter} from './platform';
import {ComponentView} from './components/component';

function init() {
  const components = makeComponents();
  const categories = makeCategories(components);

  page('*', () => {
    setTimeout(() => {
      app.platform = getPlatform();
    }, 0);
  });
  page();

  var app = new Vue({
    el: '#app',
    data: {
      components,
      categories,
      platform: getPlatform()
    },
    template: `
      <div>
        <div class="category-list">
          <div class="category-list__item">Category</div>
          <div v-for="category in categories" class="category-list__item">
            <a :href="'/categories/' + category.hash" class="category-list__item-link">{{category.name}}</a>
          </div>
        </div>

        <div class="platform-filter">
          <a href="?">All</a>
          <a href="?platform=ios">iOS</a>
          <a href="?platform=android">Android</a>
        </div>

        <h1 id="title">CSS Components for Onsen UI</h1>

        <div class="components">
          <component-view v-for="component in filterComponents()" :component="component" />
        </div>
      </div>
    `,
    components: {
      'component-view': ComponentView
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
};

function makeCategories(components) {
  const set = new Set();
  components.forEach(component => {
    set.add(component.category);
  });

  return [...set.values()].map(value => {
    return {
      name: value,
      hash: value.toLowerCase().replace(/ /g, '_')
    };
  });
}

function makeComponents() {
  return JSON.parse(document.querySelector('#components-data').textContent).map(component => {
    component = component.annotation;
    component.preview = true;
    return component;
  });
}

window.onload = init;

