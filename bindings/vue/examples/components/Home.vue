<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">Home</div>
    </ons-toolbar>

    <ons-list>
      <ons-list-header>
        Components
      </ons-list-header>
      <ons-list-item
        v-for="(component, label) in components"
        tappable
        @click="$push({component: component})">
        <div class="center">
          {{ label }}
        </div>
      </ons-list-item>
    </ons-list>
  </ons-page>
</template>

<script>
	export default {
    data() {
      return {
        components: {
          'pull-hook': 'Pull to refresh',
          'splitter': 'Side menu',
          'fab': 'Floating action button',
          'speed-dial': 'Speed dial'
        }
      };
    }
	};
</script>
