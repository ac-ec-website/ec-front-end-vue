(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-088266a2"],{"09b0":function(t,e,s){},"0b7c":function(t,e,s){"use strict";var n=s("09b0"),i=s.n(n);i.a},"5f0b":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dashboard"},[s("div",{staticClass:"admin"},[s("h5",[t._v("管理員")]),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/products"}},[s("i",{staticClass:"fas fa-box-open"}),t._v("\n        產品列表\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/categories"}},[s("i",{staticClass:"fas fa-align-justify"}),t._v("\n        產品類別\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/coupons"}},[s("i",{staticClass:"fas fa-ticket-alt"}),t._v("\n        優惠券\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/discounts"}},[s("i",{staticClass:"fas fa-tags"}),t._v("\n        特價活動\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/orders"}},[s("i",{staticClass:"far fa-list-alt"}),t._v("\n        訂單列表\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/dashboard"}},[s("i",{staticClass:"fas fa-chart-line"}),t._v("\n        銷售報表\n      ")])],1),s("div",{},[s("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/users"}},[s("i",{staticClass:"fas fa-users-cog"}),t._v("\n        會員管理\n      ")])],1)])])},i=[],r=(s("0b7c"),s("2877")),a={},o=Object(r["a"])(a,n,i,!1,null,"f4b4e38e",null);e["a"]=o.exports},"6e64":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("AdminNav",{staticClass:"sidebar col-md-2 d-none d-md-block bg-light"}),s("div",{staticClass:"container col-md-9 ml-sm-auto col-lg-10"},[s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.users,function(e){return s("tr",{key:e.id},[s("th",{attrs:{scope:"row"}},[t._v(t._s(e.id))]),s("td",[t._v(t._s(e.email))]),s("td",[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"user.isEditing"}]},[s("div",{staticClass:"input-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.role,expression:"user.role"}],staticClass:"custom-select",on:{change:function(s){var n=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(e,"role",s.target.multiple?n:n[0])}}},[s("option",[t._v("admin")]),s("option",[t._v("user")])])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!user.isEditing"}]},[t._v(t._s(e.role))])]),s("td",[e.isSelf?s("div"):s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"user.isEditing"}]},[s("button",{staticClass:"btn btn-outline-dark btn-sm",on:{click:function(s){return t.updateUserRole(e.id)}}},[t._v("Done")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!user.isEditing"}]},[s("button",{staticClass:"btn btn-outline-dark btn-sm",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.editUserRole(e.id)}}},[t._v("Edit")])])])])])}),0)])])],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticClass:"thead-dark"},[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("#")]),s("th",{attrs:{scope:"col"}},[t._v("Email")]),s("th",{attrs:{scope:"col"}},[t._v("Role")]),s("th",{attrs:{scope:"col"}},[t._v("Action")])])])}],r=(s("8e6e"),s("ac6a"),s("456d"),s("bd86")),a=(s("96cf"),s("3b8d")),o=s("d427"),c=s("5f0b");function u(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,n)}return s}function l(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?u(s,!0).forEach(function(e){Object(r["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):u(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var d=s("2fa3"),v=d.Toast,f={components:{AdminNav:c["a"]},data:function(){return{users:{}}},created:function(){this.fetchUser()},methods:{fetchUser:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,s,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,o["a"].getUsers();case 3:s=t.sent,n=s.data,e.users=n.user.map(function(t){return t.id===e.$store.state.currentUser.id?l({},t,{isEditing:!1,isSelf:!0}):l({},t,{isEditing:!1,isSelf:!1})});case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),editUserRole:function(t){var e=this;e.users=e.users.map(function(e){return e.id===t?l({},e,{isEditing:!0}):e})},updateUserRole:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var s,n,i,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=this,n="",s.users=s.users.map(function(t){return t.id===e?(n=t.role,l({},t,{isEditing:!1})):t}),t.next=5,o["a"].putUser({id:e,role:n});case 5:i=t.sent,r=i.statusText,"OK"===r&&v.fire({type:"success",title:"更新成功！"}),this.fetchUser();case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}},p=f,b=(s("f8f0"),s("2877")),m=Object(b["a"])(p,n,i,!1,null,"6a3142ad",null);e["default"]=m.exports},bd3e:function(t,e,s){},f8f0:function(t,e,s){"use strict";var n=s("bd3e"),i=s.n(n);i.a}}]);
//# sourceMappingURL=chunk-088266a2.fe7fa576.js.map