<template>
  <main role="main">
    <div class="clearfix mb-5">
      <div class="container">
        <div class="isn-mobile">
          <b-breadcrumb :items="title"></b-breadcrumb>
        </div>
        <div class="col-md-12 col-12">
          <div id="CustomerRateComment">
            <CustomerRateCommentV2
              :product="currentProduct"
              :currentIdOrder="currentIdOrder"
            ></CustomerRateCommentV2>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { isMobile } from "~/plugins/util";
import CustomerRateCommentV2 from "~/components/CustomerRateCommentV2";
export default {
  data() {
    return {
      title: [
        {
          text: "Trang chủ",
          href: "/",
        },
        {
          text: "Đơn hàng",
          href: `/user/order/${this.$router.currentRoute.query.order}`,
        },
        {
          text: "Đánh giá sản phẩm",
          active: true,
        },
      ],
      product_slug: null,
      currentProduct: {},
      isMobile: false,
      currentProductAvgStar: 0,
      currentProductTotalRate: null,
      starSize: 13,
      showRating: false,
      currentIdOrder: null,
    };
  },
  components: {
    CustomerRateCommentV2,
  },
  created() {
    if (this.$router.currentRoute.params.id) {
      this.product_slug = this.$router.currentRoute.params.id;
    }
    if (this.$router.currentRoute.query.order) {
      this.currentIdOrder = this.$router.currentRoute.query.order;
    }

    this.getDetailProduct();
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
    }
  },
  methods: {
    getDetailProduct() {
      this.$store
        .dispatch("products/detail", { slug: this.product_slug })
        .then((resp) => {
          if (resp.data) {
            this.currentProduct = resp.data;
            this.currentProductAvgStar = this.currentProduct.star.avg_star.avg;
            this.currentProductTotalRate = this.currentProduct.star.total_rate.total;
          }
        })
        .catch((err) => {
          // console.log("get banner error:", err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.write_a_comment_btn {
  display: inline-block;
  padding: 10px 30px;
  background: rgb(216, 133, 8);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: rgb(216, 6, 6);
  }
}
.average-rating {
  font-size: 3.2rem;
  color: rgb(225, 11, 11);
}
.total-comment {
  color: rgb(155, 155, 155);
}
.user-avata-comment {
  display: inline-block;
  padding: 2px;
  background: #ccc;
  border-radius: 50%;
  line-height: 60px;
  width: 60px;
  height: 60px;
}
.user-comment {
  text-align: center;
  h4 {
    font-size: 0.9rem;
    margin: 10px 0 5px 0;
  }
  p {
    font-size: 0.8rem;
  }
}
.comment-sumary {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.comment-detail {
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 10px 0;
}
.comment-title h3 {
  font-size: 1.2rem;
  color: rgb(34, 34, 34);
}
.context-rating {
  border: 1px solid rgb(170, 170, 170);
  border-radius: 10px;
  margin: 10px 0;
}
#textarea-default {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 0px !important;
}

.close-lightbox {
  position: absolute;
  // margin-bottom: 550px;
  // width: 100%;
  // justify-content: center;
  right: 0;
  top: -8px;
}
</style>
