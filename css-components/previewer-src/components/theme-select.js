
export const ThemeSelect = {
  props: ['query'],
  template: `
    <div class="pv-built-css">
      <select ref="themeSelect" class="pv-built-css__select" @change="changeTheme($event)">
        <option v-for="theme in themes" :value="theme">{{theme}}.css</option>
      </select>
      <button class="pv-built-css__button" @click="download($event)">Download</button>
    </div>
  `,
  data() {
    return {
      themes: window.themes
    };
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
          page.show(location.pathname);
        } else {
          page.show(`${location.pathname}?${suffix}`);
        } 
      } else {
        page.show(`${location.pathname}?theme=${theme}${suffix === '' ? '' : `&${suffix}`}`);
      }
    }
  }
};
