<template>
    <div class="dialog-ovelay" v-bind:class="[closeModal ? 'display_none' : '']">
      <div class="dialog" v-bind:style="{ width: widthModal, margin: marginModal }">
       
         
 
        <div class="dialog-msg">
         <p>Thông tin này chỉ mang tính chất trợ giúp tìm hiểu về sản phẩm, không nhằm mục đích quảng cáo. Vui lòng xác nhận Quý khách là nhân viên y tế hoặc có nhu cầu tìm hiểu về sản phẩm.</p>
    
        </div>
        <footer>
          <div class="controls">
            <button class="button button-danger" @click="cancelAction()">Bỏ qua</button>
            <button class="button button-danger" @click="doAction()">Xác nhận</button>
          </div>
        </footer>
      </div>
    </div>
</template>

<script>
import { isMobile } from "~/plugins/util";
export default {
  props: {},
  data() {
    return {
      closeModal: false,
      isMobile: false,
      widthModal: '543px',
      marginModal: '20% auto 0'
    };
  },
  components: {},
  created() {
  },
  mounted() {
    if (!process.server) {
      this.isMobile = isMobile();
      if(this.isMobile){
        this.widthModal = '96%'
        this.marginModal='60% auto 0'
      }
    }
  },
  methods: {
    enableScroll(){
        $('body').removeClass('scrollDisabled').css('margin-top', 0);
    },
    doAction() {
      this.enableScroll();
      this.closeModal = true;
    },
    cancelAction() {
      this.enableScroll();
      this.$router.push(`/`);
    },
  },
};
</script>

<style lang="scss">

/* .modal */
.display_none{
  display: none;
}
.dialog-ovelay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 999999
}
// .dialog-ovelay .dialog {
//   width: 400px;
//   margin: 100px auto 0;
//   background-color: #fff;
//   box-shadow: 0 0 20px rgba(0,0,0,.2);
//   border-radius: 3px;
//   overflow: hidden
// }

.dialog-ovelay .dialog {
  // width: 90%;
  // margin: 20% auto 0;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0,0,0,.2);
  border-radius: 5px;
  overflow: hidden
}

.dialog-ovelay .dialog header {
  padding: 10px 8px;
  background-color: #f6f7f9;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
}
.dialog-ovelay .dialog header h4 {
  margin: 5px 0px 0px 0px;
  font-size: 14px;
  color: #006e43;
  display: inline-block;
  text-align: center
}

.dialog-ovelay .dialog .dialog-msg {
  padding: 12px 10px
}
.dialog-ovelay .dialog .dialog-msg p{
  margin: 5px 0px 0px 0px;
  font-size: 18px;
  color: #006e43;
}
.dialog-ovelay .dialog footer {
  border-top: 1px solid #e5e5e5;
  padding: 8px 10px
}
.dialog-ovelay .dialog footer .controls {
  direction: rtl
}
.dialog-ovelay .dialog footer .controls .button {
  padding: 5px 15px;
  border-radius: 3px;
  margin: 5px 5px 10px 0px;
}
.button {
cursor: pointer
}
.button-default {
  // background-color: #006e43;
  border: 1px solid rgba(204, 204, 204, 0.5);
  color: #ffffff;
  
}
.button-danger {
  color: #006e43;
  padding: 6px 15px !important;
  width: 110px;
  border: 1px solid #006e43;
  font-size: 15px;
}
.link {
padding: 5px 10px;
cursor: pointer
}
</style>
