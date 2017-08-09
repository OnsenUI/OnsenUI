import {getPlatform} from '../platform';
import {IndexPage} from './index-page';
import {ComponentPage} from './component-page';

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

      <my-router />
    </div>
  `,
    /*
  created() {
    page('*', (context, next) => {
      setTimeout(() => {
        app.platform = getPlatform();
      }, 0);
      next();
    });
  },*/
  components: {
    'my-router': createRouter()
  }
});

const routes = {
  '/': IndexPage,
  '/components/:id': ComponentPage
};

const createRouter = () => {
  return {
    data: () => {
      return {
        path: '/',
        params: {}
      };
    },
    computed: {
      currentView() {
        const page = routes[this.path];
        return page;
      }
    },
    created() {
      page('/components/:id', (context) => {
        this.path = '/components/:id';
        this.params = context.params;
      });

      page('/', () => {
        this.path = '/';
        this.params = {};
      });

      page();
    },
    render(h) {
      const props = {};
      for (let key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          props[key] = this.params[key];
        }
      }
      props.components = window.components;

      return h(this.currentView, {props});
    }
  };
};

