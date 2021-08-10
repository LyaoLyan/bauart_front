<template>
  <div class="container">
    <div class="header">
      <div class="create-task">
        <div class="create-task__text" :class="{ text_empty: empty }">
          <input v-model="task" type="text" placeholder="Name task" />
        </div>
        <div class="create-task__buttons">
          <div class="create-task__create">
            <button v-on:click="addTask()">
              <img src="../assets/done.svg" alt="" />
            </button>
          </div>
          <div class="create-task__delete">
            <button v-on:click="clearTask()">
              <img src="../assets/clear.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="login">
        <div class="login__username">{{ username }}</div>
        <div class="login__logout">
          <p class="login__logout-container" v-on:click="logout()">
            <router-link class="login__logout-button" tag="button" to=""
              ><img class="login__logout-img" src="../assets/exit.svg" alt="" />
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="tag">
      <div class="tag__buttons">
        <div>
          <div><button v-on:click="pickTag()">Pick tag</button></div>
          <div class="tag-pick" v-show="Boolean(this.opened)">
            <!-- как зареактивить изменение хэштегов везде -->
            <pick-tag-component
              v-for="tag in user.tags"
              :tag="tag"
              :key="tag.id"
              :choosen-tag="choosenTag"
              :opened="opened"
              @chooseTag="chooseTag"
              @deleteTag="deleteTag"
              @pushTag="pushTag"
              @cancelTag="cancelTag"
              @editTag="editTag"
            ></pick-tag-component>
          </div>
        </div>
        <div><button v-on:click="openModal()">Create tag</button></div>
        <div>
          <div class="modal__off" :class="{ modal__on: toCreate }">
            <create-tag-component
              @closeModal="closeModal"
              @createTag="createTag"
              :colors="colors"
              :tags="userTags"
            ></create-tag-component>
          </div>
        </div>
      </div>
    </div>
    <div class="tag__list">
      <tags-component
        v-for="tag in choosenTag"
        :tag="tag"
        :key="tag.id"
      ></tags-component>
    </div>
    <div class="task__container">
      <task-component
        class="task"
        v-for="(task, index) in user.tasks"
        :task="task"
        :key="index"
        :index="index"
        @delTask="delTask"
        @checked="checked"
        @pushTask="pushTask"
        @cancelTask="cancelTask"
      ></task-component>
    </div>
  </div>
</template>

<script>
import TagsComponent from "../components/TagsComponent.vue";
import PickTagComponent from "../components/PickTagComponent.vue";
import TaskComponent from "../components/TaskComponent.vue";
import CreateTagComponent from "../components/CreateTagComponent.vue";
export default {
  name: "container",
  components: {
    TagsComponent,
    PickTagComponent,
    TaskComponent,
    CreateTagComponent,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")),
      userTags: JSON.parse(localStorage.getItem("currentUser")).tags,
      userTasks: JSON.parse(localStorage.getItem("currentUser")).tasks,
      username: JSON.parse(localStorage.getItem("currentUser")).login,
      users: JSON.parse(localStorage.getItem("users")),
      opened: false,
      choosenTag: [],
      toCreate: false,
      task: "",
      text__empty: false,
      colors: JSON.parse(localStorage.getItem("colors")),
      isEdited: true,
    };
  },
  props: {},
  computed: {
    empty() {
      return !!this.text__empty;
    },
    allUsers() {
      return this.$store.getters.allUsers;
    },
    // currentUser() {
    //   return this.$store.getters.currentUser
    // },
    // tags() {
    //   return this.$store.getters.tags
    // },
    // tasks() {
    //   return this.$store.getters.userTasks
    // },
    // name() {
    //   return this.$store.getters.username
    // }
  },
  methods: {
    pushTask(data) {
      this.userTasks.splice(data.index, 1, data.task);
      this.user.tasks = this.userTasks;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    delTask(data) {
      this.userTasks.splice(data.delTask, 1);
      this.user.tasks = this.userTasks;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    addTask() {
      if (this.task) {
        this.text__empty = false;
        let obj = {
          taskName: this.task,
          tags: Object.values(this.choosenTag).map((i) => i),
          flag: false,
        };
        this.userTasks.push(obj);
        this.user.tasks = this.userTasks;
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        this.task = "";
        this.choosenTag = [];
      } else {
        this.text__empty = true;
      }
    },
    clearTask() {
      this.task = "";
      this.choosenTag = [];
    },
    cancelTask(data) {
      this.userTasks.splice(data.index, 1, data.task);
      this.user.tasks = this.userTasks;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    createTag(data) {
      this.userTags.push(data.tag);
      this.user.tags = this.userTags;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    editTag(data) {
      this.isEdited = data.isEdited;
    },
    cancelTag(data) {
      this.userTags.splice(data.tag.id, 1, data.tag);
      this.user.tags = this.userTags;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      this.isEdited = data.isEdited;
    },
    deleteTag(data) {
      function checkIndex(element) {
        return element.id == data.id;
      }
      this.userTags.splice(this.userTags.findIndex(checkIndex), 1);
      this.userTasks = this.userTasks.map(function (task) {
        if (task.tags[task.tags.findIndex(checkIndex)]) {
          task.tags.splice(task.tags.findIndex(checkIndex), 1);
          return task;
        }
        return task;
      });
      this.user.tasks = this.userTasks;
      this.user.tags = this.userTags;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    pushTag(data) {
      function checkIndex(element) {
        return element.id == data.tag.id;
      }
      this.userTags.splice(this.userTags.findIndex(checkIndex), 1, data.tag);
      this.userTasks = this.userTasks.map(function (task) {
        if (task.tags[task.tags.findIndex(checkIndex)]) {
          task.tags[task.tags.findIndex(checkIndex)] = data.tag;
          return task;
        }
        return task;
      });
      this.user.tasks = this.userTasks;
      this.user.tags = this.userTags;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      this.isEdited = data.isEdited;
    },
    chooseTag(data) {
      for (var i = 0; i < this.choosenTag.length; i++)
        if (this.choosenTag[i].id == data.id) {
          this.choosenTag.splice(i, 1);
          return false;
        }

      this.choosenTag.push(data);
    },
    closeModal() {
      this.toCreate = false;
    },
    checked(data) {
      this.user.tasks[data.taskID].flag = data.flag;
      localStorage.setItem("currentUser", JSON.stringify(this.user));
    },
    logout() {
      localStorage.setItem("firstLoadDone", false);
      this.users.splice(this.user.id, 1, this.user);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", "");
      this.$router.push({ path: "/" });
    },
    pickTag() {
      if (this.opened == true && this.isEdited == true) {
        this.opened = false;
      } else {
        this.opened = true;
      }
      this.isEdited == true;
    },
    openModal() {
      if (this.toCreate) {
        this.toCreate = false;
      } else {
        this.toCreate = true;
      }
    },
  },
  async mounted() {
    this.$store.dispatch("fetchUsers");
    // this.$store.dispatch("fetchUser");
    // this.$store.dispatch("fetchUsername");
    // this.$store.dispatch("fetchUserTags");
    // this.$store.dispatch("fetchUserTasks");
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__off {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
  }
  &__on {
    opacity: 1;
    pointer-events: auto;
  }
}
.text_empty {
  border: 2px red solid;
}
.container {
  margin: 50px;
  // min-width: 700px;
  @media screen and (max-width: 320px) {
    margin: 10px;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #efefef;
    width: 200px;
    height: 34px;
    border-radius: 5px;
    &__logout {
      border-left: 3px white solid;
      padding: 0px;
      border-radius: 5px;
      &-container {
        margin: 0px;
      }
      &-button {
        border: none;
        cursor: pointer;
      }
      &-img {
        width: 20px;
        height: 20px;
      }
    }
    &__username {
      padding: 0 20px;
      color: rgba(119, 119, 119, 1);
    }
    @media screen and(max-width: 800px) {
      width: 150px;
      height: 40px;
    }
    @media screen and(max-width: 700px) {
      width: 50px;
      height: 50px;
      &__username {
        font-size: 14px;
        display: none;
      }
      &__logout {
        border: none;
        &-img {
          margin: 0px;
          width: 40px;
          height: 40px;
        }
      }
    }
    @media screen and(max-width: 475px) {
      width: 30px;
      height: 30px;
      &__logout {
        &-img {
          width: 30px;
          height: 30px;
        }
      }
    }
    @media screen and(max-width: 320px) {
      width: 20px;
      height: 20px;
      &__logout {
        &-img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .create-task {
    display: flex;
    flex-direction: row;
    width: 45%;

    align-items: center;
    &__text {
      input {
        width: 500px;
        height: 34px;
        background: #fafafa;
        font-size: 18px;
        border: none;
        padding-left: 10px;

        &::placeholder {
          color: rgba(180, 180, 180, 1);
          font-size: 21px;
        }
        &:active {
          border: none;
        }
        &:focus {
          border: none;
          outline: none;
        }
        @media screen and (max-width: 900px) {
          width: 400px;
        }
        @media screen and (max-width: 800px) {
          width: 300px;
        }
        @media screen and (max-width: 700px) {
          width: 300px;
          height: 50px;
          font-size: 20px;
          &::placeholder {
            font-size: 20px;
          }
        }
        @media screen and (max-width: 600px) {
          width: 200px;
          height: 50px;
          font-size: 20px;
        }
        @media screen and (max-width: 475px) {
          width: 200px;
          height: 30px;
          font-size: 15px;
        }
        @media screen and (max-width: 320px) {
          width: 150px;
          height: 30px;
          font-size: 12px;
          &::placeholder {
            font-size: 12px;
          }
        }
      }
    }

    &__buttons {
      display: flex;
      width: 70px;
      align-items: center;
    }
    &__create,
    &__delete {
      button {
        font-size: 21px;
        width: 34px;
        height: 34px;
        background: none;
        border: none;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
        @media screen and (max-width: 700px) {
          width: 40px;
          height: 40px;
          img {
            width: 30px;
            height: 30px;
          }
        }
        @media screen and (max-width: 475px) {
          width: 30px;
          height: 30px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        // @media screen and (max-width: 320px) {
        //   width: 20px;
        //   height: 20px;
        //   img {
        //     width: 30px;
        //     height: 30px;
        //   }
        // }
      }
    }
  }
}
.tag {
  display: flex;
  flex-direction: column;
  &__list {
    padding: 10px 0 10px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e3e3e3;
  }
  &__buttons {
    display: flex;
    margin-top: 10px;
    button {
      margin-right: 10px;
      background: #fafafa;
      border: none;
      height: 34px;
      cursor: pointer;
      @media screen and (max-width: 320px) {
        font-size: 10px;
      }
    }
  }
  &-pick {
    position: absolute;
  }
  &-create {
    position: fixed;
    width: 100px;
    height: 100px;
    margin: auto 0;
  }
}
</style>
