<template>
  <div>
    <b-modal
      v-model="modalShow"
      ref="select-login-modal"
      id="select-login-modal"
      hide-footer
      hide-header
    >
      <ValidationObserver ref="form">
          <button
            type="submit"
            block
            @click="showModalLogin()"
            class="btn register-button btn-lg btn-block btn-primary"
          >
            Đăng nhập
          </button>
          <button
            type="submit"
            block
            @click="showModalLogin(1)"
            class="btn register-button btn-lg btn-block btn-danger"
          >
            Đăng ký thành viên
          </button>
          <!-- <button
            type="submit"
            block
            @click="ridirectToRegister"
            class="btn register-button btn-lg btn-block btn-primary"
          >
            Đăng ký đại lý cá nhân
          </button> -->
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      errors: [],
      modalShow: false,
    };
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showSelectLoginModal") {
        this.modalShow = true;
      }
    });
  },
  methods: {
    showModalLogin(type) {
      this.modalShow = false;
      this.$store.commit("user/showLoginModal", type);
    },
    ridirectToRegister() {
      this.$router.push("/register-agent");
      this.modalShow = false;
    },
  },
};
</script>

<style lang="scss">


.select-old .custom-radio {
  margin: 9px 10px 0 0;
}
.form-check {
  label {
    color: #5f5f5f;
  }
}


.md-style-group {
  display: flex;
  align-items: center;
}

.btn-sms {
  font-size: 12px;
  color: white;
  background-color: #c92332;
  font-weight: bold;
  border: none;
  outline: none;
  height: 40px;
}
</style>
