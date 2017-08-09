
export const ComponentPage = {
  props: ['components', 'id'],
  computed: {
    component() {
      return this.components.filter(component => component.id === this.id)[0];
    }
  },
  template: `
    <div class="content" v-if="component">
      <h2 class="content__header">{{component.name}}</h2>

      <div class="component-preview__title">Preview</div>

      <div class="page component-preview__example">
        <div style="width: 200px;" v-html="component.markup"></div>
      </div>

      <pre class="component-preview__code">{{component.markup}}</pre>
    </div>
  `
};
