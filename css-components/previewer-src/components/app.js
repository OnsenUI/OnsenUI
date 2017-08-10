import {getPlatform} from '../platform';
import {IndexPage} from './index-page';
import {ComponentPage} from './component-page';
import {CategoryPage} from './category-page';

export const createAppComponent = ({components, categories}) => ({
  el: '#app',
  data: {
    components,
    categories
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

      <my-router :base-params="createParams()" />
    </div>
  `,
  components: {
    'my-router': createRouter()
  },
  methods: {
    createParams() {
      const params = {};

      params.components = [].concat(this.components);
      params.categories = [].concat(this.categories);

      return params;
    }
  }
});

const createRouter = () => {
  return {
    props: ['baseParams'],
    data: () => {
      return {
        component: IndexPage,
        params: {platform: getPlatform()}
      };
    },
    created() {
      page('/components/:id', (context) => {
        this.component = ComponentPage;
        this.params = context.params;
      });

      page('/categories/:id', (context) => {
        this.component = CategoryPage;
        this.params = context.params;
      });

      page('/', () => {
        setTimeout(() => {
          this.component = IndexPage;
          this.params = {platform: getPlatform()};
        }, 0);
      });

      page('*', () => {
        page.redirect('/');
      });

      page();
    },
    render(h) {
      const props = {};

      if (this.baseParams) {
        for (let key in this.baseParams) {
          if (this.baseParams.hasOwnProperty(key)) {
            props[key] = this.baseParams[key];
          }
        }
      }

      for (let key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          props[key] = this.params[key];
        }
      }

      return h(this.component, {props});
    }
  };
};

