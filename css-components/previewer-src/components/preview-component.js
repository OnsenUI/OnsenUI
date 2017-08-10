
export const PreviewComponent = {
  props: ['component'],
  template: `
      <div class="component-preview">
        <a class="title-label" :href="'/components/' + component.id">{{component.name}}</a>

        <div class="page component-example">
          <div style="width: 100%;" v-html="component.markup"></div>
        </div>
      </div>
    `
};
