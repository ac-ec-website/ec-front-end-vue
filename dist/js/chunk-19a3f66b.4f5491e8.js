(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19a3f66b"],{"0bca":function(t,s,a){"use strict";var i=a("619b"),n=a.n(i);n.a},3875:function(t,s,a){"use strict";var i=a("f4f2"),n=a.n(i);n.a},"5f0b":function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row mb-4"},[a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/products"}},[t._v("\n          產品列表\n          "),a("i",{staticClass:"fas fa-box-open"})])],1)])]),a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/categories"}},[t._v("\n          產品類別\n          "),a("i",{staticClass:"fas fa-align-justify"})])],1)])]),a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/coupons"}},[t._v("\n          優惠券\n          "),a("i",{staticClass:"fas fa-ticket-alt"})])],1)])]),a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/discounts"}},[t._v("\n          特價活動\n          "),a("i",{staticClass:"fas fa-tags"})])],1)])]),a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/orders"}},[t._v("\n          訂單列表\n          "),a("i",{staticClass:"far fa-list-alt"})])],1)])]),a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/users"}},[t._v("\n          會員管理\n          "),a("i",{staticClass:"fas fa-users-cog"})])],1)])])])},n=[],e=(a("0bca"),a("2877")),c={},r=Object(e["a"])(c,i,n,!1,null,"33f1f7a3",null);s["a"]=r.exports},"619b":function(t,s,a){},d12a:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container py-5"},[a("AdminNav"),a("router-link",{staticClass:"btn btn-primary btn-block mb-4",attrs:{to:"/admin/discounts/new"}},[t._v("\n    New Discounts\n    "),a("i",{staticClass:"fas fa-plus-square"})]),a("table",{staticClass:"table"},[t._m(0),a("tbody",t._l(t.discounts,function(s){return a("tr",{key:s.id},[a("th",{attrs:{scope:"row"}},[t._v(t._s(s.id))]),a("td",[t._v(t._s(s.name))]),a("td",[t._v(t._s(s.target_price))]),a("td",[1===s.shipping_free?a("span",{staticClass:"text-success"},[t._v("免運費")]):a("span",{staticClass:"text-muted"},[t._v("需運費")])]),a("td",{staticClass:"d-flex justify-content-between"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-discount",params:{discountId:s.id}}}},[t._v("\n            Show\n            "),a("i",{staticClass:"fas fa-external-link-square-alt"})]),a("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-discount-edit",params:{discountId:s.id}}}},[t._v("\n            Edit\n            "),a("i",{staticClass:"fas fa-edit"})]),a("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteDiscount(s.id)}}},[t._v("\n            Delete\n            "),a("i",{staticClass:"fas fa-trash-alt"})])],1)])}),0)])],1)},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("#")]),a("th",{attrs:{scope:"col"}},[t._v("Discount")]),a("th",{attrs:{scope:"col"}},[t._v("消費額度")]),a("th",{attrs:{scope:"col"}},[t._v("運費繳交")]),a("th",{attrs:{scope:"col",width:"300"}},[t._v("Action")])])])}],e=(a("96cf"),a("3b8d")),c=a("5f0b"),r=a("2fa3"),o={components:{AdminNav:c["a"]},data:function(){return{discounts:[]}},created:function(){this.fetchDiscounts()},methods:{fetchDiscounts:function(){var t=Object(e["a"])(regeneratorRuntime.mark(function t(){var s,a,i,n,e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,s=this,a="https://ec-website-api.herokuapp.com/api/admin/discounts",t.next=5,s.axios.get(a);case 5:if(i=t.sent,n=i.data,e=i.statusText,"OK"===e){t.next=10;break}throw new Error(e);case 10:s.discounts=n.discounts,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),r["Toast"].fire({type:"error",title:"無法取得 discount，請稍後再試"});case 16:case"end":return t.stop()}},t,this,[[0,13]])}));function s(){return t.apply(this,arguments)}return s}(),deleteDiscount:function(){var t=Object(e["a"])(regeneratorRuntime.mark(function t(s){var a,i,n,e,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a=this,i="https://ec-website-api.herokuapp.com/api/admin/discounts/".concat(s),t.next=5,a.axios.delete(i);case 5:if(n=t.sent,e=n.data,c=n.statusText,"OK"===c&&"success"===e.status){t.next=10;break}throw new Error(c);case 10:a.discounts=this.discounts.filter(function(t){return t.id!==s}),r["Toast"].fire({type:"success",title:"刪除 discount 成功"}),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](0),r["Toast"].fire({type:"error",title:"無法取得刪除 discount，請稍後再試"});case 17:case"end":return t.stop()}},t,this,[[0,14]])}));function s(s){return t.apply(this,arguments)}return s}()}},l=o,d=(a("3875"),a("2877")),u=Object(d["a"])(l,i,n,!1,null,"e0073efa",null);s["default"]=u.exports},f4f2:function(t,s,a){}}]);
//# sourceMappingURL=chunk-19a3f66b.4f5491e8.js.map