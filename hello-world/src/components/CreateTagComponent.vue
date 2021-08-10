<template>
  <div class="container-create-tag">
    <div class="header">Create new tag</div>
    <div class="body">
      <div class="tag__name">
        <div class="tag__name-title">Name</div>
        <div class="tag__name-container">
          <input type="text" class="tag__name-input" v-model="tagName" />
        </div>
      </div>
      <div class="tag__color">
        <div class="tag__color-title">Color</div>
        <div class="tag__color-colors">
          <div class="tag__color-colors-show" :class="{ 'showAll': show }">
            <!-- <input type="radio" id="contactChoice1"
     name="circle" :value> -->
            <!-- задействовать радиобаттоны для выбора цвета -->
            <circle-component
              v-for="(color, index) in colors"
              :key="index"
              :index="index"
              :color="color"
              :checked="checked"
              @chooseCircle="chooseCircle"
            ></circle-component>

            <button class="tag__color-show-button" v-on:click="showMore()">
              <img
                class="tag__color-show-img"
                src="../assets/showMore.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <div class="tag__buttons">
        <button class="tag__buttons-close" v-on:click="closeModal()">
          Cancel
        </button>
        <button class="tag__buttons-create" v-on:click="createModal()">
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CircleComponent from "./CircleComponent.vue";
export default {
  name: "CreateTagComponent",
  components: {
    CircleComponent,
  },
  data() {
    return {
      show: false,
      tagName: "",
      newTag: {},
      newColor: "",
      checked: true,
    };
  },
  props: {
    colors: Array,
    tags: Array,
  },
  methods: {
    closeModal() {
      this.tagName = "";
      this.checked = false;
      this.show = false;
      this.$emit("closeModal");
    },
    createModal() {
      let idNewTag;
      if (this.tags.length !=0) {
        idNewTag = this.tags[this.tags.length - 1].id + 1;
      } else {
        idNewTag = 0;
      }
      this.newTag = {
        id: idNewTag,
        tagName: this.tagName,
        color: this.newColor,
      };
      this.$emit("createTag", {
        tag: this.newTag,
      });
      this.tagName = "";
      this.checked = false;
      this.$emit("closeModal");
    },
    showMore() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    chooseCircle(data) {
      this.newColor = data.color;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-create-tag {
  width: 300px;
  background-color: #fafafa;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  .header {
    padding: 15px 20px;
    border-bottom: 1px solid #e3e3e3;
    color: rgba(114, 114, 114, 1);
  }
  .body {
    .tag {
      &__buttons {
        display: flex;
        justify-content: space-around;
        padding: 15px 20px;
        &-close,
        &-create {
          cursor: pointer;
          background-color: rgba(245, 245, 245, 1);
          border: none;
          width: 110px;
          height: 34px;
        }
      }
      &__name {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        &-title {
          color: rgba(180, 180, 180, 1);
        }
        &-container {
          padding: 0 10px;
        }
        &-input {
          width: 200px;
          border: rgba(227, 227, 227, 1) 1px solid;
          background: none;
          height: 20px;
          &:focus {
            outline: rgba(227, 227, 227, 1) 2px solid;
          }
        }
      }
      &__color {
        display: flex;
        align-items: flex-start;
        padding: 15px 20px;

        &-show {
          &-img {
            margin: 5px 8px 5px;
          }
          &-button {
            border: none;
            padding: 0px;
            background: none;
            cursor: pointer;
          }
        }
        &-title {
          color: rgba(41, 142, 212, 1);
        }
        &-colors {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          padding: 0 10px;
          margin-right: -10px;
          &-show {
            display: flex;
            flex-wrap: wrap;

            &:not(.showAll) .circle {
              &:nth-child(n + 7) {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
