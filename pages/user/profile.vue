<template>
  <main role="main">
    <div class="mb-5">
      <div class="col-md-12">
        <div v-if="profile && profile.profile">
          <div class="user-panel-rank" hidden>
            <div class="col-12">
              <h3>{{ profile.full_name }}</h3>

              <p>
                Thành viên {{ profile.profile.rank_name }}
                <img width="25px" :src="profile.profile.rank_icon" alt />
                <br />
                Điểm tích luỹ: {{ profile.profile.point }}
              </p>
            </div>
          </div>

          <div class="block-section">
            <div class="row">
              <div class="col-md-7 col-12">
                <div class="card">
                  <div class="text-center">
                    <div class="bg-nuti-profile mt-5">
                      <a>
                        <b-avatar
                          size="7rem"
                          class="minusmt-4 hover-change-avt"
                        >
                          <img
                            v-if="profile && profile.avatar"
                            :src="profile.avatar"
                            alt=""
                          />
                          <label class="cam-for-change" for="file">
                            <a>
                              <img
                                src="~/assets/images/icon/camera.png"
                                alt=""
                                width="50%"
                                class="minusmt-2"
                              />
                              <input
                                @change="handleSelectedFiles"
                                id="file"
                                multiple
                                name="file"
                                accept="image/video/*"
                                ref="fileInput"
                                type="file"
                                hidden
                              />
                            </a>
                          </label>
                        </b-avatar>
                      </a>

                      <h5 id="fullName" class="mt-2">
                        {{ profile.full_name }}
                        <a @click="editName(profile)"
                          ><i class="fa fa-edit"></i>
                        </a>
                      </h5>
                      <!-- <b-button  @click="updateProfile"> Lưu</b-button> -->
                      <div class="mt-2">
                        <ValidationObserver ref="formProfile">
                          <form @submit.prevent="submit">
                            <ValidationProvider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <b-input-group
                                prepend="Họ & tên"
                                class="display-none"
                                style="width: 95%; margin: 0 auto !important;"
                                id="editFullName"
                              >
                                <b-form-input
                                  aria-label="Tên"
                                  v-model="formProfile.full_name"
                                  class="bd-input-group-first"
                                ></b-form-input>
                                <b-input-group-append>
                                  <b-button
                                    type="sumbit"
                                    variant="outline-secondary"
                                    class="pr-2 pl-2"
                                    @click="doneEditName()"
                                    ><i class="fa fa-edit"></i>
                                  </b-button>
                                </b-input-group-append>
                                  <b-button
                                    variant="outline-secondary"
                                    class=" ml-2"
                                    @click="updateProfile">
                                    <!-- <i class="fa fa-floppy-o" aria-hidden="true"></i> -->
                                    Lưu
                                  </b-button>
                              </b-input-group>
                              <p class="error-message">{{ errors[0] }}</p>
                            </ValidationProvider>
                          </form>
                        </ValidationObserver>
                      </div>

                      <div class="group-count mt-2">
                        <div class="row">
                          <div class="col-6">
                            <h6>Đã mua</h6>
                            <p>{{ orders }} đơn</p>
                          </div>
                          <div class="col-6">
                            <h6>Tổng thanh toán</h6>
                            <p>{{ profile.total_sales_formatted ? profile.total_sales_formatted : '0 đ' }}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <h6>Tổng tiết kiệm</h6>
                            <p>{{ profile.total_discount_formated ? profile.total_discount_formated : '0 đ' }}</p>
                          </div>
                          <div class="col-6">
                            <h6>Điểm thưởng</h6>
                            <p>{{ profile.point ? `${profile.point} điểm` :  '0 điểm'}}</p>
                          </div>
                        </div>
                        <div class="row">
                           <div class="col-12 text-center">
                            <h6>Xếp hạng</h6>
                            <p class="" v-if="profile.profile.rank_name">
                              {{ profile.profile.rank_name }}
                              <img
                                width="25px"
                                :src="profile.profile.rank_icon"
                                alt
                              />
                            </p>
                            <p v-if="!profile.profile.rank_name">
                              Thành viên mới
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src="~/assets/images/icon/PROFILE-BANNER.png" />
                  <!-- <b-button variant="outline-secondary" @click="updateProfile"> Lưu</b-button> -->
                </div>
              </div>
              <div class="col-md-5 col-12 mt-mobile-2">
                <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="basicInfo-tab"
                      data-toggle="tab"
                      href="#basicInfo"
                      role="tab"
                      aria-controls="basicInfo"
                      aria-selected="true"
                      >Thông tin</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="connectedServices-tab"
                      data-toggle="tab"
                      href="#connectedServices"
                      role="tab"
                      aria-controls="connectedServices"
                      aria-selected="false"
                      >Mật khẩu</a
                    >
                  </li>
                </ul>
                <div class="tab-content ml-1" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="basicInfo"
                    role="tabpanel"
                    aria-labelledby="basicInfo-tab"
                  >
                    <div class="row">
                      <div class="col-12">
                        <label style="font-weight:bold;">Nhóm khách hàng</label>
                      </div>
                      <div class="col-12">{{ profile.group_name }}</div>
                    </div>
                    <hr />

                    <!-- <div class="row">
                      <div class="col-12">
                        <label style="font-weight:bold;">Ngày sinh</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="date"
                          v-model="birthday"
                          @change="editBirthday(birthday)"
                          style="border: none !important; padding: 0 !important"
                        />
                      </div>
                    </div>
                    <hr /> -->

                    <div class="row">
                      <div class="col-12">
                        <label style="font-weight:bold;">Điện thoại:</label>
                      </div>
                      <div class="col-12">{{ profile.phone }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-12">
                        <label style="font-weight:bold;">Email:</label>
                      </div>
                      <div class="col-12">
                        <div id="emailProfile">
                          <a
                            @click="editEmail(profile.email)"
                            class="float-right"
                            ><i class="fa fa-edit"></i
                          ></a>
                          {{ profile.email }}
                        </div>

                        <b-input-group
                          class="display-none"
                          id="editEmailProfile"
                        >
                          <b-form-input
                            aria-label="Email"
                            v-model="formProfile.email"
                            class="bd-input-group"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-button
                              type="sumbit"
                              variant="outline-secondary"
                              class="pl-2 pr-2"
                              @click="doneEditEmail()"
                              ><i class="fa fa-edit"></i
                            ></b-button>
                          </b-input-group-append>
                           <b-button
                              variant="outline-secondary"
                              class=" ml-2"
                              @click="updateProfile">
                              <!-- <i class="fa fa-floppy-o" aria-hidden="true"></i> -->
                              Lưu
                            </b-button>
                        </b-input-group>
                      </div>
                    </div>

                    <hr />
                    <!-- <nuxt-link to="/user/update-profile" class="btn btn-primary">Cập nhật thông tin</nuxt-link> -->
                    <!-- <a class="btn btn-danger text-white" @click="logout()">Đăng Xuất</a> -->
                  </div>
                  <div
                    class="tab-pane fade"
                    id="connectedServices"
                    role="tabpanel"
                    aria-labelledby="ConnectedServices-tab"
                  >
                    <div class="row">
                      <div class="col-12 col-sm-offset-3">
                        <ValidationObserver ref="form">
                          <form @submit.prevent="submit">
                            <ValidationProvider
                              rules="required|min:8"
                              v-slot="{ errors }"
                            >
                              <div class="form-group">
                                <div class="input-group mb-3">
                                  <input
                                    :type="
                                      isShowPass == true ? 'text' : 'password'
                                    "
                                    class="input-lg form-control"
                                    name="password"
                                    id="password1"
                                    ref="password"
                                    v-model.trim="form.password"
                                    placeholder="Nhập mật khẩu mới"
                                    autocomplete="off"
                                  />
                                  <div class="input-group-append">
                                    <span
                                      type="button"
                                      @click="showPass()"
                                      class="input-group-text"
                                    >
                                      <i
                                        v-if="!isShowPass"
                                        class="fa fa-eye"
                                      ></i>
                                      <i v-else class="fa fa-eye-slash"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p class="error-message">{{ errors[0] }}</p>
                            </ValidationProvider>

                            <div class="form-group">
                              <b-button
                                type="submit"
                                class="col-xs-12 btn btn-primary btn-load btn-lg"
                                >Thực hiện</b-button
                              >
                            </div>
                          </form>
                        </ValidationObserver>
                      </div>
                      <!--/col-sm-6-->
                    </div>
                    <!--/row-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="profile && profile.agent_register">
          <h2 class="cp-page-title">Biểu mẫu</h2>
          <div class="card block-section">
            <ul class="list-unstyled">
              <li class="clearfix">
                <a @click="downloadAgentForm()">
                  Thông tin đăng ký Đại lý cá nhân
                  <span class="text-danger pull-right">
                    <i class="fa fa-download"></i> Tải về
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="card block-section" v-if="profile && profile.account_status === 'approved'">
            <ul class="list-unstyled">
              <li class="clearfix">
                <a @click="downloadCertificationAgentForm()">
                  Thông Báo xác nhận trở thành Đại lý cá nhân
                  <span class="text-danger pull-right">
                    <i class="fa fa-download"></i> Tải về
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
    <h4 class="cp-page-title">Liên kết tài khoản</h4>
      <div class="styles__StyledSocial-sc-1lrcko9-2 Account">
<!--        <div class="social-item">-->
<!--            <div><img src="../../assets/images/zalo.png" class="icon"><strong>Zalo</strong></div>-->
<!--          <div class="status"><span></span><span v-if = "user && user.zl_id">Đã liên kết</span><a @click="updateSocial('zalo')" v-if = "user && !user.zl_id">Liên kết</a></div>-->
<!--        </div>-->
        <div class="social-item">
            <div><img src="../../assets/images/FB.png" class="icon"><strong>Facebook</strong></div>
          <div class="status"><span></span><a @click="updateSocial('facebook')">{{user && user.fb_id ? 'Đã liên kết':'Liên kết'}}</a></div>
        </div>
        <div class="social-item">
            <div><img src="../../assets/images/G+.png" class="icon"><strong>Google</strong></div>
            <div class="status"><span></span><a @click="updateSocial('google')">{{user && user.gg_id ? 'Đã liên kết':'Liên kết'}}</a></div>
        </div>
      </div>
  </main>
  <!-- /.container -->
</template>

<script>
import UserMenuPanel from "~/components/UserMenuPanel";
import FileUpload from "~/components/FileUpload";
import { mapState, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { initFbsdk } from '~/plugins/fb-login';
export default {
  layout: "admin",
  components: {
    ValidationProvider,
    ValidationObserver,
    UserMenuPanel,
    FileUpload,
  },
  middleware: "authenticated",
  data() {
    return {
      orders: null,
      isShowPass: true,
      form: {
        password: null,
        confirm: null,
      },
      profile: null,
      files: {},
      ArrayIdImage: [],
      ImagesRender: null,
      id_images: [],
      changing_avatar: {},
      birthday: null,
      formProfile: {
        email: null,
        first_name: null,
        last_name: null,
        short_name: null,
        full_name: null,
        address: null,
        phone: null,
        birthday: null,
        gender: null,
        avatar: null,
        is_active: null,
        birthdayIsTrue: 1,
      },

      editorName: false,
    };
  },
  head: {
    title: "Thông tin cá nhân",
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),
  created() {
    this.getProfile();
    this.getLengthOrder();
  },
  mounted() {
    // if (this.formProfile.birthday) {
    //   let birthdayOfUser = Date.parse(this.formProfile.birthday);
    //   let now = Date.now();
    //   if (birthdayOfUser && now && birthdayOfUser <= now) {
    //     this.birthdayIsTrue = 1;
    //   } else {
    //     this.birthdayIsTrue = 0;
    //     this.$toast
    //       .error(
    //         "Ngày sinh phải trước ngày giờ hiện tại, vui lòng kiểm tra lại!"
    //       )
    //       .goAway(5000);
    //   }
    // }
  },
  methods: {
    getLengthOrder() {
      this.$store
        .dispatch("app/fetchData", `v1/orders/my-orders`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.orders = resp.meta.pagination.total;
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err:", err);
        });
    },
    getProfile() {
      this.$store
        .dispatch("app/fetchData", "/v1/users/profile")
        .then((data) => {
          this.profile = data.data;

          if (
            this.profile &&
            this.profile.profile &&
            this.profile.profile.birthday
          ) {
            let birthdayForm = this.profile.profile.birthday.split(/\D/g);
            let birthdayString = [
              birthdayForm[2],
              birthdayForm[1],
              birthdayForm[0],
            ].join("-");
            // this.stringToDate(birthdayString, "yyyy-mm-dd", "-");
            this.birthday = birthdayString;
          }

          if (this.formProfile.full_name == null) {
            this.formProfile.full_name = this.profile.profile.full_name;
          }
        });
    },
    editName(profile) {
      this.formProfile.full_name = profile.full_name;
      if (document.getElementById("fullName")) {
        let elmFullName = document.getElementById("fullName");
        elmFullName.classList.add("display-none");
      }
      if (document.getElementById("editFullName")) {
        let elmFullName = document.getElementById("editFullName");
        elmFullName.classList.remove("display-none");
      }
    },
    doneEditName() {
      if (document.getElementById("fullName")) {
        let elmFullName = document.getElementById("fullName");
        elmFullName.classList.remove("display-none");
      }
      if (document.getElementById("editFullName")) {
        let elmFullName = document.getElementById("editFullName");
        elmFullName.classList.add("display-none");
      }
      this.profile.full_name = this.formProfile.full_name;
    },
    editBirthday(birthday) {
      // let birthdayForm = birthday.split(/\D/g);
      // this.formProfile.birthday = [
      //   birthdayForm[2],
      //   birthdayForm[1],
      //   birthdayForm[0],
      // ].join("-");
      this.formProfile.birthday = birthday;
    },
    editEmail(email) {
      this.formProfile.email = email;
      if (document.getElementById("emailProfile")) {
        let elmFullName = document.getElementById("emailProfile");
        elmFullName.classList.add("display-none");
      }
      if (document.getElementById("editEmailProfile")) {
        let elmFullName = document.getElementById("editEmailProfile");
        elmFullName.classList.remove("display-none");
      }
    },
    doneEditEmail() {
      if (document.getElementById("emailProfile")) {
        let elmFullName = document.getElementById("emailProfile");
        elmFullName.classList.remove("display-none");
      }
      if (document.getElementById("editEmailProfile")) {
        let elmFullName = document.getElementById("editEmailProfile");
        elmFullName.classList.add("display-none");
      }
      this.profile.email = this.formProfile.email;
    },
    updateProfile() {
      this.$refs.formProfile
        .validate()
        .then((success) => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            this.$store
              .dispatch("app/updateData", {
                param: "v1/users/profile",
                data: this.formProfile,
              })
              .then(() => {
                (this.form.password = null),
                  this.$store.dispatch("user/getAccount");
                this.getProfile();
                this.$store.dispatch("app/showLoadingOverlay", false);
                this.$toast
                  .success("Thông tin của bạn đã được thay đổi")
                  .goAway(1500);
                if (document.getElementById("fullName")) {
                  let elmFullName = document.getElementById("fullName");
                  elmFullName.classList.remove("display-none");
                }
                if (document.getElementById("editFullName")) {
                  let elmFullName = document.getElementById("editFullName");
                  elmFullName.classList.add("display-none");
                }
                if (document.getElementById("emailProfile")) {
                  let elmFullName = document.getElementById("emailProfile");
                  elmFullName.classList.remove("display-none");
                }
                if (document.getElementById("editEmailProfile")) {
                  let elmFullName = document.getElementById("editEmailProfile");
                  elmFullName.classList.add("display-none");
                }
              })
              .catch((err) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                // if (err.data && err.data.error) {
                //   this.$toast.error(err.data.error[0]).goAway(2500);
                // }
              });
          } else {
            // this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((err) => {
          // //console.log("validate form err: ", err);
        });
    },
    handleSelectedFiles() {
      let selectedFiles = this.$refs.fileInput.files;
      // console.log("selectedFiles", selectedFiles);
      for (let i = 0; i < selectedFiles.length; i++) {
        /*Check Already Has Been Selected Or Not ...*/
        this.files = selectedFiles[0];
      }
      this.uploadFile();
      this.updateProfile();
    },

    uploadFile() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      const formdata = new FormData();
      formdata.append("files[" + 0 + "]", this.files);
      this.$store
        .dispatch("app/uploadFile", {
          data: formdata,
          param: `${process.env.MEDIA_URL}/upload`,
        })
        .then((res) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.formProfile.avatar = `${process.env.MEDIA_URL}/file/${res.id}`;
          if (this.formProfile.avatar) {
            this.profile.avatar = this.formProfile.avatar;
          }
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    showPass() {
      this.isShowPass = !this.isShowPass;
    },
    comingsoon() {
      alert("Đang bảo trì");
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/");
        setTimeout(() => {
          location.reload();
        });
      });
    },
    downloadAgentForm() {
      const userId = localStorage.getItem("userid");
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/downloadFile", {
          filename: this.profile.phone + "-form-dang-ky-dai-ly",
          param: `v1/print-agent-registration-form/${userId}`,
        })
        .then(() => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("download oke");
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("lỗi download form:", err);
        });
    },
    downloadCertificationAgentForm() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/downloadFile", {
          filename: this.profile.phone + "-thong-bao-xac-nhan-dai-ly",
          param: `v1/personal-agent-certification`,
        })
        .then(() => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("download oke");
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("lỗi download form:", err);
        });
    },
    updateSocial(value){
      if (value == 'google'){
        this.$gAuth
            .signIn()
            .then(GoogleUser => {
              // on success do something
              let socialId = GoogleUser.getBasicProfile().getId();
              this.$store.dispatch("user/updateSocial", {gg_id:socialId}).then((resp) => {
                this.getProfile();
                this.$store.dispatch("app/showLoadingOverlay", false);
              }).catch((err) => {
                    this.$store.dispatch("app/showLoadingOverlay", false);
                    console.log("err: ", err);
                  });
            })
            .catch(error => {
              console.log('error', error)
            })
      }

      if (value == 'facebook'){
        window.FB.login(response => {
          if (response && response.authResponse) {
            window.FB.api(`/${response.authResponse.userID}`, userResponse => {
              if (userResponse) {
                let socialId = userResponse.id;
                this.$store.dispatch("user/updateSocial", {fb_id:socialId}).then((resp) => {
                  this.getProfile();
                  this.$store.dispatch("app/showLoadingOverlay", false);
                }).catch((err) => {
                      this.$store.dispatch("app/showLoadingOverlay", false);
                      console.log("err: ", err);
                    });
              }
            }, this.params);
          }
        }, this.params)
      }

      if (value == 'zalo'){

      }
    },
    submit() {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            this.$store.dispatch("app/showLoadingOverlay", true);
            this.$store
              .dispatch("app/updateData", {
                param: "v1/users/change-password",
                data: {
                  new_password: this.form.password,
                  password_new_confirmation: this.form.password,
                },
              })
              .then(() => {
                (this.form.password = null),
                  this.$store.dispatch("app/showLoadingOverlay", false);
                this.$toast.success("Đổi mật khẩu thành công").goAway(1500);
              })
              .catch((err) => {
                this.$store.dispatch("app/showLoadingOverlay", false);
                // if (err.data && err.data.error) {
                //   this.$toast.error(err.data.error[0]).goAway(2500);
                // }
              });
          } else {
            // this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((err) => {
          // //console.log("validate form err: ", err);
        });
    },
  },
};
</script>
<style>
.image-container {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.image-container:hover .image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}
.user-panel-rank {
  background: linear-gradient(
    90deg,
    #024418 0%,
    #20b352 35%,
    rgb(0, 255, 200) 100%
  );
  margin-bottom: 10px;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}
.Account {
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
}
.Account .social-item {
    border-top: 1px solid rgb(248, 248, 248);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 19px 20px;
}
.Account .social-item .icon {
    width: 34px;
    height: 34px;
    font-size: 34px;
}
.Account .social-item strong {
    font-weight: 500;
    margin: 0px 0px 0px 6px;
}
.Account .social-item .status {
    color: rgb(27, 168, 255);
    flex: 1 1 0%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    display: flex;
}
</style>
