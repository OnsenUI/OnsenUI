
export const ComponentPage = {
  props: ['components', 'id'],
  computed: {
    component() {
      return this.components.filter(component => component.id === this.id)[0];
    }
  },
  template: `
    <div class="content" v-if="component">
      <div>
        <h2 class="content__header">{{component.name}}</h2>

        <h3 class="title-label">Preview</h3>

        <div class="page component-example">
          <div v-html="component.markup"></div>
        </div>

        <h3 class="title-label">HTML</h3>

        <pre class="component-markup">{{component.markup}}</pre>
      </div>
    </div>
  `
};
