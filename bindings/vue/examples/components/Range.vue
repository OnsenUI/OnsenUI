<template>
  <v-ons-page>
    <p>Adjust the volume:</p>
    <p>
      <ons-row>
        <ons-col width="40px" style="text-align: center; line-height: 31px;">
          <ons-icon icon="md-volume-down"></ons-icon>
        </ons-col>
        <ons-col>
          <v-ons-range @input="onInput($event)" v-model.number="volume" style="width: 100%;"></v-ons-range>
        </ons-col>
        <ons-col width="40px" style="text-align: center; line-height: 31px;">
          <ons-icon icon="md-volume-up"></ons-icon>
        </ons-col>
      </ons-row>
    </p>
    <p>Volume: {{ volume }} <span id="loud-alert" style="display: none">(careful, that's loud)</span></p>
  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        volume: 50
      };
    },

    methods: {
      onInput(volume) {
        const elem = document.getElementById("loud-alert");
        if (volume > 80) {
          elem.style.display = "inline-block";
        }
        else {
          elem.style.display = "none";
        }
      }
    }
	};
</script>