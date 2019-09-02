(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-af3b7f3c"],{"3dbb":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"name"}},[t._v("Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.discount.name,expression:"discount.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:t.discount.name},on:{input:function(e){e.target.composing||t.$set(t.discount,"name",e.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"target_price"}},[t._v("消費額度")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.discount.target_price,expression:"discount.target_price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"target_price",type:"number",name:"target_price"},domProps:{value:t.discount.target_price},on:{input:function(e){e.target.composing||t.$set(t.discount,"target_price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"percent"}},[t._v("折扣 % 數")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.discount.percent,expression:"discount.percent",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"percent",type:"number",name:"percent"},domProps:{value:t.discount.percent},on:{input:function(e){e.target.composing||t.$set(t.discount,"percent",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"product_reduce"}},[t._v("折抵費用")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.discount.product_reduce,expression:"discount.product_reduce",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"product_reduce",type:"number",name:"product_reduce"},domProps:{value:t.discount.product_reduce},on:{input:function(e){e.target.composing||t.$set(t.discount,"product_reduce",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"description"}},[t._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.discount.description,expression:"discount.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:t.discount.description},on:{input:function(e){e.target.composing||t.$set(t.discount,"description",e.target.value)}}})]),r("div",{staticClass:"form-group"},[r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.discount.shipping_free,expression:"discount.shipping_free"}],staticClass:"form-check-input",attrs:{type:"radio",id:"shipping_free1",name:"shipping_free"},domProps:{value:1,checked:t._q(t.discount.shipping_free,1)},on:{change:function(e){return t.$set(t.discount,"shipping_free",1)}}}),r("label",{staticClass:"form-check-label",attrs:{for:"shipping_free1"}},[t._v("免運費")])]),r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.discount.shipping_free,expression:"discount.shipping_free"}],staticClass:"form-check-input",attrs:{type:"radio",id:"shipping_free2",name:"shipping_free"},domProps:{value:0,checked:t._q(t.discount.shipping_free,0)},on:{change:function(e){return t.$set(t.discount,"shipping_free",0)}}}),r("label",{staticClass:"form-check-label",attrs:{for:"shipping_free2"}},[t._v("需運費")])])]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(t._s(t.isProcessing?"處理中...":"上傳折扣活動"))])])},i=[],s=(r("8e6e"),r("ac6a"),r("456d"),r("7f7f"),r("bd86")),o=r("2fa3");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(r,!0).forEach(function(e){Object(s["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var u={props:{initialDiscount:{type:Object,default:function(){return{}}},isProcessing:{type:Boolean,default:!1}},data:function(){return{discount:{name:"",description:"",target_price:0,percent:0,product_reduce:0,shipping_free:0,start_date:"",end_date:""},isLoading:!0}},watch:{initialDiscount:function(t){this.discount=c({},this.discount,{},t)}},created:function(){this.discount=c({},this.discount,{},this.initialDiscount)},methods:{handleSubmit:function(t){if(this.discount.name)if(this.discount.target_price){var e=t.target,r=new FormData(e);this.$emit("after-submit",r)}else o["Toast"].fire({type:"warning",title:"請填寫消費額度"});else o["Toast"].fire({type:"warning",title:"請填寫 discount 名稱"})}}},p=u,d=r("2877"),l=Object(d["a"])(p,n,i,!1,null,null,null);e["a"]=l.exports},"711a":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminDiscountForm",{attrs:{"is-processing":t.isProcessing,"initial-discount":t.discount},on:{"after-submit":t.handleAfterSubmit}})],1)},i=[],s=(r("96cf"),r("3b8d")),o=r("3dbb"),a=r("2fa3"),c={components:{AdminDiscountForm:o["a"]},data:function(){return{discount:{},isProcessing:!1}},created:function(){var t=this.$route.params.discountId;this.fetchdiscount(t)},beforeRouteUpdate:function(t,e,r){var n=t.params.discountId;this.fetchdiscount(n),r()},methods:{fetchdiscount:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var r,n,i,s,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,n="https://ec-website-api.herokuapp.com/api/admin/discounts/".concat(e),t.next=5,r.axios.get(n);case 5:if(i=t.sent,s=i.data,o=i.statusText,"OK"===o){t.next=10;break}throw new Error(o);case 10:r.discount=s.discount,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),a["Toast"].fire({type:"error",title:"無法取得 discount 資料，請稍後再試"});case 16:case"end":return t.stop()}},t,this,[[0,13]])}));function e(e){return t.apply(this,arguments)}return e}(),handleAfterSubmit:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var r,n,i,s,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,n="https://ec-website-api.herokuapp.com/api/admin/discounts/".concat(r.discount.id),r.isProcessing=!0,t.next=6,r.axios.put(n,e);case 6:if(i=t.sent,s=i.data,o=i.statusText,"OK"===o&&"success"===s.status){t.next=11;break}throw new Error(o);case 11:r.$router.push({name:"admin-discounts"}),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),this.isProcessing=!1,a["Toast"].fire({type:"error",title:"無法編輯 discount，請稍後再試"});case 18:case"end":return t.stop()}},t,this,[[0,14]])}));function e(e){return t.apply(this,arguments)}return e}()}},u=c,p=r("2877"),d=Object(p["a"])(u,n,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-af3b7f3c.f1bf0ae1.js.map