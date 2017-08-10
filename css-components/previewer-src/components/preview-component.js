
export const ComponentExample = {
  props: ['component'],
  template: `
      <div class="page component-example" :class="{'page--material__background': isAndroid()}">
        <div style="width: 100%;" v-html="component.markup"></div>
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
      <div class="component-preview">
        <a class="title-label" :href="'/components/' + component.id">{{component.name}}</a>

        <component-example :component="component" />
      </div>
    `,
  components: {
    'component-example': ComponentExample
  }
};

