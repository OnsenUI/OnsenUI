<template>
  <ons-page>
    <div
      :style="{
        position: 'absolute',
        top: '50%',
        textAlign: 'center',
        width: '100%',
        fontSize: '30px',
        transform: 'translate3d(0, -50%, 0)'
      }"
    >
      Please wait...<br />
      {{ counter }}
    </div>
  </ons-page>
</template>

<script>
	export default {
    data() {
      return {
        counter: 5
      };
    },

    ready() {
      this.interval = setInterval(() => {
        this.counter = this.counter - 1;

        if (this.counter == 0) {
          clearInterval(this.interval);
          this.$pop();
        }
      }, 400);
    },

    beforeDestroy() {
      clearInterval(this.interval);
    }
	};
</script>
