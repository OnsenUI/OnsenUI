<template>
  <div>
    <v-ons-page>
      <v-ons-list>
        <v-ons-list-item v-for="(example, key) in examples" :key="key" @click="changeExample(key)" modifier="chevron">
          <div class="center">{{ key }}</div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
  </div>
</template>

<script>

export default {
  name: 'MainList',
  props: ['examples', 'changeExample']
}

</script>
