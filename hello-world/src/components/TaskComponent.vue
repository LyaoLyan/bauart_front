
<template>
  <div class="task">
    <div class="task__flag">
      <input
        class="task__flag-checkbox"
        type="checkbox"
        id="scales"
        name="scales"
        :checked="task.flag"
        v-model="flag"
        @click="checked()"
      />
    </div>
    <div class="task__name">
      <input
        class="task__name-input"
        type="text"
        maxlength="100"
        v-model="task.taskName"
        :disabled="isDisable"
      />
    </div>
    <div class="task__buttons" v-show="isEdit">
      <div class="task__buttons-edit">
        <button class="task__buttons-edit-btn" v-on:click="editTask()">
          <img class="task__buttons-edit-img" src="../assets/edit.svg" />
        </button>
      </div>
      <div class="task__buttons-delete">
        <button class="task__buttons-delete-btn" v-on:click="delTask()">
          <img class="task__buttons-delete-img" src="../assets/del.svg" />
        </button>
      </div>
    </div>
    <div class="task__buttons" v-show="!isEdit">
      <div class="task__buttons-done">
        <!-- при нажатии на edit можно показать две кнопки - edit и not edit -->
        <button class="task__buttons-done-btn" v-on:click="editYes()">
          <img class="task__buttons-done-img" src="../assets/done.svg" />
        </button>
      </div>
      
    </div>
    <div class="task__tags">
      <tag-component
        v-for="tag in task.tags"
        :tag="tag"
        :key="tag.id"
        :isDisable="true"
      ></tag-component>
    </div>
  </div>
</template>

<script>
import TagComponent from "./TagComponent.vue";
export default {
  name: "TaskComponent",
  components: {
    TagComponent,
  },
  data() {
    return {
      flag: this.task.flag,
      isDisable: true,
      isEdit: true,
      
    };
  },
  props: {
    task: Object,
    index: Number,
  },
  computed: {
  },
  methods: {
    checked() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      this.$emit("checked", {
        flag: this.flag,
        taskID: this.index,
      });
    },
    delTask() {
      this.$emit("delTask", {
        delTask: this.index,
      });
    },
    editTask() {
      this.isDisable = false;
      this.isEdit = false;
    },
    editYes() {
      this.isDisable = true;
      this.isEdit = true;
      this.$emit("pushTask", {
        task: this.task,
        index: this.index,
      });
    },
    
  },
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  padding: 30px 0;
  border-bottom: 1px solid #e3e3e3;
  justify-content: space-between;
  &__buttons {
    display: flex;
    width: 20%;
    &-edit,
    &-delete,
    &-clear,
    &-done {
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
  @media screen and (max-width: 320px) {
    flex-direction: column;
    &__buttons {
      padding: 10px 0;
      &-edit,
      &-delete,
      &-clear,
      &-done {
        &-btn {
        }
        &-img {
          width: 12px;
          height: 12px;
          opacity: 0;
        }
      }
    }
  }
  &__flag {
    margin-right: 20px;
  }
  &__name {
    width: 100%;
    overflow-wrap: break-word;
    &-input {
      width: 90%;
      color: rgba(69, 69, 69, 1);
      border: none;
      background: none;
      cursor: auto;
      word-wrap: wrap;
      &:focus {
        cursor: text;
        background-color: white;
        outline: none;
      }
      &:enabled {
        background-color: white;
        border: 1px solid black;
      }
    }
  }
  &__tags {
    display: flex;
    min-width: 40%;
    flex-wrap: wrap;
  }
  &:hover {
    background-color: #f4f4f4;
    .task__buttons {
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
}
</style>
