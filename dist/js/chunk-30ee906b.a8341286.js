(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30ee906b"],{"46a9":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminProductForm",{attrs:{"is-processing":t.isProcessing},on:{"after-submit":t.handleAfterSubmit}})],1)},a=[],i=(r("96cf"),r("3b8d")),s=r("b219"),n=r("2fa3"),c={components:{AdminProductForm:s["a"]},data:function(){return{isProcessing:!1}},methods:{handleAfterSubmit:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var r,o,a,i,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=this,o="https://ec-website-api.herokuapp.com/api/admin/products",r.isProcessing=!0,t.next=6,r.axios.post(o,e);case 6:if(a=t.sent,i=a.data,s=a.statusText,"OK"===s&&"success"===i.status){t.next=11;break}throw new Error(s);case 11:r.$router.push({name:"admin-products"}),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),this.isProcessing=!1,n["Toast"].fire({type:"error",title:"無法上架產品，請稍後再試"});case 18:case"end":return t.stop()}},t,this,[[0,14]])}));function e(e){return t.apply(this,arguments)}return e}()}},u=c,p=r("2877"),d=Object(p["a"])(u,o,a,!1,null,null,null);e["default"]=d.exports},b219:function(t,e,r){"use strict";var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"name"}},[t._v("Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.name,expression:"product.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:t.product.name},on:{input:function(e){e.target.composing||t.$set(t.product,"name",e.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"categoryId"}},[t._v("Category")]),r("select",{directives:[{name:"model",rawName:"v-model",value:t.product.categoryId,expression:"product.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.product,"categoryId",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("-- 請選擇 --")]),t._l(t.categories,function(e){return r("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"cost_price"}},[t._v("Cost Price")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.cost_price,expression:"product.cost_price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"cost_price",type:"number",name:"cost_price"},domProps:{value:t.product.cost_price},on:{input:function(e){e.target.composing||t.$set(t.product,"cost_price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"origin_price"}},[t._v("Origin Price")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.origin_price,expression:"product.origin_price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"origin_price",type:"number",name:"origin_price"},domProps:{value:t.product.origin_price},on:{input:function(e){e.target.composing||t.$set(t.product,"origin_price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"sell_price"}},[t._v("Sell Price")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.sell_price,expression:"product.sell_price",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"sell_price",type:"number",name:"sell_price"},domProps:{value:t.product.sell_price},on:{input:function(e){e.target.composing||t.$set(t.product,"sell_price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"stock_quantity"}},[t._v("Stock Quantity")]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.stock_quantity,expression:"product.stock_quantity",modifiers:{number:!0}}],staticClass:"form-control",attrs:{id:"stock_quantity",type:"number",name:"stock_quantity"},domProps:{value:t.product.stock_quantity},on:{input:function(e){e.target.composing||t.$set(t.product,"stock_quantity",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"description"}},[t._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.product.description,expression:"product.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:t.product.description},on:{input:function(e){e.target.composing||t.$set(t.product,"description",e.target.value)}}})]),r("div",{staticClass:"form-group"},[r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.product_status,expression:"product.product_status"}],staticClass:"form-check-input",attrs:{type:"radio",id:"product_status1",name:"product_status"},domProps:{value:!0,checked:t._q(t.product.product_status,!0)},on:{change:function(e){return t.$set(t.product,"product_status",!0)}}}),r("label",{staticClass:"form-check-label",attrs:{for:"product_status1"}},[t._v("啟用")])]),r("div",{staticClass:"form-check form-check-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.product_status,expression:"product.product_status"}],staticClass:"form-check-input",attrs:{type:"radio",id:"product_status2",name:"product_status"},domProps:{value:!1,checked:t._q(t.product.product_status,!1)},on:{change:function(e){return t.$set(t.product,"product_status",!1)}}}),r("label",{staticClass:"form-check-label",attrs:{for:"product_status2"}},[t._v("不啟用")])])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"image"}},[t._v("Image")]),t.product.image?r("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.product.image,width:"200",height:"200"}}):t._e(),r("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*"},on:{change:t.handleFileChange}})]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(t._s(t.isProcessing?"處理中...":"上架商品"))])])},a=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("7f7f"),r("96cf"),r("3b8d")),s=r("bd86"),n=r("2fa3");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(r,!0).forEach(function(e){Object(s["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var p={props:{initialProduct:{type:Object,default:function(){return{}}},isProcessing:{type:Boolean,default:!1}},data:function(){return{product:{name:"",description:"",stock_quantity:0,cost_price:0,origin_price:0,sell_price:0,product_status:!1,image:"",categoryId:""},categories:[],isLoading:!0}},watch:{initialProduct:function(t){this.product=u({},this.product,{},t)}},created:function(){this.fetchCategories(),this.product=u({},this.product,{},this.initialProduct)},methods:{fetchCategories:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,r,o,a,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=this,r="https://ec-website-api.herokuapp.com/api/admin/categories",t.next=5,e.axios.get(r);case 5:if(o=t.sent,a=o.data,i=o.statusText,"OK"===i){t.next=10;break}throw new Error(i);case 10:this.categories=a.categories,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),n["Toast"].fire({type:"error",title:" 無法取得餐廳類別，請稍後再試"});case 16:case"end":return t.stop()}},t,this,[[0,13]])}));function e(){return t.apply(this,arguments)}return e}(),handleFileChange:function(t){var e=t.target.files;if(e.length){var r=window.URL.createObjectURL(e[0]);this.product.image=r}},handleSubmit:function(t){if(this.product.name)if(this.product.categoryId){var e=t.target,r=new FormData(e);this.$emit("after-submit",r)}else n["Toast"].fire({type:"warning",title:" 請選擇產品類別"});else n["Toast"].fire({type:"warning",title:"請填寫產品名稱"})}}},d=p,l=r("2877"),m=Object(l["a"])(d,o,a,!1,null,null,null);e["a"]=m.exports}}]);
//# sourceMappingURL=chunk-30ee906b.a8341286.js.map