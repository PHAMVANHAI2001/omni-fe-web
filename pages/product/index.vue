<template>
  <main role="main" class="clearfix">
    <div class="">
      <breadcrumbs
        :title="this.$route.matched[0].instances.default.$metaInfo.title"
        v-if="!isMobile"
      ></breadcrumbs>
      <div class="container" style="padding:15px 7px">
        <BannerPage :itemBanner="itemBanner"></BannerPage>
        <div class="col-md-12 order-first order-md-2">
          <div class="main-right">
            <div
              class="cat-sub-category"
              v-if="
                currentProductCategory &&
                  currentProductCategory.sub_categories &&
                  currentProductCategory.sub_categories.length
              "
            >
              <div class="row">
                <div
                  class="col-2"
                  v-for="(item, i) in currentProductCategory.sub_categories"
                  :key="i"
                >
                  <div class="sub-cat-item">
                    <nuxt-link
                      :to="{ path: `/product?cat=${item.category_id}` }"
                    >
                      <img
                        class="'img-thumbnail img-fluid rounded"
                        :src="item.image"
                        alt
                      />
                    </nuxt-link>
                    <h4>
                      <nuxt-link
                        :to="{ path: `/product?cat=${item.category_id}` }"
                        >{{ item.name }}</nuxt-link
                      >
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <ProductCategoryBanner></ProductCategoryBanner>

            <!-- / sorter -->
            <br/>
            <div class="top-page-product-bar clearfix">
              <div class="row" id="top-product-list">
                <div class="col-md-6 col-sm-9 col-8">
                  <h5 class="float-left fs-25 pl-3 center-column">
                    {{
                      currentProductCategory.name
                        ? currentProductCategory.name
                        : "Sản phẩm"
                    }}
                  </h5>
                </div>


                <div class="col-md-5 col-sm-6 col-2">
                  <Sorter  class="float-md-right center-column" :productsArr="products" ></Sorter>
                </div>

                <div class="col-md-1 col-sm-1 col-2"  v-if="isMobile">
                    <div  v-b-toggle.sidebar-product>
                      <img src="~assets/images/filter-solid.svg" alt="" class="icon-sort">
                    </div>
                    <b-sidebar 
                      id="sidebar-product" 
                      shadow
                      > 
                      <div class="px-3 py-2">
                        <aside class="sidebar-product-category">
                          <div class="brand" v-for="(items,k) in keyFilter.variant_propety" :key="k">
                            <h3>{{items.name}}</h3>
                            <div class="row">
                              <div class="col-md-6" v-for="(item,i) in items.variant" :key="i">
                                <label class="custom-control fill-checkbox">
                                  <input type="checkbox" class="fill-control-input" 
                                      :value="item" id="mainCat.merchantId" 
                                      v-model="ArrVariantId" 
                                      @change="checkedVariant(item, items.property_id)">
                                  <span class="fill-control-indicator"></span>
                                  <span class="fill-control-description" for="checkbox">{{item.name }}</span>
                                </label>  
                              </div>
                            </div>
                          </div>

                          <!-- <div class="brand" v-if="keyFilter.category">
                            <h3>Lọc theo tuổi</h3>
                            <div class="row">
                              <div class="col-md-12" v-for="(items,k) in keyFilter.category" :key="k">
                                <label class="custom-control fill-checkbox" @change="sortCategory(items)">
                                  <input type="checkbox" class="fill-control-input" >
                                  <span class="fill-control-indicator"></span>
                                  <span class="fill-control-description">{{items.value }}</span>
                                </label>
                              </div>
                            </div>
                          </div> -->

                            <div class="price">
                              <p class="panel-title a">GIÁ</p>
                              <div class="slider-wrap-input">
                                <div class="input-left input">
                                  <input
                                    type="text"
                                    placeholder="đ TỪ"
                                    class="input-number"
                                    @input="changePrice($event, 1)"
                                    :value="minPrice"
                                  />
                                </div>
                                <div class="input-right input">
                                  <input
                                    type="text"
                                    placeholder="đ ĐẾN"
                                    @input="changePrice($event, 2)"
                                    :value="maxPrice"
                                  />
                                </div>
                                <div class="play">
                                  <img
                                    src="images/play-button.svg"
                                    alt=""
                                    @click="sortPrice(minPrice, maxPrice)"
                                  />
                                </div>
                              </div>
                            </div>
                          
                        </aside>
                      </div>
                    </b-sidebar>
                </div>

              </div>
            </div>

            <div  >
              <div class="col-md-2 col-sm-2 col-2 pr-0 pl-0" v-if="!isMobile" style="float:left">
                  <a class="show-sort" href="#">
                  <img src="~assets/images/filter-solid.svg" alt="" style="width: 17px; padding-right: 4px;">BỘ LỌC TÌM KIẾM</a>
                  <div class="rep-mobile-x992 scrollbar" id="style-3">
                    <div class="left-nav">
                      <div class="main-sort">
                        <ul class="sort-main" id="megamenu">
                          <li class="">
                            <div class="">
                              <aside class="sidebar-product-category">

                                <div class="brand" v-for="(items,k) in keyFilter.variant_propety" :key="k">
                                  <h5 style="margin: 17px 0px 10px 0px;">{{items.name}}</h5>
                                  <div class="">
                                    <div class="" v-for="(item,i) in items.variant" :key="i">
                                      <label class="custom-control fill-checkbox">
                                        <input type="checkbox" class="fill-control-input" 
                                          :value="item" id="mainCat.merchantId" 
                                          v-model="ArrVariantId" 
                                          @change="checkedVariant(item, items.property_id)">
                                        <span class="fill-control-indicator"></span>
                                        <span class="fill-control-description">{{item.name }}</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                               
                                  <!-- SEARCH GIA  -->
                                  <div class="pb-3" >
                                    <p class="panel-title a">Khoảng giá</p>
                                    <div class="slider-wrap-input">
                                      <div class="input-left input">
                                        <input
                                          type="text"
                                          placeholder="đ TỪ"
                                          class="input-number"
                                          @input="changePrice($event, 1)"
                                          :value="minPrice"
                                        />
                                      </div>-
                                      <div class="input-right input">
                                        <input
                                          type="text"
                                          placeholder="đ ĐẾN"
                                          @input="changePrice($event, 2)"
                                          :value="maxPrice"
                                        />
                                      </div>
                                    </div>
                                    <div class="">
                                       <button type="button" class="btn btn-block btn-secondary" @click="sortPrice(minPrice, maxPrice)" style="margin-right: 0.1rem; margin-top: 6px">Áp dụng</button>
                                      </div>
                                  </div>
                                  <br>
                              </aside>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
            <div class="col-md-10 col-sm-10 alert alert-warning"
              v-if="products && !products.length"
              role="alert"
              style="height: 50px;float: right"
            >
              Không tìm thấy sản phẩm nào.
            </div>
            
            <!-- / skeleton -->
            <div class="row " v-if="!products" style="float:right">
              <div class="col-sm-4 col-lg-3 col-6" :key="n" v-for="n in 15">
                <skeleton></skeleton>
              </div>
            </div>
            <!-- Danh sach san pham -->
            
            <div class="hot-deal row" v-if="products">
              <div
                class=" col-sm-4 col-lg-3 col-6"
                v-for="(item, i) in products"
                :key="i"
              >
                <Product class="product_list" :item="item"></Product>
              </div>
            </div>
            <br>

            <!--Đóng Danh sach san pham -->
             
            </div>

            


            <pagination
              v-if="checkTrue"
              v-show="total_page"
              :total-pages="total_page"
              :total="totalrowcount"
              :per-page="pagesize"
              :current-page="pagenumber"
              @pagechanged="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>

  </main>
  <!-- /.container -->
</template>

<script>
import BannerPage from "~/components/Banners/BannerPage.vue";
import ProductSidebarCategory from "~/components/ProductSidebarCategory";
import ProductsBestsellers from "~/components/ProductsBestsellers";
import Product from "~/components/Product";
import ProductCategoryBanner from "~/components/ProductCategoryBanner";
import Skeleton from "~/components/Skeleton";
import Sorter from "~/components/Sorter";
import PaginationVue from "~/components/Pagination.vue";
import $ from "jquery";
import { isMobile, isIndex } from "~/plugins/util";
import Breadcrumbs from "~/components/builders/Breadcrumbs.vue";
export default {
    components: {
        ProductSidebarCategory: ProductSidebarCategory,
        skeleton: Skeleton,
        ProductsBestsellers: ProductsBestsellers,
        Product,
        Sorter,
        BannerPage,
        isMobile,
        ProductCategoryBanner,
        pagination: PaginationVue,
        breadcrumbs: Breadcrumbs,
    },
    data() {
        return {
            checked: 0,
            itemBanner: null,
            isMobile: false,
            selectBrand: [],
            pagenumber: 1,
            pagesize: 21,
            totalrowcount: 0,
            total_page: 0,
            products: null,
            currentProductCategory: {
                name: ""
            },
            maxPrice: "",
            minPrice: "",
            minPriceTemp: "",
            listBrand: [],
            listBrandTemp: [],
            showMoreBrand: false,
            lengthOfListBrand: 0,
            keyFilter: [],
            ArrVariantId: [],
            ArrVariant: [],
            productInit: null,
            productArrayTemp: [],
            productArrays: [],
            oldInputIds: 0,
            old: [],
            prodOld: [],
            group_property:[],
            test:[],
            test2:[],
            test3:[],
            checkTrue: true,
        };
    },
    watchQuery: ["cat"],
    asyncData({store, params, route}) {
        if (route.query["cat"]) {
            return store
                .dispatch("products/getCurrentProductCategory", {
                    id: route.query["cat"],
                })
                .then((resp) => {
                    // console.log("change cat:", resp);
                    return {
                        currentProductCategory: resp.data,
                    };
                });
        }
    },
    head() {
        return {
            title: this.currentProductCategory.name ?
                this.currentProductCategory.name :
                "Sản phẩm",
            meta: [{
                    hid: "description",
                    name: "description",
                    content: this.currentProductCategory.description,
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: this.currentProductCategory.description,
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: this.currentProductCategory.name,
                },
                {
                    hid: "og:image",
                    name: "og:image",
                    property: "og:image",
                    content: this.currentProductCategory.original_image,
                },
                {
                    hid: "og:url",
                    property: "og:url",
                    content: process.env.baseUrl + this.$nuxt.$route.fullPath,
                },
            ],
        };
    },
    computed: {
        price() {},
    },
    created() {
        this.getKeyFilter();
        this.sortDetailVariant();
        this.getSliderShow();
        this.getProduct();
    },
    mounted() {
        if (!process.server) {
            this.isMobile = isMobile();
        }
    },
    methods: {
        deleteVariantItem(data, i) {
            const valueToRemove = data.id;
            const variant_ids = [];
            const variant_code = [];
            const Arr = this.ArrVariant.filter(item => item.id !== valueToRemove);
            this.ArrVariant = Arr
            this.ArrVariant.forEach((item) => {
                variant_ids.push(item.id)
                variant_code.push(item.code)
            })
            this.$router.push(
                `/product?variant_ids=${variant_ids}&variant=${variant_code}`
            );
        },
        sortPrice(minPrice, maxPrice, page = 1) {
            const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
            this.$router.push(
                "/product/?minPrice=" + minPrice + "&maxPrice=" + maxPrice + `&cat=${cat}&page=${page}`
            );
        },
        checkedVariant(item, property_id) {
          const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
          this.filterProduct(this.ArrVariantId, item['id'], property_id);
        },
        sortDetailVariant(){
            const variant = this.$route.query["variant_ids"] ? this.$route.query["variant_ids"] : "";
        },
        filterProduct(inputIds, inputItemId, property_id) {
          if(inputIds.length < 1){
            this.checkTrue = true
            this.getProduct(1)
            return
          }

          // truyền params body sort
          const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
          let group = inputIds.reduce((r, a) => {
            r[a.property_id] = [...r[a.property_id] || [], a];
              return r;
            }, {});

            const param_sort = {};
            param_sort.data = group;
            param_sort.cat = cat;
            param_sort.limit = 1000;
         
              this.$store
              .dispatch("products/getProductFilter",  param_sort)
              .then((resp) => {
                if(resp.data == null || !param_sort.data){
                   this.checkTrue = true
                   this.getProduct(1)
                }
                this.checkTrue = false
                this.products = resp.data
              })
              .catch((err) => {
                console.log("error:", err);
              });
        },
        sortCategory(value, page = 1) {
            this.$router.push(
                `/product?&page=${page}&cat=${value.id}&category=${value.slug}`
            );
        },
        getKeyFilter() {
            const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
            this.$store
                .dispatch("app/fetchData", `v1/client/key-filter-product?limit=100&cat=${cat}`)
                .then((resp) => {
                    this.keyFilter = resp;
                })
                .catch((err) => {
                    // //console.log("get banner error:", err);
                });
        },
        getSliderShow() {
            this.$store
                .dispatch("app/fetchData", "/v1/client/banners/banner-page-product")
                .then((resp) => {
                    if (resp.data) {
                        this.itemBanner = resp.data.details;
                    }
                })
                .catch((err) => {
                    // //console.log("get banner error:", err);
                });
        },
        getPriceInState(value) {
            const payload = {
                target: {
                    value: value,
                },
            };
            return payload;
        },
        format2(number) {
            const n = number.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            return n;
        },
        changePrice(event, type) {
            const price = this.formatStringVndToNumber(event.target.value);
            if (type == 1) this.minPrice = this.formatMoney(price, 3, ".", ",");
            else this.maxPrice = this.formatMoney(price, 3, ".", ",");
        },
        // changePriceMax(event) {
        //   const price = this.formatStringVndToNumber(event.target.value);
        //   this.maxPrice = this.formatMoney(price, 3, ".", ",");
        // },
        formatMoney(n, c, d, t) {
            var c = isNaN((c = Math.abs(c))) ? 2 : c,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
                j = (j = i.length) > 3 ? j % 3 : 0;

            return (
                s +
                (j ? i.substr(0, j) + t : "") +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
            );
        },
        formatStringVndToNumber(string) {
            let reString = "";
            for (let i = 0; i < string.length; i++) {
                if (string[i] != ",") reString += string[i];
            }
            return reString;
        },
        
        getProductWithValue(variantId, minPrice, maxPrice, page = 1) {
            const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
            const name = this.$route.query["name"] ? this.$route.query["name"] : "";

            minPrice = minPrice ?
                Number.parseInt(this.formatStringVndToNumber(minPrice)) :
                0;
            maxPrice = maxPrice ?
                Number.parseInt(this.formatStringVndToNumber(maxPrice)) :
                0;
            // commit to store
            this.$store.dispatch("app/showLoadingOverlay", true);

            console.log("da vao day", this.$store.state.app["price"]);
            console.log('variantId:', variantId)
            this.$store
                .dispatch("products/getProduct", {
                    params: `?limit=200&name=${name}&category_ids=${cat}&page=${page}&price_from=${minPrice}&price_to=${maxPrice}`,
                })
                .then((resp) => {
                    // console.log("products :", resp.data.meta.pagination);
                    this.$router.push(
                        "/product/?minPrice=" +
                        this.minPrice +
                        "&maxPrice=" +
                        this.maxPrice +
                        `&name=${name}&category_ids=${cat}&page=${page}`
                    );
                    this.$route.params.pathMatch;
                    this.$store.dispatch("app/showLoadingOverlay", false);
                    this.products = resp.data.data;
                    this.productInit = resp['data']['data'];
                    this.totalrowcount = resp.data.meta.pagination.count;
                    this.pagenumber = resp.data.meta.pagination.current_page;
                    this.total_page = resp.data.meta.pagination.total_pages;
                    this.pagesize = resp.data.meta.pagination.per_page;
                })
                .catch((err) => {
                    // console.log("err:", err);
                    this.$store.dispatch("app/showLoadingOverlay", false);
                });
        },
        getBrandFromRoute(selectBrand) {
            if (selectBrand.length > 0) {
                let array_temp = [];
                let array = selectBrand.split(",");
                array.forEach((value) => {
                    array_temp.push(Number.parseInt(value));
                });
                this.selectBrand = array_temp;
            }
        },
        getProduct(page = 1) {
            let minPrice = this.$route.query["minPrice"] ?
                this.$route.query["minPrice"] :
                "";
            let maxPrice = this.$route.query["maxPrice"] ?
                this.$route.query["maxPrice"] :
                "";
            let selectBrand = this.$route.query["brand_name"] ?
                this.$route.query["brand_name"] :
                [];
            let products_ids = this.$route.query["products_ids"] ?
                this.$route.query["products_ids"] :
                "";
            this.getBrandFromRoute(selectBrand);
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            // this.selectBrand = selectBrand
            minPrice = minPrice ?
                Number.parseInt(this.formatStringVndToNumber(minPrice)) :
                0;
            maxPrice = maxPrice ?
                Number.parseInt(this.formatStringVndToNumber(maxPrice)) :
                0;
            const variant = this.$route.query["variant_ids"] ? this.$route.query["variant_ids"] : "";
            const cat = this.$route.query["cat"] ? this.$route.query["cat"] : "";
            const name = this.$route.query["name"] ? this.$route.query["name"] : "";
            const sort = this.$route.query["sort"] ?
                this.$route.query["sort"] :
                "date_added";
            const manufacturer = this.$route.query["manufacturer"] ?
                this.$route.query["manufacturer"] :
                "";
            const order = this.$route.query["order"] ?
                this.$route.query["order"] :
                "desc";
                // limit cho cả mobile và desktop
                const limit = 20 ;
            if(products_ids){
              const arr_ids = products_ids.split(',')
              this.$store
                .dispatch("products/getProduct", {
                    params: `?limit=50&status=1&id=${arr_ids}&landing_page=show`,
                }).then((resp) => {
                  if(resp &&  resp.data.data){
                    this.products = resp.data.data
                   }
                })
              return;
            }

            if (this.$route.query["top-sale"] == "top-sale") {
                this.$store
                    .dispatch("products/getProducTopSale", {
                        params: `?limit=10`,
                    })
                    .then((resp) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                        this.products = resp.data;
                        this.totalrowcount = resp.data.meta.pagination.count;
                        this.pagenumber = resp.data.meta.pagination.current_page;
                        this.total_page = resp.data.meta.pagination.total_pages;
                        this.pagesize = resp.data.meta.pagination.per_page;
                    })
                    .catch((err) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                    });
                return;
            }
            var productsBrand = JSON.parse(sessionStorage.getItem("dataBrands"));
            if (this.$route.query["code_brand"]) {
                this.products = productsBrand;
                return;
            }

            if (this.$route.query["flash-sale"] == "flash-sale") {
                this.$store
                    .dispatch("products/getProducFlashSale")
                    .then((resp) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                        this.products = resp.data;
                        this.totalrowcount = resp.data.meta.pagination.count;
                        this.pagenumber = resp.data.meta.pagination.current_page;
                        this.total_page = resp.data.meta.pagination.total_pages;
                        this.pagesize = resp.data.meta.pagination.per_page;
                    })
                    .catch((err) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                    });
                return;
            }
            if (this.$route.query["product-promotion"]) {
                var code = this.$route.query["product-promotion"];
                this.$store
                    .dispatch("app/fetchData", `/v1/client/product-promotion/${code}`)
                    .then((resp) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                        this.products = resp.data;
                        this.totalrowcount = resp.data.meta.pagination.count;
                        this.pagenumber = resp.data.meta.pagination.current_page;
                        this.total_page = resp.data.meta.pagination.total_pages;
                        this.pagesize = resp.data.meta.pagination.per_page;
                    })
                    .catch((err) => {
                        this.$store.dispatch("app/showLoadingOverlay", false);
                    });
                return;
            }
            // commit to store
            this.$store.commit("products/setSearchProduct", {
                name: name
            });
            this.$store.dispatch("app/showLoadingOverlay", true);
            this.$store
                .dispatch("products/getProduct", {
                    params: `?limit=${limit}&brand_name=${encodeURIComponent(selectBrand)}&variant_ids=${variant}&name=${name}&category_ids=${cat}&sort[${sort}]=${order}&page=${page}&price_from=${minPrice}&price_to=${maxPrice}&status=1&landing_page=show`,
                })
                .then((resp) => {
                    // console.log("products :", resp.data.meta.pagination);
                    this.$store.dispatch("app/showLoadingOverlay", false);
                    this.products = resp.data.data;
                    this.productInit = resp['data']['data'];
                    this.totalrowcount = resp.data.meta.pagination.count;
                    this.pagenumber = resp.data.meta.pagination.current_page;
                    this.total_page = resp.data.meta.pagination.total_pages;
                    this.pagesize = resp.data.meta.pagination.per_page;
                })
                .catch((err) => {
                    // console.log("err:", err);
                    this.$store.dispatch("app/showLoadingOverlay", false);
                });
        },
        showMoreBrandFunction() {
            let array = [];
            array = this.listBrand.concat(this.listBrandTemp);
            this.listBrandTemp = [];
            this.listBrand = array;
            this.showMoreBrand = true;
        },
        // getBrand() {
        //   this.$store
        //     .dispatch("app/fetchData", "v0/brand")
        //     .then((resp) => {
        //       console.log("products :", resp.data);
        //       this.$store.dispatch("app/showLoadingOverlay", false);
        //       // this.listBrand = resp.data;
        //       this.lengthOfListBrand = resp.data.length;
        //       if (resp && resp.data.length > 0) {
        //         for (let i = 0; i < resp.data.length; i++) {
        //           if (i < 5) this.listBrand.push(resp.data[i]);
        //           if (i >= 5) this.listBrandTemp.push(resp.data[i]);
        //         }
        //       }
        //     })
        //     .catch((err) => {
        //       // console.log("err:", err);
        //       this.$store.dispatch("app/showLoadingOverlay", false);
        //     });
        // },
        onPageChange(page) {
            this.pagenumber = page;
            this.getProduct(page);
            if (!process.server) {
                 $("html, body").animate({ scrollTop: 0 }, "");
            }
        },
    },
    watch: {
        "$route.query"(q) {
          this.getKeyFilter();
          this.getProduct();
        },
    },
}; 
</script>

<style>
.scrollbar
{
    float: left;
    height: 730px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: clip;
}
.force-overflow
{
	min-height: 450px;
}

/*
 *  STYLE 3
 */

#style-3::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#style-3::-webkit-scrollbar
{
	width: 6px;
	background-color: #F5F5F5;
}

#style-3::-webkit-scrollbar-thumb
{
	background-color: #000000;
  height: 5% !important;
}
.slider-wrap {
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
}
.play {
  width: 20px;
  height: 20px;
  background-color: #f07339;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.apply {
  width: 20px;
  height: 20px;
  background-color: #f07339;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.price {
  padding: 26px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.play img {
  width: 12px;
  height: 12px;
}

.panel-collapse {
  padding-bottom: 15px;
}
.category-price-slide {
  display: flex;
  flex-direction: column;
}
.slider-wrap .input {
  width: 95px;
  height: 30px;
  padding: 0 8px;
  background: rgb(252, 252, 252);
  border-radius: 4px;
  text-align: left;
  border: 1px solid #b8b8b8;
  outline: 0;
  font-size: 13px;
}

.slider-wrap-input {
  display: flex;
  flex-wrap: wrap;
}

.slider-wrap-input .input {
  border: 1px solid black;
  flex: 1;
  margin: 0px 2px;
  /* margin-right: 6px; */
  border-radius: 4px;
  padding: 0 3px;
}

.input input {
  outline: none;
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  font-size: 11px;
  padding: 6px 0px !important;
}

.brand {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.brand .form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.brand .form-group label {
  margin-bottom: 0;
  margin-left: 6px;
  cursor: pointer;
}

.brand .form-control {
  display: inline-block;
  width: unset;
  height: unset;
  cursor: pointer;
  outline: none;
  margin-right: 6px;
}

.brand .brand-more {
  text-align: center;
  cursor: pointer;
  font-weight: 600;
}

.btn-default {
  background: #fff;
  border: 1px solid #189eff;
  font-size: 12px;
  color: #189eff;
  padding: 5px 15px;
  width: 99px;
  margin-top: 8px;
  border-radius: 4px;
}
.slider-title {
  margin-bottom: 5px;
  font-size: 13px;
  text-align: left;
  color: #858585;
  font-weight: 300;
}
.panel-title {
  line-height: 0px;
  display: block;
  color: #006e43;
  font-size: 14px;
  text-transform: uppercase;
  margin-left: 5px;
  margin-top: 15px;
}
.background {
  background-color: rgb(252, 252, 252);
}
.list-group-item {
  font-size: 14px;
  color: #333;
  padding: 5px 0px;
  display: block;
  position: relative;
  border-radius: 0;
}
.b-sidebar > .b-sidebar-header {
  padding: 0.95rem 1rem !important;
}
.b-sidebar > .b-sidebar-header > button {
  width: 30px !important;
  height: 30px !important;
}
</style>
