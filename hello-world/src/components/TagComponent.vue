<template>
  <div class="tag">
    <div class="tag__circle" :style="style"></div>
    <div class="tag__name">
      #<input
        v-model="tag.tagName"
        type="text"
        class="tag__name-input"
        :disabled="isDisable"
        :autofocus="isDisable"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "TagComponent",
  data() {
    return {
      tagName: "",
    };
  },
  props: {
    tag: {
      type: Object,
      required: true,
    },
    isDisable: Boolean,
  },
  computed: {
    style() {
      return { backgroundColor: this.tag.color };
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;

  &__circle {
    width: 11px;
    height: 11px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    margin: 0 3px;
  }
  &__name {
    color: rgba(41, 142, 212, 1);
    &-input {
      color: rgba(41, 142, 212, 1);
      border: none;
      background: none;
      cursor: auto;
      &:focus {
        cursor: text;
        background-color: white;
      }
      &:enabled {
        background-color: white;
        border: 1px solid black;
      }
      @media screen and(max-width: 700px) {
        font-size: 10px;
      }
    }
  }
}
</style>
