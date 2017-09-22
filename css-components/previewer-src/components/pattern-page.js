
export const PatternPage = {
  props: ['id', 'query'],
  data() {
    const pattern = window.patterns.filter(pattern => {
      return pattern.id == this.id;
    })[0];

    return {pattern};
  },
  template: `
    <div class="content">
      <div v-if="pattern">
        <h2 class="content__header">{{pattern.name}} Pattern</h2>

        <h3 class="title-label">Example</h3>
        <div>
          <div class="pattern__example"><div style="position: static" v-html="pattern.markup"></div></div>
        </div>
      </div>
    </div>
  `,
};
