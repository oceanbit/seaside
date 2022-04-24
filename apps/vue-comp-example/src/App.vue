<template>
  <sea-switch :enabled="enabled" @toggle="setEnabled(!enabled)" />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      enabled: false,
    };
  },
  methods: {
    setEnabled(val) {
      this.enabled = val;
    },
  },
};
</script>

<style></style>
