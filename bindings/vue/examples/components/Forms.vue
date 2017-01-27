<template>
  <v-ons-page>
    <ons-list>
      <ons-list-header>
        Test input - <button @click="modify('input')">Modify JS</button>
      </ons-list-header>
      <ons-list-item>
        <div class="center">
          <v-ons-input
            placeholder="Input name"
            float
            v-ons-model="name"
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
        Switches - <button @click="modify('switch')">Modify JS</button>
      </ons-list-header>
      <ons-list-item>
        <label class="center" for="switch1">
          Switch ({{ switchOn ? 'on' : 'off' }})
        </label>
        <div class="right">
          <v-ons-switch
            v-ons-model="switchOn"
            input-id="switch1"
          >
          </v-ons-switch>
        </div>
      </ons-list-item>
      <ons-list-item>
        <label class="center" for="switch2">
          {{ switchOn ? 'Enabled switch' : 'Disabled switch' }}
        </label>
        <div class="right">
          <v-ons-switch
            :disabled="!switchOn"
            input-id="switch2"
          >
          </v-ons-switch>
        </div>
      </ons-list-item>

      <ons-list-header>
        Radio buttons - <button @click="modify('radio')">Modify JS</button>
      </ons-list-header>
      <ons-list-item
        v-for="(vegetable, $index) in vegetables"
        tappable
      >
        <label class="left">
          <v-ons-input
            type="radio"
            :input-id="'radio-' + $index"
            :value="vegetable"
            v-ons-model=" selectedVegetable"
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

      <ons-list-header>
        Checkboxes - {{checkedColors}} - <button @click="modify('checkbox')">Modify JS</button>
      </ons-list-header>
      <ons-list-item
        v-for="(color, $index) in colors"
      >
        <label class="left">
          <v-ons-input
            type="checkbox"
            :input-id="'checkbox-' + $index"
            :value="color"
            v-ons-model="checkedColors"
          >
          </v-ons-input>
        </label>
        <label class="center" :for="'checkbox-' + $index">
          {{ color }}
        </label>
      </ons-list-item>

      <ons-list-header>
        Range - <button @click="modify('range')">Modify JS</button>
      </ons-list-header>
      <ons-list-item>
        Adjust the volume:
        <ons-row>
          <ons-col width="40px" style="text-align: center; line-height: 31px;">
            <ons-icon icon="md-volume-down"></ons-icon>
          </ons-col>
          <ons-col>
            <v-ons-range v-ons-model.number="volume" style="width: 100%;"></v-ons-range>
          </ons-col>
          <ons-col width="40px" style="text-align: center; line-height: 31px;">
            <ons-icon icon="md-volume-up"></ons-icon>
          </ons-col>
        </ons-row>
        Volume: {{ volume }} <span v-show="volume > 80">&nbsp;(careful, that's loud)</span>
      </ons-list-item>
    </ons-list>
  </v-ons-page>
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
        checkedColors: ['Blue', 'Yellow'],
        volume: 25
      };
    },

    methods: {
      modify: function(type) {
        switch (type) {
          case 'input':
            this.name += ' Rambo';
            break;
          case 'switch':
            this.switchOn = !this.switchOn;
            break;
          case 'radio':
            this.selectedVegetable = 'Tomato';
            break;
          case 'checkbox':
            this.checkedColors = ['Blue', 'Red'];
            break;
          case 'range':
            this.volume = (this.volume + 20) % 100;
            break;
        }
      }
    }
	};
</script>
