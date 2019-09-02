(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4798aaf9"],{"049f":function(t,e,a){"use strict";var r=a("4f4f"),s=a.n(r);s.a},"4f4f":function(t,e,a){},b789:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container py-5"},[t._m(0),t.cartItems.length<1?a("div",{staticClass:"row mt-5"},[a("div",{staticClass:"col-md-6 col-12 mx-auto"},[a("i",{staticClass:"fa fa-shopping-cart fa-5",attrs:{"aria-hidden":"true"}}),a("div",{staticClass:"mt-3 text-center"},[a("h5",[t._v("你的購物車是空的")]),a("p",[t._v("記得加入商品到你的購物車")]),a("router-link",{staticClass:"btn btn-success btn-large",attrs:{to:"/products"}},[t._v("繼續購物")])],1)])]):a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("h3",[t._v("\n            購物車 (\n            "),a("span",{staticClass:"sl-cart-count ng-isolate-scope"},[t._v(t._s(t.cartItems.length))]),t._v(" 件)\n          ")])]),a("div",{staticClass:"card-body"},[t._m(1),a("hr",{staticClass:"hidden-In-Mobile"}),t._l(t.cartItems,function(e){return a("div",{key:e.id,staticClass:"table-row row cart-item py-1"},[a("div",{staticClass:"col-7 col-md-3 item-information"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 px-0"},[a("router-link",{attrs:{to:{name:"product",params:{productId:e.id}}}},[a("img",{staticClass:"col-auto",attrs:{src:t._f("emptyImage")(e.image),alt:""}})])],1),a("div",{staticClass:"col-6 pl-0 my-auto"},[a("div",[t._v(t._s(e.name))])])])]),a("div",{staticClass:"col-1 col-md-1 item-promotion"}),a("div",{staticClass:"col-4 col-md-2 text-center item-price my-auto"},[a("div",{staticClass:"row"},[a("span",{staticClass:"col-12 col-md-12 sell_price font-weight-bold"},[t._v("NT "+t._s(t._f("currency")(e.sell_price)))]),a("span",{staticClass:"col-12 col-md-12 original-price text-muted font-italic"},[t._v("NT "+t._s(t._f("currency")(e.origin_price)))])])]),a("div",{staticClass:"col-12 col-md-3 text-center item-quantity my-auto"},[a("div",{staticClass:"input-group"},[a("span",{staticClass:"input-group-btn"},[a("div",{staticClass:"btn btn-default btn-quantity-decrease",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.subItemFromCart(t.cartId,e.CartItem.id)}}},[a("i",{staticClass:"fa fa-minus"})])]),a("span",{staticClass:"form-control text-center"},[t._v(t._s(e.CartItem.quantity))]),a("span",{staticClass:"input-group-btn"},[a("div",{staticClass:"btn btn-default btn-quantity-increase",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.addItemToCart(t.cartId,e.CartItem.id)}}},[a("i",{staticClass:"fa fa-plus"})])])])]),a("div",{staticClass:"col-8 col-md-2 text-center item-total my-auto"},[a("span",{staticClass:"total-count"},[t._v("NT "+t._s(t._f("currency")(e.sell_price*e.CartItem.quantity)))])]),a("div",{staticClass:"col-4 col-md-1 text-center item-action my-auto"},[a("a",{staticClass:"btn btn-link btn-remove-cart-item",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteItemFromCart(t.cartId,e.CartItem.id)}}},[a("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}})])])])})],2)])]),a("div",{staticClass:"col-12 mt-5"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-7 col-md-8"},[a("div",{staticClass:"card"},[t._m(2),a("div",{staticClass:"card-body"},[a("form",{attrs:{name:"cartForm"}},[a("div",{staticClass:"form-group"},[t._m(3),a("span",{staticClass:"select-cart-form"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.shipping_method,expression:"shipping_method"}],staticClass:"form-control",attrs:{id:"cart-delivery-method",required:""},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.shipping_method=e.target.multiple?a:a[0]},function(e){return t.TrackShippingMethod()}]}},[a("option",{attrs:{name:"cartDeliveryMethod",value:"住家宅配"}},[t._v("住家宅配")]),a("option",{attrs:{name:"cartDeliveryMethod",value:"其他"}},[t._v("其他")])])])])])])])]),a("div",{staticClass:"col-sm-5 col-md-4"},[a("div",{staticClass:"card text-right"},[t._m(4),a("div",{staticClass:"card-body"},[a("div",{staticClass:"subtotal ng-scope"},[a("span",{staticClass:"pull-left"},[t._v("小計:")]),a("span",{staticClass:"pull-right"},[t._v("NT "+t._s(t._f("currency")(t.total_amount)))])]),a("div",{staticClass:"delivery-fee ng-scope"},[a("span",{staticClass:"pull-left"},[t._v("運費:")]),a("span",{staticClass:"pull-right"},[t._v("NT "+t._s(t._f("currency")(t.shipping_fee)))])]),a("hr",{staticClass:"ng-scope"}),a("div",{staticClass:"total ng-scope"},[a("span",{staticClass:"pull-left"},[t._v("\n                  合計\n                  "),a("span",{staticClass:"hidden-sm hidden-md hidden-lg"},[t._v("("+t._s(t.cartItems.length)+" 件)")]),t._v(":\n                ")]),a("span",{staticClass:"pull-right font-weight-bold"},[t._v("NT "+t._s(t._f("currency")(t.total_amount+t.shipping_fee)))])])])])]),a("div",{staticClass:"col-12"},[a("button",{staticClass:"btn btn-success btn-block mt-3",attrs:{type:"button"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.putCart(e)}}},[t._v("前往結帳")])])])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row justify-content-center mt-3"},[a("div",{staticClass:"col-md-7 col-12"},[a("div",{staticClass:"row step"},[a("div",{staticClass:"col text-center step-point-line step-point"},[a("span",{staticClass:"bg-dark px-4 py-2 rounded-pill text-light mb-3 d-inline-block"},[t._v("Step 1")]),a("p",{staticClass:"text-dark h6"},[t._v("購物車")])]),a("div",{staticClass:"col text-center step-point-line"},[a("span",{staticClass:"border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"},[t._v("Step 2")]),a("p",{staticClass:"text-dark h6"},[t._v("填寫資料")])]),a("div",{staticClass:"col text-center"},[a("span",{staticClass:"border bg-secondary px-4 py-2 rounded-pill text-dark mb-3 d-inline-block"},[t._v("Step 3")]),a("p",{staticClass:"text-dark h6"},[t._v("訂單確認與與付款")])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row hidden-In-Mobile"},[a("div",{staticClass:"col-sm-3"},[t._v("商品資料")]),a("div",{staticClass:"col-sm-1"},[t._v("優惠")]),a("div",{staticClass:"col-sm-2 text-center"},[t._v("單件價格")]),a("div",{staticClass:"col-sm-3 text-center"},[t._v("數量")]),a("div",{staticClass:"col-sm-2 text-center item-total"},[t._v("小計")]),a("div",{staticClass:"col-sm-1"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header"},[a("h3",[t._v("選擇配送方式")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"cart-delivery-method"}},[t._v("\n                    配送方式\n                    "),a("span",{staticClass:"text-danger"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header"},[a("h3",[t._v("訂單資訊")])])}],n=(a("96cf"),a("3b8d")),i=a("cc17"),c=a("2708"),o=a("2fa3"),l={mixins:[c["a"],c["d"]],data:function(){return{cartId:null,cartItems:[],total_amount:0,shipping_fee:60,shipping_method:"住家宅配"}},created:function(){this.fetchCart()},methods:{fetchCart:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,a,r,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=this,t.next=4,i["a"].getCart();case 4:if(a=t.sent,r=a.data,s=a.statusText,"error"!==r.status){t.next=9;break}return t.abrupt("return");case 9:if("OK"===s){t.next=11;break}throw new Error(s);case 11:if(e.cartId=r.cart.id,e.cartItems=r.cart.items,e.$store.commit("setNavbarCartItemNumber",e.cartItems.length),!(e.cartItems.length<1)){t.next=16;break}return t.abrupt("return");case 16:e.cartItems.map(function(t){return t.id*t.id}).reduce(function(t,e){return t+e}),e.total_amount=r.total_amount,t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](0),o["Toast"].fire({type:"error",title:"無法取得購物車資料，請稍後再試"});case 23:case"end":return t.stop()}},t,this,[[0,20]])}));function e(){return t.apply(this,arguments)}return e}(),TrackShippingMethod:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this,"住家宅配"===e.shipping_method&&(e.shipping_fee=60),"其他"===e.shipping_method&&(e.shipping_fee=100);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),addItemToCart:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,a){var r,s,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,t.next=4,i["a"].addItemToCart(e,a);case 4:if(s=t.sent,s.data,n=s.statusText,"OK"===n){t.next=9;break}throw new Error(n);case 9:r.fetchCart(e),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),o["Toast"].fire({type:"error",title:"無法增加商品數量，請稍後再試"});case 15:case"end":return t.stop()}},t,this,[[0,12]])}));function e(e,a){return t.apply(this,arguments)}return e}(),subItemFromCart:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,a){var r,s,n,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,t.next=4,i["a"].subItemFromCart(e,a);case 4:if(s=t.sent,n=s.data,c=s.statusText,0===n.cartItem[0].quantity&&r.deleteItemFromCart(e,a),"OK"===c){t.next=10;break}throw new Error(c);case 10:r.fetchCart(e),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),o["Toast"].fire({type:"error",title:"無法刪減商品數量，請稍後再試"});case 16:case"end":return t.stop()}},t,this,[[0,13]])}));function e(e,a){return t.apply(this,arguments)}return e}(),deleteItemFromCart:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,a){var r,s,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,t.next=4,i["a"].deleteItemFromCart(e,a);case 4:if(s=t.sent,s.data,n=s.statusText,"OK"===n){t.next=9;break}throw new Error(n);case 9:r.fetchCart(e),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),o["Toast"].fire({type:"error",title:"無法移除該商品，請稍後再試"});case 15:case"end":return t.stop()}},t,this,[[0,12]])}));function e(e,a){return t.apply(this,arguments)}return e}(),putCart:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,a,r,s,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=this,a={shipping_method:e.shipping_method},t.next=5,i["a"].putCart(a);case 5:if(r=t.sent,s=r.data,n=r.statusText,"OK"===n&&"success"===s.status){t.next=10;break}throw new Error(n);case 10:o["Toast"].fire({type:"success",title:"配送資訊已更新"}),e.$router.push({name:"orderCreate"}),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](0),o["Toast"].fire({type:"error",title:"無法更新配送資訊，請稍後再試"});case 17:case"end":return t.stop()}},t,this,[[0,14]])}));function e(){return t.apply(this,arguments)}return e}()}},u=l,d=(a("049f"),a("2877")),p=Object(d["a"])(u,r,s,!1,null,null,null);e["default"]=p.exports},cc17:function(t,e,a){"use strict";var r=a("2fa3");e["a"]={getCart:function(){return r["apiHelper"].get("/cart")},addToCart:function(t,e){return r["apiHelper"].post("/cart",{productId:t,quantity:e})},addItemToCart:function(t,e){return r["apiHelper"].post("/cart/".concat(t,"/cartItem/").concat(e,"/add"),{cartId:t,cartItemId:e})},subItemFromCart:function(t,e){return r["apiHelper"].post("/cart/".concat(t,"/cartItem/").concat(e,"/sub"),{cartId:t,cartItemId:e})},deleteItemFromCart:function(t,e){return r["apiHelper"].delete("/cart/".concat(t,"/cartItem/").concat(e),{cartId:t,cartItemId:e})},putCart:function(t){return r["apiHelper"].put("/cart",t)}}}}]);
//# sourceMappingURL=chunk-4798aaf9.636c7a51.js.map