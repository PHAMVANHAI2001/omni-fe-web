<template>
  <main role="main">
    <div class="heading-page-blog">
      <div class="container">
        <div class="page-title">Quên mật khẩu</div>
      </div>
    </div>
    <div class="container">
      <div class="justify-content-center row section">
        <div class="col-md-5 ">
          <ValidationObserver ref="form">
            <form @submit.prevent="submit">
              <div class="form-header">
                <h3>Khôi phục mật khẩu?</h3>
                <p class="mb-3">
                  Vui lòng cung cấp số điện thoại để lấy lại mật khẩu.
                </p>
              </div>
              <ValidationProvider rules="required|phone" v-slot="{ errors }">
                <div class="form-field">
                  <input
                    type="text"
                    placeholder=" "
                    v-md-style
                    autocomplete="off"
                    v-model.trim="form.phone"
                    id="txtfullname"
                    class="form-input phone"
                  />
                   <span for="txtfullname" class="form-labels">Nhập số điện thoại</span>
                  <!-- <label for="txtfullname">Nhập số điện thoại</label> -->
                </div>
                <p class="error-message">{{ errors[0] }}</p>
              </ValidationProvider>
              <div class="btn-checkout mb-20">
              <button
                type="submit"
                block
                class="btn register-button btn-lg btn-block btn-danger"
              >
                GỬI
              </button>
             </div>
              <div class="btn-checkout">
                    <b-button
                      type="button"
                      block
                      @click="goBack"
                      variant="outline-primary"
                      >QUAY LẠI</b-button
                    >
                  </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  data() {
    return {
      form: {
        email: null,
        phone: null,
        password: null,
      },
      isShowPass: 1,
      request_code: null,
    };
  },
  components: { ValidationProvider, ValidationObserver },
  head: {
    title: "Quên mât khẩu",
  },
  methods: {
    requestCode(valid) {
      if (valid) {
        this.$store.dispatch("app/showLoadingOverlay", true);
        this.$store
          .dispatch("app/postDataNoHeader", {
            param: `/reset_password/send`,
            data: {
              email: this.email,
            },
          })
          .then((data) => {
            // //console.log("resp:", data);
            this.$store.dispatch("app/showLoadingOverlay", false);
            if (!data.error) {
              this.$swal({
                title: "Gửi yêu cầu thành công",
                icon: "success",
                text:
                  "Chúng tôi đã gửi mật khẩu mới đến email của bạn, hãy kiểm tra email",
                confirmButtonText: "Xác nhận",
              }).then((result) => {
                this.request_code = true;
              });
            } else if (data.error) {
              this.$toast.error(data.error).goAway(2500);
            }
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            // this.$toast.error("Có lỗi, vui lòng thử lại").goAway(1500);
          });
      } else {
        this.$toast.error("Vui lòng nhập chính xác địa chỉ email").goAway(2500);
      }
    },
     goBack() {
      window.history.back();
    },
    showPass() {
      this.isShowPass = !this.isShowPass;
    },
    handleSubmit() {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            this.$store
              .dispatch("app/putDataNoHeader", {
                param: `/reset_password/confirm`,
                data: {
                  email: this.email,
                  code: this.code,
                  password: this.password,
                  password_confirm: this.password,
                },
              })
              .then((data) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                if (!data.error) {
                  this.$swal({
                    title: "Đổi mật khẩu thành công",
                    icon: "success",
                    text:
                      "Mật khẩu của bạn đã đổi thành công, hãy đăng nhập vào hệ thống",
                    confirmButtonText: "Xác nhận",
                  }).then((result) => {
                    this.$router.push("/login");
                    this.form_state = "";
                    this.$nextTick(() => {
                      this.$refs.form.reset();
                    });
                  });
                } else {
                  this.$toast.error(data.error).goAway(2500);
                }
              })
              .catch((err) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                // this.$toast.error("Emal không tồn tại").goAway(1500);
              });
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
          }
        })
        .catch((err) => {
          // //console.log("validate not oke");
        });
    },
  },
};
</script>

<style lang="scss"></style>
