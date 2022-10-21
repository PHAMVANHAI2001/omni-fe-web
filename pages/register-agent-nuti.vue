<template>
  <main role="main">
    <div class="header-app">
      <div class="container">
        <h4>Chào mừng quý khách tham gia đại lý cá nhân</h4>
        <div class="flex-fill d-flex text-center">
          <!-- <div class="border col-12 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Quy trình đăng ký đại lý cá nhân</h6>
            </a>
          </div> -->
          <!-- <div class="border col-4 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Chính sách đại lý</h6>
            </a>
          </div>
          <div class="border col-4 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Cách thức tham gia</h6>
            </a>
          </div>
          <div class="border col-4 rounded p-2 flex-fill btn-primary">
            <a href="#">
              <h6 class="m-0 text-white">Quy trình đăng ký đại lý</h6>
            </a>
          </div> -->
        </div>
      </div>
    </div>

    <div class="step-register-section">
      <div class="container">
        <h2 class="text-center text-info text-uppercase font-weight-bold mb-0">
          Thông tin đăng ký đại lý cá nhân
        </h2>
      </div>
    </div>

    <div class="main-page container">
      <div class="container" id="form-address-shiping">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="sss">
              <ValidationObserver ref="form">
                <form class="mt-15 form-address-shiping">
                  <div class="block-section">
                    <div class>
                      <!-- <div
                        class="form-group"
                        v-if="
                          role_code != 'EMPLOYEE' ||
                            (user_profile &&
                              user_profile.role_code != 'EMPLOYEE')
                        "
                      >
                        <label class="col-form-label">
                          Vui lòng nhập số điện thoại của Đại lý giới thiệu bạn
                          <span class="text-danger">(*)</span>
                        </label>
                        <ValidationProvider
                          name="reference_phone"
                          rules="required|phone"
                          v-slot="{ errors }"
                        >
                          <input
                            type="tel"
                            ref="reference_phone"
                            name="Số điện thoại"
                            maxlength="10"
                            class="form-control phone"
                            placeholder="000-000-0000"
                            v-model="formsRegesterAgent.reference_phone"
                            v-on:keyup="
                              search(formsRegesterAgent.reference_phone)
                            "
                          />
                          <h6 class="pt-2 text-success" v-if="user.name">
                            <b>{{ user.group_name }} - {{ user.name }}</b>
                          </h6>
                          <p
                            class="error-message"
                            v-if="!errors[0] && user.error"
                          >
                            {{ user.error }}
                          </p>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                        <p>{{ settingSystemData }}</p>
                      </div> -->
                      <h2 class="text-info">
                        <i class="fa fa-user text-info"></i> Thông tin khách
                        hàng đăng ký đại lý cá nhân:
                      </h2>
                      <!-- <p class="heading-register-desc">
                        Thông tin đăng ký bên dưới sẽ giúp Công ty thiết lập hợp
                        đồng hợp tác kinh doanh với Quý Khách Hàng
                      </p> -->
                      <div class="form-group">
                        <label class="col-form-label">
                          Họ và tên
                          <span class="text-danger">(*)</span>
                        </label>
                        <ValidationProvider
                          name="Họ và tên"
                          rules="required|min:5"
                          v-slot="{ errors }"
                        >
                          <input
                            type="text"
                            maxlength="255"
                            name="Họ và tên"
                            ref="name"
                            class="form-control uppercase"
                            tabindex="2"
                            v-model.trim="formsRegesterAgent.name"
                          />
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Email
                          <span class="text-danger">(*)</span>
                        </label>
                        <ValidationProvider
                          name="email"
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <input
                            type="email"
                            maxlength="100"
                            name="email"
                            ref="email"
                            tabindex="3"
                            class="form-control"
                            v-model.trim="formsRegesterAgent.email"
                          />
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Số điện thoại
                          <span class="text-danger">(*)</span>
                        </label>
                        <ValidationProvider
                          name="phone"
                          rules="required|min:10|phone"
                          v-slot="{ errors }"
                        >
                          <input
                            type="tel"
                            maxlength="10"
                            tabindex="4"
                            name="Số điện thoại"
                            class="form-control phone"
                            placeholder="000-000-0000"
                            v-model="formsRegesterAgent.phone"
                            v-on:keyup="search(formsRegesterAgent.phone)"
                          />
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Số CMND/Căn Cước Công Dân
                          <span class="text-danger">(*)</span>
                        </label>
                        <ValidationProvider
                          name="CMND"
                          rules="required|min:9|max:12"
                          v-slot="{ errors }"
                        >
                          <input
                            type="tel"
                            name="CMND"
                            maxlength="12"
                            ref="id_number"
                            placeholder="123456789012"
                            class="form-control"
                            id="id_number"
                            tabindex="6"
                            v-on:keyup="setInputFilter()"
                            v-model="formsRegesterAgent.id_number"
                          />
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <!-- Bổ sung -->
                      <div class="form-group">
                        <label class="col-form-label">
                          Bạn có nhu cầu hợp tác với Nutifood với vai trò nào?
                          






                        </label>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Đại lý
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Nhà Phân Phối
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Cửa Hàng
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Các kênh bán hàng khác
                          </label>
                        </div>
                            <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Livestream bán hàng hưởng hoa hồng
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Điểm giao nhận hàng hóa kênh online (Hub)
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                           Nhân viên soạn hàng online
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Hình thức khác:
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <label class="col-md-12"
                            >Tải lên ảnh CMND/CCCD<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <div class="col-md-6">
                            <p class="col-md-12 m-0">
                              Cập nhật hình ảnh mặt trước.
                            </p>
                            <div v-if="fileList.length < 1">
                              <label class="custom-file" for="file">
                                Chọn file
                                <input
                                  @change="handleSelectedFiles(1)"
                                  id="file"
                                  name="file"
                                  accept="image/*"
                                  ref="fileInput"
                                  type="file"
                                />
                              </label>
                            </div>
                            <div
                              class="col-md-12 image-area mt-4"
                              v-for="(file, index) in fileList"
                              :key="index"
                            >
                              <b-button
                                class="btn btn-danger btn-sm"
                                @click="removeFile(index)"
                                ><i class="fa fa-minus" aria-hidden="true"></i
                              ></b-button>
                              <img
                                id="imageResult"
                                :src="
                                  `${mediaUrl}/file/${file.id}`
                                "
                                alt=""
                                style="width: 80%"
                                class="col-md-12 img-fluid rounded shadow-sm mx-auto d-block"
                              />
                            </div>
                          </div>
                          <!-- <div class="row">
                              
                            </div> -->
                          <div class="col-md-6">
                            <p class="col-md-12 m-0">
                              Cập nhật hình ảnh mặt sau.
                            </p>
                            <div v-if="fileList2.length < 1">
                              <label class="custom-file" for="file2">
                                Chọn file
                                <input
                                  @change="handleSelectedFiles(2)"
                                  id="file2"
                                  name="file2"
                                  accept="image/*"
                                  ref="fileInput2"
                                  type="file"
                                />
                              </label>
                            </div>
                            <div
                              class="col-md-12 image-area mt-4"
                              v-for="(file, index) in fileList2"
                              :key="index"
                            >
                              <b-button
                                class="btn btn-danger btn-sm"
                                @click="removeFile2(index)"
                                ><i class="fa fa-minus" aria-hidden="true"></i
                              ></b-button>
                              <img
                                id="imageResult"
                                :src="
                                  `${mediaUrl}/file/${file.id}`
                                "
                                alt=""
                                class="col-md-12 img-fluid rounded shadow-sm mx-auto d-block"
                                style="width: 80%"
                              />
                            </div>
                          </div>
                          <!-- <div class="row">
                              
                            </div> -->
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Mã số thuế thu nhập cá nhân <a target="_blank" href="https://masothue.com">(Tra cứu mã số thuế https://masothue.com)</a>
                        </label>
                        <p>
                          (Vui lòng cung cấp thông tin trong vòng 15 ngày nếu
                          chưa có mã số thuế thu nhập cá nhân)
                        </p>
                        <input
                          type="text"
                          maxlength="20"
                          class="form-control"
                          name="Mã số thuế"
                          ref="tax"
                          tabindex="7"
                          v-model="formsRegesterAgent.tax"
                        />
                      </div>
                      <h2 class="text-info">
                        <i class="fa fa-list-alt text-info"></i> Thông tin ngân
                        hàng
                      </h2>
                      <p class="heading-register-desc">
                        Đây là thông tin quan trọng giúp Công ty thanh toán cho
                        Quý khách hàng Đại lý Cá Nhân (Vui lòng cung cấp thông
                        tin tài khoản ngân hàng trong vòng 15 ngày nếu chưa có
                        thông tin khi đăng ký)
                      </p>
                      <div class="form-group">
                        <label class="col-form-label">Tên ngân hàng</label>
                        <v-autocomplete
                          :items="banksSearch"
                          :get-label="getLabel"
                          :component-item="template"
                          @update-items="updateBanks"
                          @item-selected="itemSelected"
                          tabindex="8"
                          ref="banksSearch"
                        ></v-autocomplete>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label"
                          >Số tài khoản Ngân Hàng</label
                        >
                        <input
                          type="tel"
                          placeholder
                          ref="bank_account_number"
                          name="Số tài khoản ngân hàng"
                          class="form-control"
                          tabindex="9"
                          v-model="formsRegesterAgent.bank_account_number"
                        />
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">Tên chủ tài khoản</label>

                        <input
                          type="text"
                          placeholder
                          ref="bank_account_name"
                          name="Tên chủ tài khoản"
                          class="form-control"
                          tabindex="10"
                          v-model="formsRegesterAgent.bank_account_name"
                        />
                      </div>
                      <div class="form-group">
                        <label class="col-form-label"
                          >Chi Nhánh Mở Tài Khoản Ngân Hàng</label
                        >

                        <input
                          type="text"
                          placeholder
                          ref="bank_branch"
                          class="form-control"
                          tabindex="11"
                          v-model="formsRegesterAgent.bank_branch"
                        />
                      </div>
                           <!-- Câu hỏi khảo sát -->
                      <h2 class="text-info">
                        <i class="fas fa-map-marker-alt text-info"></i> Câu hỏi khảo sát
                      </h2>
                     <div class="form-group">
                        <label class="col-form-label">
                          Gia đình bạn có sử dụng sản phẩm của NUTIFOOD
                        </label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="yesorno" v-model="formsRegesterAgent['registration_question']['use_product']" v-bind:value="1">
                          <label class="form-check-label" for="exampleRadios1">
                            Có 
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="yesorno" v-model="formsRegesterAgent['registration_question']['use_product']" v-bind:value="0">
                          <label class="form-check-label" for="exampleRadios2">
                            Không
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Bạn dự định bán các sản phẩm của NUTIFOOD thông qua kênh/ khu vực nào ?
                        </label>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Mạng xã hội/ các phương tiện truyền thông
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Tại khu chung cư
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Tại khu dân cư
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox">
                          <label class="form-check-label">
                            Các kênh bán hàng khác
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Bạn có tham gia là thành viên trên các kênh online/ nhóm chợ online không?
                        </label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="online" v-model="formsRegesterAgent['registration_question']['sale_online']" v-bind:value="1">
                          <label class="form-check-label">
                            Có, tôi là người bán
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="online" v-model="formsRegesterAgent['registration_question']['sale_online']" v-bind:value="2">
                          <label class="form-check-label">
                            Có, tôi là người mua
                          </label>
                        </div>
                         <div class="form-check">
                          <input class="form-check-input" type="radio" name="online" v-model="formsRegesterAgent['registration_question']['sale_online']" v-bind:value="0">
                          <label class="form-check-label">
                            Không
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">
                          Các kênh bán hàng online/ nhóm chợ online mà bạn tham gia
                        </label>
                        <textarea class="textareaInput" v-model="formsRegesterAgent['registration_question']['channel']" placeholder="Câu trả lời của bạn"></textarea>
                        <div class="textarea-line"></div>
                      </div>

                       <div class="form-group">
                        <label class="col-form-label">
                          Bạn có đồng ý bán duy nhất các sản phẩm Nutifood không?
                        </label>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="online" v-model="formsRegesterAgent['registration_question']['sale_online']" v-bind:value="1">
                          <label class="form-check-label">
                            Không
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="online" v-model="formsRegesterAgent['registration_question']['sale_online']" v-bind:value="2">
                          <label class="form-check-label">
                            Có
                          </label>
                        </div>
                      </div>

                      <h2 class="text-info">
                        <i class="fas fa-map-marker-alt text-info"></i> Địa chỉ
                        nhận hàng
                      </h2>
                      <div class="form-group">
                        <ValidationProvider
                          name="Tỉnh/ Thành phố"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Tỉnh/Thành phố<span class="text-danger"
                              >(*)</span
                            ></label
                          >

                          <select
                            @change="getDistrict(formsRegesterAgent.city_code)"
                            v-model.trim="formsRegesterAgent.city_code"
                            v-bind:key="item"
                            class="form-control"
                            ref="city_code"
                            tabindex="11"
                          >
                            <option value>Chọn Tỉnh/Thành phố</option>
                            <option
                              :value="item.code"
                              v-for="(item, city) in cities"
                              :key="city"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>

                      <div class="form-group">
                        <ValidationProvider
                          name="Quận/ Huyện"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Quận/Huyện<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <select
                            :disabled="!formsRegesterAgent.city_code"
                            class="form-control"
                            ref="district_code"
                            tabindex="12"
                            v-model="formsRegesterAgent.district_code"
                            @change="getWard(formsRegesterAgent.district_code)"
                          >
                            <option value>Chọn Quận/Huyện</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in districts"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>

                      <div class="form-group">
                        <ValidationProvider
                          name="Phường/ Xã"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Phường/Xã<span class="text-danger"
                              >(*)</span
                            ></label
                          >
                          <select
                            :disabled="!formsRegesterAgent.district_code"
                            class="form-control"
                            ref="ward_code"
                            tabindex="13"
                            v-model="formsRegesterAgent.ward_code"
                            @change="
                              getAgentByAddress(
                                formsRegesterAgent.city_code,
                                formsRegesterAgent.district_code,
                                formsRegesterAgent.ward_code
                              )
                            "
                          >
                            <option value>Chọn Phường/xã</option>
                            <option
                              :value="item.code"
                              v-for="(item, i) in wards"
                              :key="i"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <ValidationProvider
                          name="Địa chỉ"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <label class="col-form-label"
                            >Địa chỉ<span class="text-danger">(*)</span></label
                          >
                          <input
                            type="text"
                            placeholder="Tên đường, số nhà"
                            class="form-control"
                            ref="address"
                            tabindex="14"
                            v-model="formsRegesterAgent.address"
                          />
                          <p class="error-message">{{ errors[0] }}</p>
                        </ValidationProvider>
                      </div>
                      <div
                        class="form-group"
                        v-if="formsRegesterAgent.ward_code"
                      >
                        <label class="col-form-label"
                          >Địa chỉ: {{ formsRegesterAgent.address }},
                          {{ formsRegesterAgent.ward_name }},
                          {{ formsRegesterAgent.district_name }},
                          {{ formsRegesterAgent.city_name }}</label
                        >
                      </div>
                    <div class="form-group">
                     <div>
                        <p>
                          <span style="font-size:16px">
                            <span >Xác nhận thông tin:</span>
                          </span>
                        </p>
                          <ol>
                            <li>
                                <span style="font-size:14px">
                                <span>
                                Cá nhân đăng ký xác nhận đồng ý cung cấp những thông tin cá nhân ở trên và sẽ tự chịu trách nhiệm 
                                về những thông tin đã đăng ký; và cho phép Công Ty Cổ Phần Thực Phẩm Dinh Dưỡng Nutifood liên lạc theo 
                                số điện thoại, Email và địa chỉ đã đăng ký.
                                </span>
                                </span>
                            </li>
                          </ol>
                      </div>
                    </div>
                      <div class="d-flex">
                        <input type="checkbox" id="isChecked" name="isChecked"  v-model="isChecked" style="width: 40px;"> 
                        <label for="isChecked" class="pl-pr-0">Tôi đồng ý với tất cả các điều khoản trên.</label>
                      </div>
                    </div>
                  </div>
                  <div class="btn-checkout">
                    <b-button
                      @click="nextStep()"
                      block
                      :disabled="submitted"
                      v-bind:class="[
                        submitted ? 'btn btn-lg' : 'btn btn-info btn-lg',
                      ]"
                    >
                      Xác nhận đăng ký
                      <!-- <img src="~/assets/images/loadding.gif" alt=""> -->
                    </b-button>
                  </div>

                  <div class="btn-checkout text-info mb-20">
                    <b-button
                      type="button"
                      block
                      @click="goBack"
                      variant="outline-info"
                      >QUAY LẠI</b-button
                    >
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import Skeleton from "~/components/Skeleton";
import { mapState, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Autocomplete from "v-autocomplete";
import Vue from "vue";
Vue.use(Autocomplete);
import ItemAutocomplete from "../components/ItemAutocomplete";
import Loading2 from "~/components/Loading2";
import FileUpload from "~/components/FileUpload";
export default {
  data() {
    return {
      mediaUrl: null,
      files: [],
      fileList: [],
      files2: [],
      fileList2: [],
      template: ItemAutocomplete,
      countries: [],
      cities: [],
      wards: [],
      districts: [],
      banks: [],
      item: null,
      groups: [],
      banksSearch: [],
      settingSystem: null,
      settingSystemData: null,
      settingSystemConfirm: null,
      role_code: null,
      user: {
        name: null,
        error: null,
      },
      group_name: null,
      submitted: false,
      isChecked: false,
      form_state: "",
      validPhone: false,
      formsRegesterAgent: {
        name: "",
        phone: "",
        email: "",
        id_number: "",
        id_images: "",
        cooperate:"",
        tax:"",
        address: "",
        bank_name: "",
        bank_account_name: "",
        bank_account_number: "",
        bank_branch: "",
        anwser_1:"",
        anwser_2:"",
        anwser_3:"",
        anwser_4:"",
        anwser_5:"",


        city_code: "",
        district_code: "",
        ward_code: "",
        city_name: "",
        district_name: "",
        ward_name: "",
        bank_id: "",
        bank_code: "",
         registration_question: {
          use_product: 1,
          sale_product: [],
          sale_online: 1,
          channel: null,
        }
      },
    };
  },
  components: {
    ProductSidebarCategory: ProductSidebarCategory,
    skeleton: Skeleton,
    ValidationProvider,
    ValidationObserver,
    Loading2,
    FileUpload,
  },
  computed: mapState({
    user_profile: (state) => state.user.user,
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
  },
  created() {
    this.mediaUrl = process.env.MEDIA_URL;
    this.getCities();
    this.getBanks();
    this.getSettingSystem();
    if (process.browser) {
      this.islogged = localStorage.getItem("id_token");
      this.role_code = localStorage.getItem("role_code");
      if (this.role_code != "EMPLOYEE") {
        this.phone = localStorage.getItem("phone");
      }
    }
    this.formsRegesterAgent.phone = this.phone;
    if (this.phone && !this.islogged && this.role_code != "EMPLOYEE") {
      this.getCustomerInfo(this.phone);
    } else {
      var data =
        this.user_profile && this.user_profile.profile
          ? this.user_profile.profile
          : null;
      if (data && this.role_code != "EMPLOYEE") {
        if (data && data.city_code && data.district_code) {
          this.getDistrict(data.city_code);
          this.getWard(data.district_code);
          this.getAgentByAddress(
            data.city_code,
            data.district_code,
            data.ward_code
          );
        }
        this.formsRegesterAgent.name = data.full_name;
        this.formsRegesterAgent.phone = data.phone;
        this.formsRegesterAgent.email = data.email;
        this.formsRegesterAgent.city_code = data.city_code;
        this.formsRegesterAgent.city_name = data.city_name;
        this.formsRegesterAgent.district_code = data.district_code;
        this.formsRegesterAgent.district_name = data.district_name;
        this.formsRegesterAgent.ward_code = data.ward_code;
        this.formsRegesterAgent.ward_name = data.ward_name;
        this.formsRegesterAgent.address = data.full_address;
        this.formsRegesterAgent.group_code = data.group_code;
      }
    }
  },
  methods: {
    handleSelectedFiles($event) {
      let selectedFiles = "";
      $event == 1
        ? (selectedFiles = this.$refs.fileInput.files)
        : (selectedFiles = this.$refs.fileInput2.files);
      this.files.push(selectedFiles[0]);
      this.uploadFile($event);
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    uploadFile($event) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.files.map((file, index) => {
        const formdata = new FormData();
        formdata.append("files[" + index + "]", file);
        this.$store
          .dispatch("app/uploadFile", {
          data: formdata,
          param: `${process.env.MEDIA_URL}/upload`,
        })
          .then((res) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            if ($event == 1) {
              this.fileList.push(res);
              this.files = [];
            } else {
              this.fileList2.push(res);
              this.files = [];
            }
            this.getFileUpload();
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      });
    },

    removeFile2(index) {
      this.fileList2.splice(index, 1);
    },

    getFileUpload() {
      const arrayFile = this.fileList.concat(this.fileList2);
      const arrayFileID = [];
      arrayFile.map((item) => {
        arrayFileID.push(item.id);
      });
      if ((arrayFileID.length = 2))
        this.formsRegesterAgent.id_images = arrayFileID.join(",");
    },

    itemSelected(item) {
      this.formsRegesterAgent.bank_id = item.id;
      this.formsRegesterAgent.bank_code = item.code;
      this.formsRegesterAgent.bank_name = item.name;
    },
    updateBanks(text) {
      this.banksSearch = this.banks.filter((item) => {
        return new RegExp(text.toLowerCase()).test(item.name.toLowerCase());
      });
    },
    sendNotifyToAdmin() {
      console.log("send socket...");
      /* Emit events */
      const that = this;
      this.socket.emit(
        "ecom_sytem_message",
        {
          event: "NEW_AGENT",
          user_code: that.district_code,
          message: `Khách hàng ${that.formsRegesterAgent.name} đã đăng ký để trở thành đại lý.`,
        },
        (resp) => {
          /* Handle response, if any */
          console.log("send socket success:", resp);
        }
      );
    },
    getLabel(item) {
      return item ? item.name : "";
    },

    getCities() {
      this.$store.dispatch("app/fetchData", `v0/1/cities`).then((data) => {
        this.cities = data.data;
      });
    },
    getBanks() {
      this.$store.dispatch("app/fetchData", `v0/banks`).then((data) => {
        this.banks = data.data;
        this.banksSearch = data.data;
      });
    },
    getSettingSystem() {
      this.$store
        .dispatch("app/fetchData", `v1/client/settings/AGENT-SETTING`)
        .then((data) => {
          if (data.data) {
            this.settingSystemData = data.data;
            data.data.filter((item) => {
              item && item["key"] == "agent_agreement"
                ? (this.settingSystem = item["value"])
                : item && item["key"] == "confirm_info"
                ? (this.settingSystemConfirm = item["value"])
                : "";
            });
          }
        });
    },
    getDistrict(city_code) {
      this.formsRegesterAgent.ward_code = "";
      this.formsRegesterAgent.district_code = "";
      this.group_name = "";
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${city_code}/districts`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.districts = data.data;
        })
        .catch((err) => {
          // this.$toast.error(
          //   "Không thể lấy được Quận huyện, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getWard(district_code) {
      // this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v0/${district_code}/wards`)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.wards = data.data;
        })
        .catch((err) => {
          // this.$toast.error(
          //   "Không thể lấy được Phường/xã, vui lòng tải lại trang web"
          // );
          this.$store.dispatch("app/showLoadingOverlay", false);
        });
    },
    getCityNameByID() {
      const city = this.cities.find((city) => {
        return city.zone_id == this.formsRegesterAgent.zone_id;
      });
      if (city) {
        return city["name"];
      } else {
        this.$toast
          .error("Không nhận dạng được tên Tỉnh/Thành phố")
          .goAway(1500);
      }
    },
    getAgentByAddress(city_code, district_code, ward_code) {
      this.cityName = this.cities.find((cityName) => {
        return cityName.code == city_code;
      });
      this.districtName = this.districts.find((districtName) => {
        return districtName.code == district_code;
      });
      this.wardName = this.wards.find((wardName) => {
        return wardName.code == ward_code;
      });
      this.formsRegesterAgent.city_name =
        this.cityName && this.cityName.name ? this.cityName.name : "";
      this.formsRegesterAgent.district_name =
        this.districtName && this.districtName.name
          ? this.districtName.name
          : "";
      this.formsRegesterAgent.ward_name =
        this.wardName && this.wardName.name ? this.wardName.name : "";
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/get-distributor-by-location/${city_code}/${district_code}/${ward_code}`
        )
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (!resp["data"]) {
            this.group_name = null;
          } else {
            this.group_name = resp["data"].name;
          }
        })
        .catch((err) => {
          console.log("error confirm order:", err);
        });
    },
    createAccount() {
      console.log('this.formsRegesterAgent:', this.formsRegesterAgent)
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.formsRegesterAgent.reference_phone =
        this.formsRegesterAgent && this.formsRegesterAgent.reference_phone
          ? this.formsRegesterAgent.reference_phone
          : 1000;
      this.formsRegesterAgent.group_code =
        this.formsRegesterAgent && this.formsRegesterAgent.group_code
          ? this.formsRegesterAgent.group_code
          : "GUEST";
      this.formsRegesterAgent.seller_phone =
        this.role_code == "EMPLOYEE"
          ? localStorage.getItem("phone_emloyee")
          : "";
      this.$store
        .dispatch("user/register", this.formsRegesterAgent)
        .then((data) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if(typeof data != 'undefined') {
          this.sendNotifyToAdmin();
          localStorage.removeItem("phone");
          this.$swal({
            icon: "success",
            title: "Đăng ký thành công",
            text:
              "Thông tin của quý khách hàng đã được chuyển đến NUTIFOOD để xem xét và phê duyệt trong 3 ngày",
            confirmButtonText: "Hoàn tất",
            allowOutsideClick: false,
          })
          .then(() => {
            // localStorage.clear();
            this.verifyLogin();
            // this.$router.push("/");
            this.$nextTick(() => {});
          });
          } else {
            this.$toast
            .error("Lỗi đăng ký đại lý", {
              position: "top-right"
            })
            .goAway(35000);
          }
        })
        .catch((err) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("error confirm order:", err);
        });
    },
    focusForm() {
      if (this.$refs.form.errors.name.length) {
        this.$refs.name.focus();
      }
      if (this.$refs.form.errors.email.length) {
        this.$refs.email.focus();
      }
      if (this.$refs.form.errors.phone.length) {
        this.$refs.phone.focus();
      }
      if (this.$refs.form.errors.password.length) {
        this.$refs.password.focus();
      }
      if (this.$refs.form.errors.id_number.length) {
        this.$refs.id_number.focus();
      }
      if (this.$refs.form.errors.city_code.length) {
        this.$refs.city_code.focus();
      }
      if (this.$refs.form.errors.district_code.length) {
        this.$refs.district_code.focus();
      }
      if (this.$refs.form.errors.ward_code.length) {
        this.$refs.ward_code.focus();
      }
      if (this.$refs.form.errors.reference_phone.length) {
        this.$refs.reference_phone.focus();
      }
      if (this.$refs.form.errors.address.length) {
        this.$refs.address.focus();
      }
    },
    nextStep() {
      this.$refs.form
        .validate()
        .then((success) => {
          if (success) {
            this.createAccount();
          } else {
            this.focusForm();
            this.$toast.error("Vui lòng nhập đầy đủ thông tin").goAway(1500);
            return;
          }
          this.$nextTick(() => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verifyLogin() {
      this.$store
        .dispatch("user/verylogin", {
          phone: this.formsRegesterAgent.phone,
          store_token: process.env.store_token,
          password: this.formsRegesterAgent.password,
        })
        .then((res) => {
          if (res) {
            this.$store.dispatch("app/showLoadingOverlay", false);
            localStorage.setItem("phone", this.phone);
            localStorage.setItem("temp_phone", this.phone);
            this.addSession();
          }
        })
        .catch((error) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err login:", error);
        });
    },
    addSession() {
      // chưa login thì khởi tạo session_id cho phiên làm việc.
      this.getSession();
    },
    getSession() {
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/session?phone=${this.formsRegesterAgent.phone}`
        )
        .then((resp) => {
          if (resp["data"]["session_id"]) {
            this.$store.commit("app/setSession", resp["data"]["session_id"]);
            localStorage.setItem("session_id", resp["data"]["session_id"]);
            this.$router.push("/");
            setTimeout(() => {
              location.reload();
            });
          }
        });
    },
    search(phone) {
      if (
        this.formsRegesterAgent.reference_phone.length ||
        this.formsRegesterAgent.phone > 9
      ) {
        this.getUserByPhone(phone);
      } else if (
        this.formsRegesterAgent.reference_phone.length ||
        this.formsRegesterAgent.phone < 10
      ) {
        this.user = {
          name: null,
          error: null,
        };
      }
    },
    getCustomerInfo(phone) {
      this.$store
        .dispatch("app/fetchData", `/v1/client/customer-info/${phone}`)
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (!resp["data"]) {
            //this.$toast.error("Không tìm thấy thông tin").goAway(1500);
            // this.formshippingaddress.phone = phone;
          } else {
            // fill vào form.
            if (resp.data && resp.data.city_code && resp.data.district_code) {
              this.getDistrict(resp.data.city_code);
              this.getWard(resp.data.district_code);
              this.getAgentByAddress(
                resp.data.city_code,
                resp.data.district_code,
                resp.data.ward_code
              );
            }
            this.formsRegesterAgent.name = resp.data.name;
            // this.formsRegesterAgent.phone = resp.data.phone;
            this.formsRegesterAgent.email = resp.data.email;
            this.formsRegesterAgent.city_code = resp.data.city_code;
            this.formsRegesterAgent.district_code = resp.data.district_code;
            this.formsRegesterAgent.ward_code = resp.data.ward_code;
            this.formsRegesterAgent.address = resp.data.full_address;
          }
        });
    },
    getUserByPhone(phone) {
      this.$store
        .dispatch(
          "app/fetchData",
          `/v1/client/get-user-by-phone/${phone}?group_code=AGENT&account_status=approved`
        )
        .then((resp) => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          if (!resp["data"]) {
            this.formsRegesterAgent['reference_phone'] ? this.submitted = true : this.submitted = false;
            this.validPhone = true;
            this.user = {
              name: null,
              error: "Số điện thoại không tồn tại trong hệ thống",
            };
          } else {
            this.user = resp["data"];
            this.submitted = false;
          }
        })
        .catch((err) => {
          console.log("error confirm order:", err);
        });
    },
    goBack() {
      window.history.back();
    },
    inputFilter(value) {
      return /^\d*$/.test(value);
    },
    setInputFilter() {
      [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
      ].forEach((event) => {
        if (this.inputFilter(this.formsRegesterAgent.id_number)) {
          let oldValue = this.formsRegesterAgent.id_number;
        } else if (this.hasOwnProperty("oldValue")) {
          this.formsRegesterAgent.id_number = oldValue;
        } else {
          this.formsRegesterAgent.id_number = "";
        }
      });
    },
  },
  head: {
    title: "Đăng ký đại lý",
  },
};
</script>

<style lang="scss">
.img-fluid {
  z-index: 0;
  position: relative;
}

.custom-file {
  padding: 1.2rem;
  border-radius: 0.8rem;
  display: inline-block;
  border: 2px dashed #a0a0a0;
  line-height: 0px;
}

.custom-file input {
  display: none;
}

.image-area {
  // position: relative;
}

.image-area::before {
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  // z-index: 1;
}

.image-area img {
  z-index: 0;
  position: relative;
  float: left;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.image-area .btn {
  z-index: 2;
  position: absolute;
  // top: 45%;
  right: 0;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  font-size: 16px;
  padding: 0px 12px 0px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 23px 0px 0px 0px;
  color: #ffffff;
  background-color: #f30303;
  font-weight: bold;
  transition: 0.5s;
}

.image-area .btn:hover {
  background-color: #ffffff;
  transition: 0.5s;
  // font-size: 18px;
  color: #ff5f1f;
}

.form-address-shiping h2 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.step-register-section .progressbar > li::before {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 1.5em;
}
.step-register-section .progressbar > li::after {
  top: 30px;
}
.step-register-section .progressbar > li {
  font-size: 0.9em;
  text-transform: capitalize;
}
.step-register-section .progressbar {
  display: contents;
}
.step-register-section .progressbar .step-active::before {
  border-color: #b90943;
  background: #b90943;
  color: white;
}
.step-register-section .progressbar .step-active {
  color: #b90943;
}
.step-register-section .progressbar .step-active:after {
  background: #b90943;
}
.info-agent-agreement {
  overflow: scroll;
  background-color: #e6e6e6;
  max-height: 300px;
}
.uppercase {
  text-transform: uppercase;
}
.textareaInput {
    border: none;
    display: block;
    margin: 0;
    outline: none;
    resize: none;
    width: 100%;
}
.textarea-line{
    border-bottom: 1px solid #CCC;
    margin-top: -25px;
}
.form-check label {
    color: #000;
    padding: 0 25px;
}


</style>
