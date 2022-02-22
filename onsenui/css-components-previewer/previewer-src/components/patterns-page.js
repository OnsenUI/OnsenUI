import {PlatformSelect} from './platform-select';
import {ThemeSelect} from './theme-select';

export const PatternsPage = {
  props: ['query'],
  template: `
    <div class="pv-content">
      <platform-select :platform="query.platform" />

      <h2 class="pv-content__header">Patterns</h2>

      <theme-select :query="query" />

      <div class="pv-patterns">
        <div class="pv-pattern" v-for="pattern in filterPatterns">
          <a class="pv-pattern__name pv-title-label" :href="'/patterns/' + pattern.id">{{pattern.name}}</a>
          <div class="pv-pattern__example"><div v-html="pattern.markup" style="position: static"></div></div>
        </div>
      </div>
    </div>
  `,
  data: () => ({
    patterns: []
  }),
  components: {
    'platform-select': PlatformSelect,
    'theme-select': ThemeSelect
  },
  created() {
    // Load patterns data.
    this.patterns = window.patterns;
  },
  computed: {
    filterPatterns() {
      const patterns = this.patterns;

      if (this.query.platform === 'android') {
        return patterns.filter(function(pattern) {
          return pattern.name.match(/Material/);
        });
      } else if (this.query.platform === 'ios') {
        return patterns.filter(function(pattern) {
          return !pattern.name.match(/Material/);
        });
      }
      return patterns;
    }
  },
};
