import Vue from 'vue'
Vue.directive('md-style', {
    bind: function (el, binding, vnode) { 
        if(binding.value){
            el.classList.add("has-value");
        }
    },
    update: function (el, binding, vnode) { 
        if(vnode.elm.value){
            el.classList.add("has-value");
        }else{
            el.classList.remove("has-value");
        }  
    }
})