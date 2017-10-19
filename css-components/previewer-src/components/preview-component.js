
export const ComponentExample = {
  props: ['component'],
  template: `
      <div class="page pv-component-example" :class="{'page--material__background': isAndroid()}">
        <!-- ontouchstart is a hack to enable :active CSS selector in iOS browsers. -->
        <div style="width: 100%;" v-html="component.markup" ontouchstart=""></div>
      </div>
    `,
  methods: {
    isAndroid() {
      return this.component.name.match(/Material/);
    }
  }
};

export const PreviewComponent = {
  props: ['component'],
  template: `
      <div class="pv-component-preview">
        <a class="pv-title-label" :href="'/components/' + component.id">{{component.name}}</a>

        <component-example :component="component" />
      </div>
    `,
  components: {
    'component-example': ComponentExample
  }
};

