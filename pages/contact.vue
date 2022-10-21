<template>
  <main role="main">
    <div class="breadcrumb-top no-margin">
      <div class="container">
        <div aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/">Trang chủ</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Liên hệ</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="map-contact">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.662531649223!2d106.6991221!3d10.760232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdb9850606055f4ea!2zTnV0aUZvb2QgLSBHaeG6o2kgUGjDoXAgRGluaCBExrDhu6FuZyBD4bunYSBDaHV5w6puIEdpYQ!5e0!3m2!1svi!2s!4v1622799155161!5m2!1svi!2s"
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
    <div class="container" id="contatti">
      <div class="session">
        <div class="row">
          <div class="col-md-6">
            <h2 class="text-uppercase mt-3 font-weight-bold">Liên hệ</h2>

            <FormContact></FormContact>
          </div>
          <div class="col-md-6">
            <div class="section-contact">
              <div class="content">
                <br /><br />
                <strong>
                  <span style="font-size:32px;"
                    >CTY CỔ PHẦN THỰC PHẨM DINH DƯỠNG NUTIFOOD</span
                  > </strong
                ><br /><br />
                <strong>Địa chỉ:</strong> 281-283 Hoàng Diệu, Phường 6, Quận 4,
                TP. Hồ Chí Minh
                <br />
                <strong>Điện thoại:</strong> (84-8) 38 267 999
                <strong>Fax:</strong> (84-8) 39 435 949 <br />
                <strong>Email:</strong> Nutifood@nutifood.com.vn<br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <div class="section-contact">
              <div class="content">
                <strong>
                  <span style="font-size:32px;"
                    >NHÀ MÁY SẢN XUẤT - NUTIFOOD BÌNH DƯƠNG</span
                  > </strong
                ><br /><br />
                <strong>Địa chỉ:</strong> Đường D1, Lô E3_E4, KCN Mỹ Phước I,
                Bến Cát, Bình Dương
                <br />
                <strong>Điện thoại:</strong> (84-650) 3 567 420
                <strong>Fax:</strong> (84-650) 3 567 190 <br />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31319.54217587582!2d106.59475657654765!3d11.11764020426287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cc6ee3988cd9%3A0x282b3c6389521e87!2zQ8O0bmcgVHkgQ-G7lSBQaOG6p24gdGjhu7FjIHBo4bqpbSBkaW5oIGTGsOG7oW5nIE51dGlmb29kIELDrG5oIETGsMahbmcu!5e0!3m2!1svi!2s!4v1622799327918!5m2!1svi!2s"
                  width="100%"
                  height="200"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="section-contact">
              <div class="content">
                <strong>
                  <span style="font-size:32px;"
                    >NHÀ MÁY SẢN XUẤT - NUTIFOOD CAO NGUYÊN</span
                  > </strong
                ><br /><br />
                <strong>Địa chỉ:</strong> 2LLô E1,E2,E3 Khu công nghiệp Trà Đa,
                thành phố Pleiku, Gia Lai
                <br />
                <strong>Điện thoại:</strong> (0269) 38 20 888
                <!-- <strong>Fax:</strong> (84-8) 39 435 949 <br /> -->
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.9071819403634!2d108.03557341414596!3d14.023515894718718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316c1e256a59e85f%3A0xa9545c282c389a47!2zTmjDoCBtw6F5IHPhu69hIE51dGlmb29kIENhbyBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1622799422120!5m2!1svi!2s"
                  width="100%"
                  height="200"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import FormContact from "~/components/FormContact";
export default {
  data() {
    return {
      coupon: "",
      cart: null,
      contactForm: {
        name: "",
        email: "",
        telephone: "",
        enquiry: "",
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    FormContact,
  },
  head: {
    title: "Liên hệ",
  },
  methods: {
    onSubmit(e) {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            const info = `Số điện thoại: ${this.contactForm.telephone},\r\n Họ tên: ${this.contactForm.name}
              `;
            this.contactForm.enquiry = this.contactForm.enquiry.concat(info);
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
        .catch((err) => {
          // //console.log("validate form err: ", err);
        });
    },

    sendContact() {
      this.sending = true;
      this.$store
        .dispatch("app/postData", {
          param: `/contact`,
          data: this.contactForm,
        })
        .then((data) => {
          this.sending = false;
          this.$swal({
            title: "Gửi liên hệ thành công",
            showCancelButton: true,
            text: "Yêu cầu của bạn đã được gửi đi",
            icon: "success",
            confirmButtonText: "Đóng và Về trang chủ",
          }).then((result) => {
            this.$router.push("/");
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          });
        })
        .catch((err) => {
          this.sending = false;
          // this.$toast
          //   .error("Có lỗi, không thể gửi, vui lòng thử lại sau")
          //   .goAway(1500);
          // //console.log("Khong the gửi:", err);
        });
    },
  },
};
</script>

<style lang="scss">
#contatti {
  background-color: #ffffff;
}
#contatti a {
  color: rgb(32, 26, 26);
  text-decoration: none;
}

@media (max-width: 575.98px) {
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
}

@media (min-width: 992px) {
  #contatti {
    padding-bottom: 200px;
  }
}

#author a {
  color: rgb(110, 9, 9);
  text-decoration: none;
}
</style>
