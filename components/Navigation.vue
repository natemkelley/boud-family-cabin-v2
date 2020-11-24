<template>
  <div class="navigation">
    <div class="navigation-container">
      <div class="navigation-secondary" :class="{ hide: !showSecondary }">
        <div class="navigation-interior">
          <NuxtLink
            v-for="secondary in secondaryLinks"
            :key="secondary.icon"
            :to="secondary.link"
          >
            <NateIcons
              :icon="secondary.icon"
              :color="activeSecondaryColor(secondary.link)"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="navigation-primary">
        <div class="navigation-interior">
          <NuxtLink
            v-for="nav in primaryNavigation"
            :key="nav.icon"
            :to="nav.link"
            class="navigation-link"
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
      link: "/driving",
      secondaryLink: [],
    },
    /* {
      icon: "ski",
      link: "/resorts",
      secondaryLink: [
        { icon: "solitude", link: "/resorts/solitude" },
        { icon: "brighton", link: "/resorts/brighton" },
      ],
    },*/
  ];

  activeLinkColor(name: string) {
    const isActive = this.activeLink?.link.includes(name);
    return !isActive ? "black" : `${vStyleToHex("--vs-primary")}`;
  }

  activeSecondaryColor(name: string) {
    const isActive = name.includes(this.$nuxt.$route.path);
    return !isActive ? "black" : `${vStyleToHex("--vs-primary")}`;
  }

  get activeLink() {
    return this.primaryNavigation.find(
      (nav) => nav.link === this.$nuxt.$route.matched[0].path
    );
  }

  get secondaryLinks() {
    return this.activeLink && this.activeLink.secondaryLink;
  }

  get showSecondary() {
    return this.activeLink && !isEmpty(this.activeLink.secondaryLink);
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 63px;
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
    z-index: 99;
  }

  &-secondary {
    transition: all 0.25s ease-out;
    position: absolute;
    bottom: 0;
    height: $nav-height;
    padding-bottom: $nav-height;
    width: 100%;
    background-color: #f5f5f5;
    z-index: 98;
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

  &-link {
    transition: 200ms ease;
    &:hover {
      transform: scale(0.85);
    }
  }
}
</style>
