<template>
  <v-ons-page>
    <v-ons-list-header>Tappable Items</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item tappable>Tappable</v-ons-list-item>
      <v-ons-list-item modifier="chevron" tappable>Tappable with Chevron</v-ons-list-item>
    </v-ons-list>

    <v-ons-list-header>Dividers</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item>Normal divider</v-ons-list-item>
      <v-ons-list-item modifier="nodivider">No divider</v-ons-list-item>
      <v-ons-list-item modifier="longdivider">Long divider</v-ons-list-item>
      <v-ons-list-item>Normal divider</v-ons-list-item>
    </v-ons-list>

    <v-ons-list-header>Expandable</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item expandable>
        Tap to expand
        <div class="expandable-content">
          I have been expanded!
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>