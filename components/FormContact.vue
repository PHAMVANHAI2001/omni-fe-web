<template>
  <div>
      <ValidationObserver ref="form">
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-lg-12">
          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="text"
                v-model="contactForm.name"
                class="form-control mt-2"
                placeholder="Tên"
                required
              />
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <input
                type="text"
                v-model="contactForm.email"
                class="form-control mt-2"
                placeholder="Email"
                required
              />
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="text"
                v-model="contactForm.subject"
                class="form-control mt-2"
                placeholder="Chủ đề"
                required
              />
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <ValidationProvider rules="required|min:30" v-slot="{ errors }">
              <textarea
                class="form-control"
                name="Nội dung liên hệ"
                v-model="contactForm.content"
                placeholder="Nội dung liên hệ..."
                rows="3"
                required
              ></textarea>
              <p class="error-message">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="col-12">
          <button :disabled="sending" class="btn btn-success" type="submit">GỬI LIÊN HỆ</button>
        </div>
      </div>
    </form>
  </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  data() {
    return {
      coupon: "",
      cart: null,
      sending: false,
      contactForm: {
        name: "",
        subject: "",
        email: "",
        content: ""
      }
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    onSubmit(e) {
      this.$refs.form
        .validate()
        .then(success => {
          if (success) {
            this.sendContact();
          } else {
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch(err => {
          // console.log("validate form err: ", err);
        });
    },

    sendContact() {
      this.sending = true;
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/postData", {
          param: `/v1/contact`,
          data: this.contactForm
        })
        .then(data => {
          this.sending = false;
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.$swal({
            title: "Gửi liên hệ thành công",
            text: "Yêu cầu của bạn đã được gửi đi",
            icon: "success",
            confirmButtonText: "Xác nhận"
          }).then(result => {
            this.$router.push("/");
            this.contactForm = {
                name: "",
                subject: "",
                email: "",
                content: ""
            }
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          });
        })
        .catch(err => {
          this.sending = false;
          this.$store.dispatch("app/showLoadingOverlay", false);
          // this.$toast
          //   .error("Có lỗi, không thể gửi, vui lòng thử lại sau")
          //   .goAway(1500);
          // console.log("Khong the gửi:", err);
        });
    }
  }
};
</script>

<style lang="scss">
#contatti {
  background-color: #ffffff;
  letter-spacing: 2px;
}
#contatti a {
  color: rgb(32, 26, 26);
  text-decoration: none;
}

@media (max-width: 575.98px) {
  #contatti {
    padding-bottom: 800px;
  }
  #contatti .maps iframe {
    width: 100%;
    height: 450px;
  }
}

@media (min-width: 576px) {
  #contatti {
    padding-bottom: 800px;
  }

  #contatti .maps iframe {
    width: 100%;
    height: 450px;
  }
}

@media (min-width: 768px) {
  #contatti {
    padding-bottom: 350px;
  }

  #contatti .maps iframe {
    width: 100%;
    height: 850px;
  }
}

@media (min-width: 992px) {
  #contatti {
    padding-bottom: 200px;
  }

  #contatti .maps iframe {
    width: 100%;
    height: 700px;
  }
}

#author a {
  color: rgb(110, 9, 9);
  text-decoration: none;
}
</style>
