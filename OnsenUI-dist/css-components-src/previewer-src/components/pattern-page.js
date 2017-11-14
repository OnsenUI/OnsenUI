import {ThemeSelect} from './theme-select';

export const PatternPage = {
  props: ['id', 'query'],
  data() {
    const pattern = window.patterns.filter(pattern => {
      return pattern.id == this.id;
    })[0];

    return {pattern};
  },
  components: {
    'theme-select': ThemeSelect
  },
  template: `
    <div class="pv-content">
      <div v-if="pattern">
        <h2 class="pv-content__header">{{pattern.name}} Pattern</h2>

        <theme-select :theme="query.theme" :query="query" />

        <h3 class="pv-title-label">Example</h3>
        <div>
          <div class="pv-pattern__example"><div style="position: static" v-html="pattern.markup"></div></div>
        </div>

        <h3 class="pv-title-label">HTML</h3>

        <pre class="pv-markup">{{pattern.markup}}</pre>
      </div>
    </div>
  `,
};
