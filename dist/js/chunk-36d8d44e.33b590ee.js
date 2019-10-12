(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36d8d44e"],{"671d":function(t,e,n){"use strict";var s=n("2fa3");e["a"]={getDiscounts:function(){return s["apiHelper"].get("/admin/discounts")},getDiscount:function(t){return s["apiHelper"].get("/admin/discounts/".concat(t))},postDiscount:function(t){return s["apiHelper"].post("/admin/discounts",t)},putDiscount:function(t,e){return s["apiHelper"].put("/admin/discounts/".concat(t),e)},deleteDiscount:function(t){return s["apiHelper"].delete("/admin/discounts/".concat(t))}}},b6b2:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container py-5"},[t.isLoading?n("Spinner"):n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[n("h3",[t._v(t._s(t.discount.name))]),n("p",[t._v(t._s(t.discount.description))]),n("p",{directives:[{name:"show",rawName:"v-show",value:0===t.discount.type,expression:"discount.type === 0"}]},[t._v("優惠方案：免運費")]),n("p",{directives:[{name:"show",rawName:"v-show",value:1===t.discount.type,expression:"discount.type === 1"}]},[t._v("優惠方案：扣款")]),n("p",{directives:[{name:"show",rawName:"v-show",value:2===t.discount.type,expression:"discount.type === 2"}]},[t._v("優惠方案：打折")]),n("p",[t._v("消費額度："+t._s(t._f("currency")(t.discount.target_price)))]),n("p",[t._v("活動開始："+t._s(t._f("dateTime")(t.discount.start_date)))]),n("p",[t._v("活動結束："+t._s(t._f("dateTime")(t.discount.end_date)))]),n("hr"),n("p",{directives:[{name:"show",rawName:"v-show",value:1===t.discount.type,expression:"discount.type === 1"}]},[t._v("折抵費用："+t._s(t._f("currency")(t.discount.product_reduce)))]),n("p",{directives:[{name:"show",rawName:"v-show",value:2===t.discount.type,expression:"discount.type === 2"}]},[t._v("折抵："+t._s(t.discount.percent)+" %")]),n("div",{staticClass:"mb-3"},[1===t.discount.shipping_free?n("strong",{staticClass:"text-success"},[t._v("免運費")]):n("span",{staticClass:"text-muted"},[t._v("需運費")])]),n("a",{attrs:{href:"#"},on:{click:function(e){return t.$router.back()}}},[t._v("回上一頁")])])])],1)},i=[],c=(n("96cf"),n("3b8d")),a=n("671d"),r=n("2375"),o=n("2708"),u=n("2fa3"),d={components:{Spinner:r["a"]},mixins:[o["b"],o["a"]],data:function(){return{discount:{},isLoading:!1}},created:function(){var t=this.$route.params.discountId;this.fetchDiscount(t)},beforeRouteUpdate:function(t,e,n){var s=t.params.discountId;this.fetchDiscount(s),n()},methods:{fetchDiscount:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var n,s,i,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=this,t.prev=1,n.isLoading=!0,t.next=5,a["a"].getDiscount(e);case 5:if(s=t.sent,i=s.data,c=s.statusText,"OK"===c){t.next=10;break}throw new Error(c);case 10:n.discount=i.discount,n.isLoading=!1,t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](1),u["Toast"].fire({type:"error",title:"無法取得 discount 資料，請稍後再試"});case 17:case"end":return t.stop()}},t,this,[[1,14]])}));function e(e){return t.apply(this,arguments)}return e}()}},p=d,v=n("2877"),f=Object(v["a"])(p,s,i,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-36d8d44e.33b590ee.js.map