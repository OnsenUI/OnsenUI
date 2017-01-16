<template>
  <ons-page>
    <ons-list>
      <ons-list-header>Test input</ons-list-header>
      <ons-list-item>
        <div class="center">
          <v-ons-input
            placeholder="Input name"
            float
            v-model="name"
          >
          </v-ons-input>
        </div>
      </ons-list-item>
      <ons-list-item>
        <div class="center">
          Hello {{ name }}!
        </div>
      </ons-list-item>

      <ons-list-header>
        Switches
      </ons-list-header>
      <ons-list-item>
        <label class="center" for="switch1">
          Switch ({{ switchOn ? 'on' : 'off' }})
        </label>
        <div class="right">
          <v-ons-switch
            v-model="switchOn"
            input-id="switch1"
          >
          </v-ons-switch>
        </div>
      </ons-list-item>
      <ons-list-item>
        <div class="center">
          Disabled switch
        </div>
        <div class="right">
          <v-ons-switch
            :disabled="!switchOn"
          >
          </v-ons-switch>
        </div>
      </ons-list-item>

      <ons-list-header>Radio buttons</ons-list-header>
      <ons-list-item
        v-for="(vegetable, $index) in vegetables"
        tappable
      >
        <label class="left">
          <v-ons-input
            type="radio"
            :input-id="'radio-' + $index"
            :value="vegetable"
            v-model="selectedVegetable"
          >
          </v-ons-input>
        </label>
        <label :for="'radio-' + $index" class="center">
          {{ vegetable }}
        </label>
      </ons-list-item>
      <ons-list-item>
        <div class="center">
          I love {{ selectedVegetable }}!
        </div>
      </ons-list-item>

      <ons-list-header>Checkboxes - {{checkedColors}}</ons-list-header>
      <ons-list-item
        v-for="(color, $index) in colors"
      >
        <label class="left">
          <v-ons-input
            type="checkbox"
            :input-id="'checkbox-' + $index"
            :value="color"
            v-model="checkedColors"
          >
          </v-ons-input>
        </label>
        <label class="center" :for="'checkbox-' + $index">
          {{ color }}
        </label>
      </ons-list-item>
    </ons-list>
  </ons-page>
</template>

<script>
	export default {
    data() {
      return {
        name: 'Andreas',
        switchOn: true,
        vegetables: ['Tomato', 'Cabbage', 'Cucumber'],
        selectedVegetable: 'Cabbage',
        colors: ['Red', 'Blue', 'Yellow', 'Green'],
        checkedColors: []
      };
    },

    methods: {
      log: function(event) {
        console.log('qweqwe', event);
      }
    }
	};
</script>
