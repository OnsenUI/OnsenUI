import {getPlatform} from '../platform';
import {IndexPage} from './index-page';
import {ComponentPage} from './component-page';
import {CategoryPage} from './category-page';
import {getQueryParams, mergeQueryString, parseQueryString} from '../util';

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
        params: {platform: getPlatform()},
        query: getQueryParams()
      };
    },
    created() {
      // Load query string
      page('*', (context, next) => {
        requestAnimationFrame(() => {
          context.query = parseQueryString(location.search.slice(0));
          next();
        });
      });

      page('*', (context, next) => {
        document.body.scrollTop = document.body.scrollLeft = 0;

        // Load selected theme css.
        const theme = context.query.theme;
        if (typeof theme === 'string' && theme !== '') {
          document.querySelector('#theme-css').setAttribute('href', `/${theme}.css`);
        } else {
          document.querySelector('#theme-css').setAttribute('href', '/onsen-css-components.css');
        }

        next();
      });

      page('/components/:id', (context) => {
        this.component = ComponentPage;
        this.params = context.params;
        this.query = context.query;
      });

      page('/categories/:id', (context) => {
        this.component = CategoryPage;
        this.params = context.params;
        this.query = context.query;
      });

      page('/', (context) => {
        this.component = IndexPage;
        this.params = {platform: context.query.platform};
        this.query = context.query;
      });

      page('*', () => {
        page.redirect('/');
      });

      page({click: false});
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

      props.query = {};
      for (let key in this.query) {
        if (this.query.hasOwnProperty(key)) {
          props.query[key] = this.query[key];
        }
      }

      return h(this.component, {props});
    }
  };
};

document.body.addEventListener('click', e => {
  if (e.metaKey || e.ctrlKey || e.shiftKey) {
    return;
  }

  if (e.defaultPrevented) {
    return;
  }

  // ensure link
  let el = e.target;
  while (el && 'A' !== el.nodeName) {
    el = el.parentNode;
  }
  if (!el || 'A' !== el.nodeName) {
    return;
  }

  // ensure non-hash for the same path
  var link = el.getAttribute('href');
  if (el.pathname === location.pathname && (el.hash || '#' === link)) {
    return;
  }

  // Check for mailto: in the href
  if (link && link.indexOf('mailto:') > -1) {
    return;
  }

  // check target
  if (el.target) {
    return;
  }
  
  // rebuild path
  const path = el.pathname + mergeQueryString(el.search, location.search) + (el.hash || '');

  e.preventDefault();
  page.show(path);
});
