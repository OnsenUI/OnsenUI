<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">
        Forms
      </div>
    </ons-toolbar>

    <ons-list>
      <ons-list-header>Test input</ons-list-header>
      <ons-list-item>
        <div class="center">
          <ons-input
            placeholder="Input name"
            float
            :value="name"
            @input="onInput"
          >
          </ons-input>
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
        <div class="center">
          Switch ({{ switchOn ? 'on' : 'off' }})
        </div>
        <div class="right">
          <ons-switch
            @change="switchOn = $event.target.checked"
            :checked="switchOn"
          >
          </ons-switch>
        </div>
      </ons-list-item>
      <ons-list-item>
        <div class="center">
          Disabled switch
        </div>
        <div class="right">
          <ons-switch
            :disabled="!switchOn"
          >
          </ons-switch>
        </div>
      </ons-list-item>

      <ons-list-header>Radio buttons</ons-list-header>
      <ons-list-item
        v-for="vegetable in vegetables"
        tappable
      >
        <label class="left">
          <ons-input
            type="radio"
            input-id="radio-{{ $index }}"
            :checked="vegetables[$index] == selectedVegetable"
            @change="onVegetableChange($index)"
          >
          </ons-input>
        </label>
        <label for="radio-{{ $index }}" class="center">
          {{ vegetable }}
        </label>
      </ons-list-item>
      <ons-list-item>
        <div class="center">
          I love {{ selectedVegetable }}!
        </div>
      </ons-list-item>

      <ons-list-header>Checkboxes</ons-list-header>
      <ons-list-item
        v-for="color in colors"
      >
        <label class="left">
          <ons-input
            type="checkbox"
            input-id="checkbox-{{ $index }}"
          >
          </ons-input>
        </label>
        <label class="center" for="checkbox-{{ $index }}">
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
        colors: ['Red', 'Blue', 'Yellow', 'Green']
      };
    },

    methods: {
      onVegetableChange(index, event) {
        this.selectedVegetable = this.vegetables[index];
      },

      onInput(event) {
        this.name = event.target.value;
      }
    }
	};
</script>
