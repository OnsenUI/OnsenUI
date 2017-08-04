
export const ComponentView = {
  props: ['component'],
  template: `
      <div class="component-preview">
        <button class="component-preview__toggle" @click="component.preview = !component.preview">HTML</button>

        <h2 class="component-preview__title">{{component.name}}</h2>

        <div class="page component-preview__example" v-if="component.preview">
          <div style="width: 100%;" v-html="component.markup"></div>
        </div>

        <pre class="component-preview__markup" v-if="!component.preview">{{component.markup}}</pre>
      </div>
    `
};
