<template>
  <div class="tag">
    <tag-component :tag="tag" :isDisable="true" />
  </div>
</template>

<script>
import TagComponent from "./TagComponent.vue";
export default {
  name: "TagsComponent",
  components: { TagComponent },
  data() {
    return {
      col: this.tag.color,
    };
  },
  props: {
    tag: Object,
  },
  mounted: function () {},
  computed: {
    dynamicStyle() {
      return `${this.color};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__circle {
    width: 11px;
    height: 11px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    margin: 0 3px;
  }
  @media screen and(max-width: 700px) {
      font-size: 10px;
    }
}
</style>
