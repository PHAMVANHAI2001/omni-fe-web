<template>
  <main role="main">
    <h2 class="cp-page-title">Thành viên nhóm</h2>

    <div class="block-section">
      <div
        v-if="referrals && referrals.children.length == 0"
        class="alert alert-warning"
        role="alert"
      >Bạn chưa có dữ liệu thành viên nhóm.</div>

      <div class="tf-tree example text-center" v-if="referrals && referrals.children.length > 0">
        <ul class="text-center">
          <li>
            <span
              class="tf-nc"
              v-bind:class="{ 'has-child' : (referrals['children'] && referrals['children'].length) }"
            >
              <div class="agent-profile">
                <img src="~assets/images/agent-icon.svg" />
                <br />
                <span class="username">
                  {{referrals.name}}
                  <br />
                  ID: {{referrals.code}}
                </span>
              </div>

              <div class="agent-sale-detail" v-if="referrals.commission">
                Doanh số cá nhân: {{referrals.commission.total_sales | vndformat}}
                <br />
                Doanh số nhóm: {{referrals.commission.total_group_sales | vndformat}}
                <br />
                Hạng mức hoa hồng: {{referrals.commission.rate}}%
                <br />
                Hoa hồng giới thiệu: {{referrals.commission.referral_commission | vndformat}}
                <br />
                Hoa hồng đại lý: {{referrals.commission.commission| vndformat}}
                <br />
              </div>
            </span>

            <ul v-if="referrals && referrals['children'].length > 0">
              <li v-for="(child1,i) of referrals['children']" :key="i">
                <div
                  class="tf-nc"
                  v-bind:class="{ 'has-child' : (child1['children'] && child1['children'].length) }"
                >
                  <div class="agent-profile">
                    <img src="~assets/images/agent-icon.svg" />
                    <br />
                    <span class="username">
                      {{child1.name}}
                      <br />
                      ID: {{child1.code}}
                    </span>
                  </div>

                  <div class="agent-sale-detail" v-if="child1.commission">
                    Doanh số cá nhân: {{child1.commission.total_sales | vndformat}}
                    <br />
                    Doanh số nhóm: {{child1.commission.total_group_sales| vndformat}}
                    <br />
                    Hạng mức hoa hồng: {{child1.commission.rate}}%
                    <br />
                    Hoa hồng giới thiệu: {{child1.commission.referral_commission | vndformat}}
                    <br />
                    Hoa hồng đại lý: {{child1.commission.commission| vndformat}}
                    <br />
                  </div>
                </div>
                <ul v-if="child1 && child1['children'].length >0">
                  <li v-for="(itm,i) of child1['children']" :key="i">
                    <span
                      class="tf-nc"
                      v-bind:class="{ 'has-child' : (itm['children'] && itm['children'].length) }"
                    >
                      <div class="agent-profile">
                        <img src="~assets/images/agent-icon.svg" />
                        <br />
                        <span class="username">
                          {{itm.name}}
                          <br />
                          ID: {{itm.code}}
                        </span>
                      </div>

                      <div class="agent-sale-detail" v-if="itm.commission">
                        Doanh số cá nhân: {{itm.commission.total_sales | vndformat}}
                        <br />
                        Hạng mức hoa hồng: {{itm.commission.rate}}%
                        <br />
                        Hoa hồng đại lý: {{itm.commission.commission| vndformat}}
                        <br />
                      </div>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <!-- /.container -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserMenuPanel from "~/components/UserMenuPanel";
import PaginationVue from "~/components/Pagination.vue";
export default {
  layout: "admin",
  middleware: "authenticated",
  head: {
    title: "Danh sách người được giới thiệu"
  },
  components: {
    UserMenuPanel,
    pagination: PaginationVue
  },
  data() {
    return {
      referrals: null
    };
  },
  created() {
    if (process.browser) {
      const userId = localStorage.getItem("userid");
      this.getUserReferral(userId);
    }
  },
  methods: {
    getUserReferral(userId) {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.$store
        .dispatch("app/fetchData", `/v1/users/${userId}/tree`)
        .then(resp => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          this.referrals = resp.data;
        })
        .catch(err => {
          this.$store.dispatch("app/showLoadingOverlay", false);
          console.log("err:", err);
        });
    }
  }
};
</script>
<style lang="scss">
.tf-tree {
  font-size: 13px;
  overflow: auto;
}

.tf-tree * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tf-tree ul {
  display: inline-flex;
}

.tf-tree li {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 1em;
  position: relative;
}

.tf-tree li ul {
  margin: 2em 0;
}

.tf-tree li li:before {
  border-top: 0.0625em solid #000;
  content: "";
  display: block;
  height: 0.0625em;
  left: -0.03125em;
  position: absolute;
  top: -1.03125em;
  width: 100%;
}

.tf-tree li li:first-child:before {
  left: calc(50% - 0.03125em);
  max-width: calc(50% + 0.0625em);
}

.tf-tree li li:last-child:before {
  left: auto;
  max-width: calc(50% + 0.0625em);
  right: calc(50% - 0.03125em);
}

.tf-tree li li:only-child:before {
  display: none;
}

.tf-tree li li:only-child > .tf-nc:before,
.tf-tree li li:only-child > .tf-node-content:before {
  height: 1.0625em;
  top: -1.0625em;
}

.tf-tree .tf-nc,
.tf-tree .tf-node-content {
  display: inline-block;
  padding: 0.5em 1em;
  position: relative;
  border-radius: 7px;
}

.tf-tree .tf-nc:before,
.tf-tree .tf-node-content:before {
  top: -1.03125em;
}

.tf-tree .tf-nc:after,
.tf-tree .tf-nc:before,
.tf-tree .tf-node-content:after,
.tf-tree .tf-node-content:before {
  border-left: 0.0625em solid #000;
  content: "";
  display: block;
  height: 1em;
  left: calc(50% - 0.03125em);
  position: absolute;
  width: 0.0625em;
}

.tf-tree .tf-nc:after,
.tf-tree .tf-node-content:after {
  top: calc(100% + 0.03125em);
}

.tf-tree .tf-nc:only-child:after,
.tf-tree .tf-node-content:only-child:after,
.tf-tree > ul > li > .tf-nc:before,
.tf-tree > ul > li > .tf-node-content:before {
  display: none;
}

.tf-tree.tf-gap-sm li {
  padding: 0 0.6em;
}

.tf-tree.tf-gap-sm li > .tf-nc:before,
.tf-tree.tf-gap-sm li > .tf-node-content:before {
  height: 0.6em;
  top: -0.6em;
}

.tf-tree.tf-gap-sm li > .tf-nc:after,
.tf-tree.tf-gap-sm li > .tf-node-content:after {
  height: 0.6em;
}

.tf-tree.tf-gap-sm li ul {
  margin: 1.2em 0;
}

.tf-tree.tf-gap-sm li li:before {
  top: -0.63125em;
}

.tf-tree.tf-gap-sm li li:only-child > .tf-nc:before,
.tf-tree.tf-gap-sm li li:only-child > .tf-node-content:before {
  height: 0.6625em;
  top: -0.6625em;
}

.tf-tree.tf-gap-lg li {
  padding: 0 1.5em;
}

.tf-tree.tf-gap-lg li > .tf-nc:before,
.tf-tree.tf-gap-lg li > .tf-node-content:before {
  height: 1.5em;
  top: -1.5em;
}

.tf-tree.tf-gap-lg li > .tf-nc:after,
.tf-tree.tf-gap-lg li > .tf-node-content:after {
  height: 1.5em;
}

.tf-tree.tf-gap-lg li ul {
  margin: 3em 0;
}

.tf-tree.tf-gap-lg li li:before {
  top: -1.53125em;
}

.tf-tree.tf-gap-lg li li:only-child > .tf-nc:before,
.tf-tree.tf-gap-lg li li:only-child > .tf-node-content:before {
  height: 1.5625em;
  top: -1.5625em;
}

.tf-tree li.tf-dotted-children .tf-nc:after,
.tf-tree li.tf-dotted-children .tf-nc:before,
.tf-tree li.tf-dotted-children .tf-node-content:after,
.tf-tree li.tf-dotted-children .tf-node-content:before {
  border-left-style: dotted;
}

.tf-tree li.tf-dotted-children li:before {
  border-top-style: dotted;
}

.tf-tree li.tf-dotted-children > .tf-nc:before,
.tf-tree li.tf-dotted-children > .tf-node-content:before {
  border-left-style: solid;
}

.tf-tree li.tf-dashed-children .tf-nc:after,
.tf-tree li.tf-dashed-children .tf-nc:before,
.tf-tree li.tf-dashed-children .tf-node-content:after,
.tf-tree li.tf-dashed-children .tf-node-content:before {
  border-left-style: dashed;
}

.tf-tree li.tf-dashed-children li:before {
  border-top-style: dashed;
}

.tf-tree li.tf-dashed-children > .tf-nc:before,
.tf-tree li.tf-dashed-children > .tf-node-content:before {
  border-left-style: solid;
}

.tf-nc.has-child {
  .username {
    background-color: rgb(238, 112, 9);
  }
}

.tf-nc {
  img {
    width: 40px;
  }
  .username {
    display: block;
    padding: 3px 5px;
    background: rgb(19, 147, 197);
    color: #fff;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 0.9rem;
  }
  .level_number {
    display: block;
  }
  .commission_cost {
    display: block;
  }
}

.list-agents {
  max-height: 500px;
  overflow-y: auto;
  li {
    img {
      width: 40px;
      float: left;
    }
    .agent-info {
      float: right;
      width: 80%;
    }
  }
}

.agent-profile {
  margin-bottom: 10px !important;
}
</style>
