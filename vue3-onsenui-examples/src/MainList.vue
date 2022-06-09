<template>
  <div>
    <v-ons-page>
      <v-ons-list>
        <v-ons-list-item v-for="example in examples" :key="example" @click="$emit('changeExample', example)" modifier="chevron">
          <div class="center">{{ example }}</div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
  </div>
</template>

<script>

export default {
  name: 'MainList',
  props: ['examples']
}

</script>
