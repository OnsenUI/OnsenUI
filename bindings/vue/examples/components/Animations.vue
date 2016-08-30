<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">
        Animations
      </div>
    </ons-toolbar>

    <ons-list>
      <ons-list-item
        tappable
        @click="$push({
          component: 'animations-child',
          animation: animation
        })"
        v-for="animation in animations"
      >
        <div class="center">
          {{ animation | capitalize }}
        </div>
      </ons-list-item>
    </ons-list>
  </ons-page>
</template>

<script>
	export default {
    data() {
      return {
        animations: ['none', 'fade', 'slide', 'lift']
      };
    }
	};
</script>
