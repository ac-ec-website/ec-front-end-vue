(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4548098e"],{"0750":function(t,s,e){"use strict";e.r(s);var r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container py-5"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4"},[e("h5",[t._v("訂單編號："+t._s(t.order.id))]),e("p",[t._v("買者姓名："+t._s(t.order.name))]),e("p",[t._v("連絡電話："+t._s(t.order.phone))]),e("p",[t._v("聯絡地址："+t._s(t.order.address))]),e("p",[t._v("購買日期："+t._s(t._f("dateTime")(t.order.createdAt)))]),e("p",[t._v("消費總額："+t._s(t._f("currency")(t.order.total_amount)))]),e("hr"),e("div",{staticClass:"mb-3"},[t._v("\n        付款狀態：\n        "),"1"===t.order.payment_status?e("strong",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-muted"},[t._v("尚未付款")])]),e("div",{staticClass:"mb-3"},[t._v("\n        出貨狀態：\n        "),e("strong",{directives:[{name:"show",rawName:"v-show",value:"0"===t.order.shipping_status,expression:"order.shipping_status === '0'"}],staticClass:"text-muted"},[t._v("處理中")]),e("strong",{directives:[{name:"show",rawName:"v-show",value:"1"===t.order.shipping_status,expression:"order.shipping_status === '1'"}],staticClass:"text-danger"},[t._v("配送中")]),e("strong",{directives:[{name:"show",rawName:"v-show",value:"2"===t.order.shipping_status,expression:"order.shipping_status === '2'"}],staticClass:"text-success"},[t._v("已到貨")])]),e("a",{attrs:{href:"#"},on:{click:function(s){return t.$router.back()}}},[t._v("回上一頁")])]),e("div",{staticClass:"col-md-8"},t._l(t.order.items,function(s){return e("div",{key:s.id,staticClass:"card mb-3"},[e("div",{staticClass:"row no-gutters"},[e("div",{staticClass:"col-md-3"},[e("img",{staticClass:"card-img",attrs:{src:t._f("emptyImage")(s.image)}})]),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"card-body"},[e("p",[t._v("商品名稱："+t._s(s.name))]),e("p",[t._v("購買數量："+t._s(s.OrderItem.quantity))]),e("span",[t._v("商品總額："+t._s(s.OrderItem.price))])])])])])}),0)])])},a=[],i=(e("96cf"),e("3b8d")),n=e("2708"),c=e("2fa3"),o={mixins:[n["b"],n["a"],n["d"]],data:function(){return{order:{}}},created:function(){var t=this.$route.params.orderId;this.fetchOrder(t)},beforeRouteUpdate:function(t,s,e){var r=t.params.orderId;this.fetchOrder(r),e()},methods:{fetchOrder:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(s){var e,r,a,i,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=this,r="https://ec-website-api.herokuapp.com/api/admin/orders/".concat(s),t.next=5,e.axios.get(r);case 5:if(a=t.sent,i=a.data,n=a.statusText,"OK"===n){t.next=10;break}throw new Error(n);case 10:e.order=i.order,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),c["Toast"].fire({type:"error",title:"無法取得訂單資料，請稍後再試"});case 16:case"end":return t.stop()}},t,this,[[0,13]])}));function s(s){return t.apply(this,arguments)}return s}()}},d=o,u=(e("b6bb"),e("2877")),p=Object(u["a"])(d,r,a,!1,null,"75b44b18",null);s["default"]=p.exports},a826:function(t,s,e){},b6bb:function(t,s,e){"use strict";var r=e("a826"),a=e.n(r);a.a}}]);
//# sourceMappingURL=chunk-4548098e.a7caa04d.js.map