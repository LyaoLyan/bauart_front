<template>
  <div id="app" class="row">
    <div class="reg">
      <div class="reg__title">Регистрация</div>
      <div>
        <form novalidate>
          <div class="reg__form">
            <div>
              <input
                type="login"
                size="40"
                placeholder="Логин"
                v-model="regUsername"
              />
            </div>
            <div>
              <input
                type="password"
                size="40"
                placeholder="Пароль"
                v-model="regPassword"
              />
            </div>
            <div>
              <input
                type="password"
                size="40"
                placeholder="Повторите пароль"
                v-model="regRepeatPassword"
              />
            </div>
            <p @click="checkRegister()">
              <router-link tag="button" to="">Отправить</router-link>
            </p>
            <div v-show="flag">Данные введены не верно!</div>
          </div>
        </form>
      </div>
    </div>
    <div class="border"></div>
    <div class="auth">
      <div class="auth__title">Авторизация</div>
      <div>
        <form novalidate>
          <div class="auth__form">
            <div>
              <input
                type="login"
                size="40"
                placeholder="Логин"
                v-model="username"
              />
            </div>
            <div>
              <input
                type="password"
                size="40"
                placeholder="Пароль"
                v-model="password"
              />
            </div>
            <div class="non-visible"><input type="text" size="40" /></div>
            <div>
              <!-- <input type="button" class="submit" value="Войти" /> -->
              <p @click="checkUser(username, password)">
                <router-link tag="button" to="">Войти</router-link>
              </p>
              <div v-if="f">Данные введены не верно!</div>
              <!-- <router-link tag="button" v-on:click="checkUser()">Войти</router-link> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "app",
  data() {
    return {
      path: "",
      flag: false,
      f: false,
      regUsername: "",
      regPassword: "",
      regRepeatPassword: "",

      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getUser"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    ...mapMutations(["addUsers", "setUser"]),
    checkUser(n, p) {
      let i = 0;
      // console.log(this.getUsers);
      this.getUsers.forEach((element) => {
        if (element.login == n && element.password == p) {
          this.setUser(this.getUsers[i]);
          //localStorage.setItem("currentUser", JSON.stringify(this.users[i]));
          console.log(this.getUsers);
          this.$router.push({ path: "container" });
        } else {
          this.f = true;
        }
        i++;
      });
    },
    checkRegister() {
      this.getUsers.forEach((element) => {
        if (
          element.login == this.regUsername ||
          this.regPassword == "" ||
          this.regUsername == "" ||
          this.regPassword != this.regRepeatPassword
        ) {
          this.flag = true;
        } else {
          let newUser = {
            login: this.regUsername,
            password: this.regPassword,
            tags: [],
            tasks: [],
          };
          this.addUsers(newUser);

          // localStorage.setItem("users", JSON.stringify(this.users));

          this.checkUser(this.regUsername, this.regPassword);
        }
      });
    },
  },
  created: function () {
    // this.users = JSON.parse(localStorage.getItem("users"));
  },
  async mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
.border {
  width: 1px;
  height: calc(100vh-10px);

  background: rgba(76, 77, 84, 1);
  opacity: 0.1;
}
.row {
  display: flex;
  flex-direction: row;
  .reg {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: calc(100vh-10px);
    margin-top: 10%;
    &__title {
      text-transform: uppercase;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
      color: #454545;
    }
  }
  .reg,
  .auth {
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 30px;
        input {
          width: 345px;
          height: 50px;
          font-size: 20px;
          text-align: center;
          &::placeholder {
            color: #b4b4b4;
          }
          background: #ffffff;
          border: 1px solid #e3e3e3;
          box-sizing: border-box;
          box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25),
            inset -1px -1px 1px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
  button.router-link-exact-active.router-link-active {
    width: 345px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    &::placeholder {
      color: #b4b4b4;
    }
    background: #ffffff;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25),
      inset -1px -1px 1px rgba(0, 0, 0, 0.25);
    background: linear-gradient(0deg, #cf120c, #cf120c);
    color: white;
  }
  .auth {
    width: 50%;
    margin-top: 10%;
    height: calc(100vh-10px);
    &__title {
      text-transform: uppercase;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
      color: #454545;
    }
  }
}
.non-visible {
  visibility: hidden;
}
</style>