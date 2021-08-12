<template>
  <div class="container__tag" :class="{ container__tag_active: isActive }">
    <div v-on:click="chooseTag">
      <tag-component :tag="tag" :isDisable="isDisable" />
    </div>
    <div class="tag__buttons" v-show="isEdit">
      <div class="tag__buttons-edit">
        <button class="tag__buttons-edit-btn" v-on:click="editTag()">
          <img class="tag__buttons-edit-img" src="../assets/edit.svg" />
        </button>
      </div>
      <div class="tag__buttons-delete">
        <button class="tag__buttons-delete-btn" v-on:click="delTag()">
          <img class="tag__buttons-delete-img" src="../assets/del.svg" />
        </button>
      </div>
    </div>
    <div class="tag__buttons" v-show="!isEdit">
      <div class="tag__buttons-done">
        <button class="tag__buttons-done-btn" v-on:click="editYes()">
          <img class="tag__buttons-done-img" src="../assets/done.svg" />
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import TagComponent from "./TagComponent.vue";
export default {
  components: { TagComponent },
  name: "PicktagComponent",
  data() {
    return {
      isDisable: true,
      col: this.tag.color,
      isEdit: true,
      isEdited: true
    };
  },
  props: {
    tag: Object,
    choosenTag: Array,
  },
  async mounted() {
    
  
  },
  computed: {
    isActive() {
      return !!this.choosenTag.find((item) => item.id === this.tag.id);
    },
  },
  methods: {
    editTag() {
      this.isDisable = false;
      this.isEdit = false;
      this.isEdited = false;
      this.$emit("editTag", {
        isEdited: this.isEdited,
      });
    },
    editYes() {
      this.isDisable = true;
      this.isEdited = true;
      this.$emit("pushTag", {
        tag: this.tag,
        isEdited: this.isEdited,
      });
      this.isEdit = true;
    },
    delTag() {
      this.$emit("deleteTag", {
        id: this.tag.id,
      });
    },
    chooseTag() {
      this.$emit("chooseTag", {
        color: this.col,
        id: this.tag.id,
        tagName: this.tag.tagName,
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.container__tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fafafa;
  width: 300px;
  margin: 0px;
  padding: 10px;
  &:hover {
    background-color: rgba(244, 244, 244, 1);
    .tag__buttons {
      &-edit,
      &-delete,
      &-clear,
      &-done {
        &-img {
          opacity: 1;
        }
      }
    }
  }
  &_active {
    background: rgba(244, 244, 244, 1);
  }
}
.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &__buttons {
    display: flex;
    flex-direction: right;
    &-edit,
    &-delete,
    &-clear,
    &-done {
      padding-right: 10px;
      &-btn {
        border: none;
        background: none;
        cursor: pointer;
      }
      &-img {
        width: 17px;
        height: 17px;
        opacity: 0;
      }
    }
  }
}
</style>
