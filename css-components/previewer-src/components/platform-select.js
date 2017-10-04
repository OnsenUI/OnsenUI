
export const PlatformSelect = {
  props: ['platform'],
  template: `
    <div class="pv-platform-select">
      <a class="pv-platform-select__link" 
        :class="{'pv-platform-select__link--active': this.platform !== 'ios' && this.platform !== 'android'}"
        :href="getLocation() + '?platform=all'">All</a>

      <a class="pv-platform-select__link" 
        :class="{'pv-platform-select__link--active': this.platform === 'ios'}"
        :href="getLocation() + '?platform=ios'">iOS</a>

      <a class="pv-platform-select__link"
        :class="{'pv-platform-select__link--active': this.platform === 'android'}"
        :href="getLocation() + '?platform=android'">Android</a>

    </div>
  `,
  methods: {
    getLocation() {
      return location.pathname;
    }
  }
};
