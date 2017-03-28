<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>
        Test input - <button @click="modify('input')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input
            placeholder="Input name"
            float
            v-ons-model="name"
          >
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          Hello {{ name }}!
        </div>
      </v-ons-list-item>

      <v-ons-list-header>
        Switches - <button @click="modify('switch')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item>
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
      </v-ons-list-item>
      <v-ons-list-item>
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
      </v-ons-list-item>

      <v-ons-list-header>
        Select box - <button @click="modify('select')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item>
        <v-ons-select id="choose-sel" v-ons-model="selectedModifier" @change="editSelects">
          <option v-for="modifier in modifiers" :key="modifier" v-bind:value="modifier.value">
            {{ modifier.text }}
          </option>
        </v-ons-select>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          Modifier {{ selectedModifier }} looks great!
        </div>
      </v-ons-list-item>

      <v-ons-list-header>
        Radio buttons - <button @click="modify('radio')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item
        v-for="(vegetable, $index) in vegetables"
        :key="vegetable"
        tappable
      >
        <label class="left">
          <v-ons-input
            type="radio"
            :input-id="'radio-' + $index"
            :value="vegetable"
            v-ons-model="selectedVegetable"
          >
          </v-ons-input>
        </label>
        <label :for="'radio-' + $index" class="center">
          {{ vegetable }}
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          I love {{ selectedVegetable }}!
        </div>
      </v-ons-list-item>

      <v-ons-list-header>
        Checkboxes - {{checkedColors}} - <button @click="modify('checkbox')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item
        v-for="(color, $index) in colors"
        :key="color"
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
      </v-ons-list-item>

      <v-ons-list-header>
        Range - <button @click="modify('range')">Modify JS</button>
      </v-ons-list-header>
      <v-ons-list-item>
        Adjust the volume:
        <v-ons-row>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon icon="md-volume-down"></v-ons-icon>
          </v-ons-col>
          <v-ons-col>
            <v-ons-range v-ons-model.number="volume" style="width: 100%;"></v-ons-range>
          </v-ons-col>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon icon="md-volume-up"></v-ons-icon>
          </v-ons-col>
        </v-ons-row>
        Volume: {{ volume }} <span v-show="volume > 80">&nbsp;(careful, that's loud)</span>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        modifier: 'quiet',
        name: 'Andreas',
        modifiers: [
          { text: 'Basic', value: 'basic' },
          { text: 'Material', value: 'material' },
          { text: 'Underbar', value: 'underbar' }
        ],
        selectedModifier: 'material',
        switchOn: true,
        vegetables: ['Tomato', 'Cabbage', 'Cucumber'],
        selectedVegetable: 'Cabbage',
        colors: ['Red', 'Blue', 'Yellow', 'Green'],
        checkedColors: ['Blue', 'Yellow'],
        volume: 25
      };
    },

    methods: {
      modify(type) {
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
          case 'select':
            this.selectedModifier = 'underbar';
            break;
        }
      },

      editSelects(event) {
        document.getElementById('choose-sel').removeAttribute('modifier');
        if (event.target.value == 'material' || event.target.value == 'underbar') {
          document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
        }
      }
    }
	};
</script>
