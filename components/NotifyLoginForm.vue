<template>
  <div>
    <b-modal
      ref="notify-login-modal"
      id="notify-login-modal"
      hide-footer
      hide-header
    >
      <ValidationObserver ref="form">
        <form @submit.prevent="submit">
          <div class="form-header">
            <h3>Bạn cần đăng nhập để sử dụng tính năng này.</h3>
          </div>
          <button
            type="submit"
            block
            class="btn register-button btn-lg btn-block btn-danger"
          >
            ĐĂNG NHẬP
          </button>
        </form>
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
    };
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "app/showNotifyLoginForm") {
        setTimeout(() => {
          this.$refs["notify-login-modal"].show();
        }, 250);
      }
    });
  },
  methods: {
    closemodal() {
      this.$refs["notify-login-modal"].hide();
    },
    submit() {
      this.closemodal();
      this.$store.commit("user/showLoginModal");
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
