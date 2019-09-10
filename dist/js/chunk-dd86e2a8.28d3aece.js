(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd86e2a8"],{"62b8":function(t,s,a){},"69b2":function(t,s,a){"use strict";var e=a("62b8"),i=a.n(e);i.a},"9b2a":function(t,s,a){"use strict";var e=a("2fa3");s["a"]={postOrder:function(t){return e["apiHelper"].post("/order",t)},getOrder:function(){return e["apiHelper"].get("/order")}}},d3bb:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container py-5"},[t._m(0),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card",attrs:{"data-toggle":"collapse",href:"#orderSummary","aria-expanded":"true"}},[a("div",{staticClass:"card-header py-3 text-center border"},[a("h4",[t._v("合計: NT "+t._s(t._f("currency")(t.total_amount+t.shipping_fee)))]),a("h5",[t._v("\n            購物車 (\n            "),a("span",{staticClass:"sl-cart-count ng-isolate-scope"},[t._v(t._s(t.orderItems.length))]),t._v(" 件)\n            "),t.status?t._e():a("i",{staticClass:"fa fa-angle-down",attrs:{"aria-hidden":"true"},on:{click:t.collapseStatusChange}}),t.status?a("i",{staticClass:"fa fa-angle-up",attrs:{"aria-hidden":"true"},on:{click:t.collapseStatusChange}}):t._e()])]),a("div",{staticClass:"collapse",attrs:{id:"orderSummary"}},[a("div",{staticClass:"card-body border"},[t._m(1),a("hr",{staticClass:"table-header"}),t._l(t.orderItems,function(s){return a("div",{key:s.id,staticClass:"table-row row cart-item py-1"},[a("div",{staticClass:"col-7 col-sm-4 item-information"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 px-0"},[a("router-link",{attrs:{to:{name:"product",params:{productId:s.id}}}},[a("img",{staticClass:"col-auto",attrs:{src:t._f("emptyImage")(s.image),alt:""}})])],1),a("div",{staticClass:"col-6 pl-0 my-auto"},[a("div",[t._v(t._s(s.name))])])])]),a("div",{staticClass:"col-1 col-sm-1 item-promotion"}),a("div",{staticClass:"col-4 col-sm-2 text-center item-price my-auto"},[a("div",{staticClass:"row"},[a("span",{staticClass:"col-12 col-md-12 sell_price font-weight-bold"},[t._v("NT "+t._s(t._f("currency")(s.sell_price)))]),a("span",{staticClass:"col-12 col-md-12 original-price text-muted font-italic"},[t._v("NT "+t._s(t._f("currency")(s.origin_price)))])])]),a("div",{staticClass:"col-6 col-md-2 text-center item-quantity my-auto"},[a("div",[t._v(t._s(s.OrderItem.quantity))])]),a("div",{staticClass:"col-6 col-md-3 text-center item-total my-auto"},[a("span",{staticClass:"total-count"},[t._v("NT "+t._s(t._f("currency")(s.sell_price*s.OrderItem.quantity)))])])])})],2),a("div",{staticClass:"card-body border"},[a("div",{staticClass:"row text-right"},[a("div",{staticClass:"col-12 subtotal"},[a("div",{staticClass:"col-9 d-inline-block"},[t._v("小計:")]),a("div",{staticClass:"col-3 d-inline-block"},[t._v("NT "+t._s(t._f("currency")(t.total_amount)))])]),a("div",{staticClass:"col-12 delivery-fee"},[a("div",{staticClass:"col-9 d-inline-block"},[t._v("運費:")]),a("div",{staticClass:"col-3 d-inline-block"},[t._v("NT "+t._s(t._f("currency")(t.shipping_fee)))])]),a("div",{staticClass:"col-12 total"},[a("div",{staticClass:"col-9 d-inline-block"},[t._v("合計:")]),a("div",{staticClass:"col-3 d-inline-block font-weight-bold"},[t._v("NT "+t._s(t._f("currency")(t.total_amount+t.shipping_fee)))])])])]),t._m(2)])])])]),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-12 mx-auto"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header py-3 text-center border"},[a("div",{staticClass:"row"},[t._m(3),a("div",{staticClass:"col-9 col-md-7 text-left pl-3"},[(t.payment_status,a("h4",[t._v("謝謝您！您的訂單已經成立！")])),a("span",[t._v("訂單號碼 "+t._s(t.orderId))]),a("p",[t._v("訂單確認電郵已經發送到您的電子郵箱")]),a("b",[t._v(t._s(t.order.email))])])])]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-6"},[a("h4",[t._v("訂單資訊")]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-xs-5 col-sm-4"},[t._v("訂單日期:")]),a("span",{staticClass:"col-xs-7 col-sm-8"},[t._v(t._s(t._f("detailedTime")(t.order.createdAt)))])]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-xs-5 col-sm-4"},[t._v("訂單狀態:")]),"1"===t.order_status?a("span",{staticClass:"col-xs-7 col-sm-8"},[t._v("處理中")]):"0"===t.order_status?a("span",{staticClass:"col-xs-7 col-sm-8"},[t._v("已取消")]):t._e()])]),a("div",{staticClass:"col-6"},[a("h4",[t._v("顧客資訊")]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-xs-5 col-sm-4"},[t._v("名稱:")]),a("span",{staticClass:"col-xs-7 col-sm-8"},[t._v(t._s(t.order.name))])]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-xs-5 col-sm-4"},[t._v("電話號碼:")]),a("span",{staticClass:"col-xs-7 col-sm-8"},[t._v(t._s(t.order.phone))])])])]),a("hr"),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-12 col-md-6 order-detail-section delivery-detail"},[a("h4",[t._v("送貨資訊")]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("收件人名稱:")]),a("span",{staticClass:"col-6 col-md-8"},[t._v(t._s(t.shipping.name))])]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("收件人電話號碼:")]),a("span",{staticClass:"col-6 col-md-8"},[t._v(t._s(t.shipping.phone))])]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("送貨方式:")]),"住家宅配"===t.shipping.shipping_method?a("span",{staticClass:"col-6 col-md-8"},[t._v("住家宅配")]):"其他"===t.shipping.shipping_method?a("span",{staticClass:"col-6 col-md-8"},[t._v("其他")]):t._e()]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("送貨狀態:")]),"0"===t.shipping.shipping_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("尚未配送")]):"1"===t.shipping.shipping_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("配送中")]):"2"===t.shipping.shipping_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("已送達")]):t._e()]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("地址:")]),a("span",{staticClass:"col-6 col-md-8"},[t._v(t._s(t.shipping.address))])])]),t._m(4),a("div",{staticClass:"col-12 col-md-6 order-detail-section"},[a("h4",[t._v("付款資訊")]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("付款金額:")]),a("span",{staticClass:"col-6 col-md-8"},[t._v("NT "+t._s(t._f("currency")(t.total_amount+t.shipping_fee)))])]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("付款方式:")]),"0"===t.payment_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("尚未付款")]):"1"===t.payment_status?a("span",{staticClass:"col-6 col-md-8"},[(t.payment_method="CREDIT")?a("span",[t._v("信用卡一次付清")]):(t.payment_method="VACC")?a("span",[t._v("ATM轉帳")]):(t.payment_method="CVS")?a("span",[t._v("超商代碼繳費")]):t._e()]):t._e()]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("付款狀態:")]),"0"===t.payment_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("尚未付款")]):"1"===t.payment_status?a("span",{staticClass:"col-6 col-md-8 text-danger font-weight-bold"},[t._v("已付款")]):"2"===t.payment_status?a("span",{staticClass:"col-6 col-md-8 text-danger font-weight-bold"},[t._v("信用卡驗證失敗，請重新付款")]):t._e()]),a("div",{staticClass:"row"},[a("span",{staticClass:"col-6 col-md-4"},[t._v("付款方式簡介:")]),"0"===t.payment_status?a("span",{staticClass:"col-6 col-md-8"},[t._v("無")]):"1"===t.payment_status?a("span",{staticClass:"col-6 col-md-8"},[(t.payment_method="CREDIT")?a("span",[t._v("信用卡一次付清")]):(t.payment_method="VACC")?a("span",[t._v("ATM轉帳")]):(t.payment_method="CVS")?a("span",[t._v("超商代碼繳費")]):t._e()]):t._e()])])])])]),a("div",{staticClass:"row mt-3"},[(t.payment_status,a("div",{staticClass:"col-12 col-md-12"},[a("router-link",{staticClass:"w-100 btn btn-success",attrs:{to:"/payment"}},[t._v("付款去")])],1))])])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row justify-content-center mt-3"},[a("div",{staticClass:"col-md-7 col-12"},[a("div",{staticClass:"row step"},[a("div",{staticClass:"col text-center step-point-line"},[a("span",{staticClass:"border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"},[t._v("Step 1")]),a("p",{staticClass:"text-dark h6"},[t._v("購物車")])]),a("div",{staticClass:"col text-center step-point-line"},[a("span",{staticClass:"border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"},[t._v("Step 2")]),a("p",{staticClass:"text-dark h6"},[t._v("填寫資料")])]),a("div",{staticClass:"col text-center"},[a("span",{staticClass:"bg-dark px-4 py-2 rounded-pill text-light mb-3 d-inline-block"},[t._v("Step 3")]),a("p",{staticClass:"text-dark h6"},[t._v("訂單確認與付款")])])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row table-header"},[a("div",{staticClass:"col-sm-4"},[t._v("商品資料")]),a("div",{staticClass:"col-sm-1"},[t._v("優惠")]),a("div",{staticClass:"col-sm-2 text-center"},[t._v("單件價格")]),a("div",{staticClass:"col-sm-2 text-center"},[t._v("數量")]),a("div",{staticClass:"col-sm-3 text-center item-total"},[t._v("小計")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card-footer text-center"},[a("i",{staticClass:"fa fa-angle-up",attrs:{"aria-hidden":"true"}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-3 col-md-5 my-auto text-right"},[a("i",{staticClass:"fas fa-check",attrs:{"aria-hidden":"true"}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-12 hidden-Except-Mobile"},[a("hr")])}],c=(a("96cf"),a("3b8d")),l=a("9b2a"),o=a("2708"),r=a("2fa3"),n={mixins:[o["c"],o["a"],o["d"]],data:function(){return{order:{},orderId:0,order_status:null,orderItems:[],total_amount:0,payment:[],payment_status:null,payment_method:null,shipping:[],shipping_fee:0,status:!1,isProcessing:!1}},created:function(){this.fetchOrder()},methods:{fetchOrder:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var s,a,e,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,s=this,t.next=4,l["a"].getOrder();case 4:if(a=t.sent,e=a.data,i=a.statusText,"OK"===i){t.next=9;break}throw new Error(i);case 9:s.order=e.order,s.orderId=e.order.id,s.order_status=e.order.order_status,s.orderItems=e.order.items,s.orderItems.map(function(t){return t.id*t.id}).reduce(function(t,s){return t+s}),s.total_amount=e.order.total_amount,s.payment=e.payment,s.payment_status=e.payment.payment_status,s.payment_method=e.payment.payment_method,s.shipping=e.shipping,s.shipping_fee=e.shipping.shipping_fee,s.$store.commit("setNavbarCartItemNumber",0),t.next=26;break;case 23:t.prev=23,t.t0=t["catch"](0),this.orderItems.length>1&&r["Toast"].fire({type:"error",title:"無法取得訂單資料，請稍後再試"});case 26:case"end":return t.stop()}},t,this,[[0,23]])}));function s(){return t.apply(this,arguments)}return s}(),collapseStatusChange:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.status=!this.status;case 1:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}()}},d=n,p=(a("69b2"),a("2877")),_=Object(p["a"])(d,e,i,!1,null,null,null);s["default"]=_.exports}}]);
//# sourceMappingURL=chunk-dd86e2a8.28d3aece.js.map