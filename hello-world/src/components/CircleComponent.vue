<template>
  <div class="circle">
    <input
      class="circle__radio"
      type="radio"
      :id="'color' + this.index"
      name="color"
      :value="color"
      :checked="checked"
    />
    <label
      class="circle__label"
      :for="'color' + this.index"
      :style="style"
      v-on:click="chooseCircle()"
    ></label>
  </div>
</template>

<script>
export default {
  name: "CircleComponent",
  data() {
    return {
      isChecked: this.checked,
    };
  },
  props: {
    color: String,
    index: Number,
    checked: Boolean,
  },
  computed: {
    style() {
      return { backgroundColor: this.color };
    },
  },
  methods: {
    chooseCircle() {
      this.$emit("chooseCircle", {
        color: this.color,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  &__radio {
    display: none;
    &:checked + .circle__label {
      width: 15px;
      height: 15px;
      margin: 1px 4px 1px;
    }
  }
  &__label {
    display: inline-block;
    width: 11px;
    height: 11px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    margin: 5px 8px 5px 5px;
    cursor: pointer;
    user-select: none;
  }
}
</style>