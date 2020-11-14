<template>
  <div class="navigation">
    <div class="navigation-container">
      <div class="navigation-secondary" :class="{ hide: !showSecondary }">
        <div class="navigation-interior">
          <NuxtLink v-for="link in secondaryLinks" :key="link.icon" :to="'/'">
            <NateIcons :icon="link.icon" :color="activeLinkColor(link.link)" />
          </NuxtLink>
        </div>
      </div>
      <div class="navigation-primary">
        <div class="navigation-interior">
          <NuxtLink
            v-for="nav in primaryNavigation"
            :key="nav.icon"
            :to="nav.link"
          >
            <NateIcons :icon="nav.icon" :color="activeLinkColor(nav.link)" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getStyle, rbgToHex, vStyleToHex } from "@/helpers";
import { isEmpty } from "lodash";
import NateIcons from "@/components/NateIcons.vue";

@Component({ components: { NateIcons } })
export default class Navigation extends Vue {
  primaryNavigation = [
    {
      icon: "house",
      link: "/cabin",
      secondaryLink: [],
    },
    {
      icon: "car",
      link: "/",
      secondaryLink: [],
    },
    {
      icon: "ski",
      link: "/resorts",
      secondaryLink: [{ icon: "solitude" }, { icon: "brighton" }],
    },
  ];

  activeLinkColor(name: string) {
    const isActive = this.$nuxt.$route.path === name;
    return !isActive ? "black" : `${vStyleToHex("--vs-primary")}`;
  }

  get activeLink() {
    return this.primaryNavigation.find(
      (nav) => nav.link === this.$nuxt.$route.path
    );
  }

  get secondaryLinks() {
    const active = this.primaryNavigation.find(
      (nav) => nav.link === this.$nuxt.$route.path
    );
    return active && active.secondaryLink;
  }

  get showSecondary() {
    return this.activeLink && !isEmpty(this.activeLink.secondaryLink);
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 94px;
$border-radius: 25px 25px 0px 0px;
$box-shadow: 0px -1px 5px #0000001f;

.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: black;

  &-container {
    position: relative;
  }

  &-primary {
    position: relative;
    height: $nav-height;
    background-color: #ffffff;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $box-shadow;
    z-index: 999;
  }

  &-secondary {
    transition: all 0.25s ease-out;
    position: absolute;
    bottom: 0;
    height: $nav-height;
    padding-bottom: $nav-height;
    width: 100%;
    background-color: #f5f5f5;
    z-index: 998;
    border-radius: $border-radius;
    box-shadow: $box-shadow;

    &.hide {
      padding-bottom: 0px;
    }
  }

  &-interior {
    padding: 0px 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
}
</style>
