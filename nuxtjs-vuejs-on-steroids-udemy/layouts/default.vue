<template>
  <div>
    <TheHeader @sidenavToggle="displaySideNav = !displaySideNav" />
    <TheSidenav :show="displaySideNav" @close="displaySideNav = false" />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
  middleware: "log",

  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySideNav: false
    };
  }
};
</script>
