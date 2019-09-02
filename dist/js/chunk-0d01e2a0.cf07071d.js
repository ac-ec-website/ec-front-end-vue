(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d01e2a0"],{"0bca":function(t,s,e){"use strict";var i=e("619b"),a=e.n(i);a.a},"5f0b":function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row mb-4"},[e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/products"}},[t._v("\n          產品列表\n          "),e("i",{staticClass:"fas fa-box-open"})])],1)])]),e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/categories"}},[t._v("\n          產品類別\n          "),e("i",{staticClass:"fas fa-align-justify"})])],1)])]),e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/coupons"}},[t._v("\n          優惠券\n          "),e("i",{staticClass:"fas fa-ticket-alt"})])],1)])]),e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/discounts"}},[t._v("\n          特價活動\n          "),e("i",{staticClass:"fas fa-tags"})])],1)])]),e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/orders"}},[t._v("\n          訂單列表\n          "),e("i",{staticClass:"far fa-list-alt"})])],1)])]),e("div",{staticClass:"col-sm-2"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("router-link",{staticClass:"btn btn-link",attrs:{to:"/admin/users"}},[t._v("\n          會員管理\n          "),e("i",{staticClass:"fas fa-users-cog"})])],1)])])])},a=[],r=(e("0bca"),e("2877")),n={},c=Object(r["a"])(n,i,a,!1,null,"33f1f7a3",null);s["a"]=c.exports},"619b":function(t,s,e){},"6e64":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container py-5"},[e("AdminNav"),e("table",{staticClass:"table"},[t._m(0),e("tbody",t._l(t.users,function(s){return e("tr",{key:s.id},[e("th",{attrs:{scope:"row"}},[t._v(t._s(s.id))]),e("td",[t._v(t._s(s.email))]),e("td",[e("div",{directives:[{name:"show",rawName:"v-show",value:s.isEditing,expression:"user.isEditing"}]},[e("div",{staticClass:"input-group"},[e("select",{directives:[{name:"model",rawName:"v-model",value:s.role,expression:"user.role"}],staticClass:"custom-select",on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var s="_value"in t?t._value:t.value;return s});t.$set(s,"role",e.target.multiple?i:i[0])}}},[e("option",[t._v("admin")]),e("option",[t._v("user")])])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:!s.isEditing,expression:"!user.isEditing"}]},[t._v(t._s(s.role))])]),e("td",[s.isSelf?e("div"):e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:s.isEditing,expression:"user.isEditing"}]},[e("button",{staticClass:"btn btn-outline-dark btn-sm",on:{click:function(e){return t.updateUserRole(s.id)}}},[t._v("Done")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:!s.isEditing,expression:"!user.isEditing"}]},[e("button",{staticClass:"btn btn-outline-dark btn-sm",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.editUserRole(s.id)}}},[t._v("Edit")])])])])])}),0)])],1)},a=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("#")]),e("th",{attrs:{scope:"col"}},[t._v("Email")]),e("th",{attrs:{scope:"col"}},[t._v("Role")]),e("th",{attrs:{scope:"col"}},[t._v("Action")])])])}],r=(e("8e6e"),e("ac6a"),e("456d"),e("bd86")),n=(e("96cf"),e("3b8d")),c=e("5f0b");function o(t,s){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);s&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),e.push.apply(e,i)}return e}function l(t){for(var s=1;s<arguments.length;s++){var e=null!=arguments[s]?arguments[s]:{};s%2?o(e,!0).forEach(function(s){Object(r["a"])(t,s,e[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(e).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(e,s))})}return t}var u=e("2fa3"),d=u.Toast,v={components:{AdminNav:c["a"]},data:function(){return{users:{}}},created:function(){this.fetchUser()},methods:{fetchUser:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var s,e,i,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=this,t.next=3,s.axios.get("https://ec-website-api.herokuapp.com/api/admin/users");case 3:e=t.sent,i=e.data,e.statusText,console.log(i),this.users=i.user.map(function(t){return console.log(t.id,a.$store.state.currentUser.id),t.id===a.$store.state.currentUser.id?l({},t,{isEditing:!1,isSelf:!0}):l({},t,{isEditing:!1,isSelf:!1})});case 8:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),editUserRole:function(t){this.users=this.users.map(function(s){return s.id===t?l({},s,{isEditing:!0}):s})},updateUserRole:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(s){var e,i,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,i="",this.users=this.users.map(function(t){return t.id===s?(i=t.role,l({},t,{isEditing:!1})):t}),t.next=5,e.axios.put("https://ec-website-api.herokuapp.com/api/admin/user",{id:s,role:i});case 5:a=t.sent,a.data,r=a.statusText,"OK"===r&&d.fire({type:"success",title:"更新成功！"}),this.fetchUser();case 10:case"end":return t.stop()}},t,this)}));function s(s){return t.apply(this,arguments)}return s}()}},p=v,f=e("2877"),b=Object(f["a"])(p,i,a,!1,null,null,null);s["default"]=b.exports}}]);
//# sourceMappingURL=chunk-0d01e2a0.cf07071d.js.map