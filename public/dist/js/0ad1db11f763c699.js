"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[859],{5714:(e,s,t)=>{t.d(s,{ZP:()=>_});var r=t(9669),a=t.n(r),o=Object.defineProperty,i=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,l=Object.prototype.propertyIsEnumerable,c=(e,s,t)=>s in e?o(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,u=(e,s)=>{for(var t in s||(s={}))i.call(s,t)&&c(e,t,s[t]);if(n)for(var t of n(s))l.call(s,t)&&c(e,t,s[t]);return e};const m=e=>void 0===e,d=e=>Array.isArray(e),f=e=>e&&"number"==typeof e.size&&"string"==typeof e.type&&"function"==typeof e.slice,p=(e,s,t,r)=>((s=s||{}).indices=!m(s.indices)&&s.indices,s.nullsAsUndefineds=!m(s.nullsAsUndefineds)&&s.nullsAsUndefineds,s.booleansAsIntegers=!m(s.booleansAsIntegers)&&s.booleansAsIntegers,s.allowEmptyArrays=!m(s.allowEmptyArrays)&&s.allowEmptyArrays,t=t||new FormData,m(e)||(null===e?s.nullsAsUndefineds||t.append(r,""):(e=>"boolean"==typeof e)(e)?s.booleansAsIntegers?t.append(r,e?1:0):t.append(r,e):d(e)?e.length?e.forEach(((e,a)=>{const o=r+"["+(s.indices?a:"")+"]";p(e,s,t,o)})):s.allowEmptyArrays&&t.append(r+"[]",""):(e=>e instanceof Date)(e)?t.append(r,e.toISOString()):!(e=>e===Object(e))(e)||(e=>f(e)&&"string"==typeof e.name&&("object"==typeof e.lastModifiedDate||"number"==typeof e.lastModified))(e)||f(e)?t.append(r,e):Object.keys(e).forEach((a=>{const o=e[a];if(d(o))for(;a.length>2&&a.lastIndexOf("[]")===a.length-2;)a=a.substring(0,a.length-2);p(o,s,t,r?r+"["+a+"]":a)}))),t);var h={serialize:p};function v(e){if(null===e||"object"!=typeof e)return e;const s=Array.isArray(e)?[]:{};return Object.keys(e).forEach((t=>{s[t]=v(e[t])})),s}function y(e){return Array.isArray(e)?e:[e]}function g(e){return e instanceof File||e instanceof Blob||e instanceof FileList||"object"==typeof e&&null!==e&&void 0!==Object.values(e).find((e=>g(e)))}class b{constructor(){this.errors={},this.errors={}}set(e,s){"object"==typeof e?this.errors=e:this.set(u(u({},this.errors),{[e]:y(s)}))}all(){return this.errors}has(e){return Object.prototype.hasOwnProperty.call(this.errors,e)}hasAny(...e){return e.some((e=>this.has(e)))}any(){return Object.keys(this.errors).length>0}get(e){if(this.has(e))return this.getAll(e)[0]}getAll(e){return y(this.errors[e]||[])}only(...e){const s=[];return e.forEach((e=>{const t=this.get(e);t&&s.push(t)})),s}flatten(){return Object.values(this.errors).reduce(((e,s)=>e.concat(s)),[])}clear(e){const s={};e&&Object.keys(this.errors).forEach((t=>{t!==e&&(s[t]=this.errors[t])})),this.set(s)}}class w{constructor(e={}){this.originalData={},this.busy=!1,this.successful=!1,this.recentlySuccessful=!1,this.recentlySuccessfulTimeoutId=void 0,this.errors=new b,this.progress=void 0,this.update(e)}static make(e){return new this(e)}update(e){this.originalData=Object.assign({},this.originalData,v(e)),Object.assign(this,e)}fill(e={}){this.keys().forEach((s=>{this[s]=e[s]}))}data(){return this.keys().reduce(((e,s)=>u(u({},e),{[s]:this[s]})),{})}keys(){return Object.keys(this).filter((e=>!w.ignore.includes(e)))}startProcessing(){this.errors.clear(),this.busy=!0,this.successful=!1,this.progress=void 0,this.recentlySuccessful=!1,clearTimeout(this.recentlySuccessfulTimeoutId)}finishProcessing(){this.busy=!1,this.successful=!0,this.progress=void 0,this.recentlySuccessful=!0,this.recentlySuccessfulTimeoutId=setTimeout((()=>{this.recentlySuccessful=!1}),w.recentlySuccessfulTimeout)}clear(){this.errors.clear(),this.successful=!1,this.recentlySuccessful=!1,this.progress=void 0,clearTimeout(this.recentlySuccessfulTimeoutId)}reset(){Object.keys(this).filter((e=>!w.ignore.includes(e))).forEach((e=>{this[e]=v(this.originalData[e])}))}get(e,s={}){return this.submit("get",e,s)}post(e,s={}){return this.submit("post",e,s)}patch(e,s={}){return this.submit("patch",e,s)}put(e,s={}){return this.submit("put",e,s)}delete(e,s={}){return this.submit("delete",e,s)}submit(e,s,t={}){return this.startProcessing(),t=u({data:{},params:{},url:this.route(s),method:e,onUploadProgress:this.handleUploadProgress.bind(this)},t),"get"===e.toLowerCase()?t.params=u(u({},this.data()),t.params):(t.data=u(u({},this.data()),t.data),g(t.data)&&!t.transformRequest&&(t.transformRequest=[e=>h.serialize(e)])),new Promise(((e,s)=>{(w.axios||a()).request(t).then((s=>{this.finishProcessing(),e(s)})).catch((e=>{this.handleErrors(e),s(e)}))}))}handleErrors(e){this.busy=!1,this.progress=void 0,e.response&&this.errors.set(this.extractErrors(e.response))}extractErrors(e){return e.data&&"object"==typeof e.data?e.data.errors?u({},e.data.errors):e.data.message?{error:e.data.message}:u({},e.data):{error:w.errorMessage}}handleUploadProgress(e){this.progress={total:e.total,loaded:e.loaded,percentage:Math.round(100*e.loaded/e.total)}}route(e,s={}){let t=e;return Object.prototype.hasOwnProperty.call(w.routes,e)&&(t=decodeURI(w.routes[e])),"object"!=typeof s&&(s={id:s}),Object.keys(s).forEach((e=>{t=t.replace(`{${e}}`,s[e])})),t}onKeydown(e){const s=e.target;s.name&&this.errors.clear(s.name)}}w.routes={},w.errorMessage="Something went wrong. Please try again.",w.recentlySuccessfulTimeout=2e3,w.ignore=["busy","successful","errors","progress","originalData","recentlySuccessful","recentlySuccessfulTimeoutId"];const _=w},859:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var r=t(7757),a=t.n(r),o=t(5714);function i(e,s,t,r,a,o,i){try{var n=e[o](i),l=n.value}catch(e){return void t(e)}n.done?s(l):Promise.resolve(l).then(r,a)}const n={components:{},middleware:"guest",metaInfo:function(){return{title:this.$t("register")}},data:function(){return{form:new o.ZP({name:"",email:"",password:"",password_confirmation:""}),mustVerifyEmail:!1,messages:null}},methods:{register:function(){var e,s=this;return(e=a().mark((function e(){var t,r,o,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.form.post("/api/register");case 3:if(t=e.sent,!(r=t.data).status){e.next=9;break}s.mustVerifyEmail=!0,e.next=17;break;case 9:return e.next=11,s.form.post("/api/login");case 11:return o=e.sent,i=o.data.access_token,s.$store.dispatch("auth/saveToken",{token:i,remember:!0}),e.next=16,s.$store.dispatch("auth/updateUser",{user:r.user});case 16:s.$router.push({name:"home"});case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(0),s.messages=e.t0.response.data.message;case 22:case"end":return e.stop()}}),e,null,[[0,19]])})),function(){var s=this,t=arguments;return new Promise((function(r,a){var o=e.apply(s,t);function n(e){i(o,r,a,n,l,"next",e)}function l(e){i(o,r,a,n,l,"throw",e)}n(void 0)}))})()}}};const l=(0,t(1900).Z)(n,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-7 m-auto"},[e.mustVerifyEmail?t("card",{attrs:{title:e.$t("register")}},[t("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e._v("\n        "+e._s(e.$t("verify_email_address"))+"\n      ")])]):t("card",{attrs:{title:e.$t("register")}},[t("form",{on:{submit:function(s){return s.preventDefault(),e.register.apply(null,arguments)},keydown:function(s){return e.form.onKeydown(s)}}},[t("AlertError",{attrs:{form:e.form}},[e._v(e._s(e.messages)+" ")]),e._v(" "),t("div",{staticClass:"mb-3 row"},[t("label",{staticClass:"col-md-3 col-form-label text-md-end"},[e._v(e._s(e.$t("name")))]),e._v(" "),t("div",{staticClass:"col-md-7"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],staticClass:"form-control",class:{"is-invalid":e.form.errors.has("name")},attrs:{type:"text",name:"name"},domProps:{value:e.form.name},on:{input:function(s){s.target.composing||e.$set(e.form,"name",s.target.value)}}}),e._v(" "),t("has-error",{attrs:{form:e.form,field:"name"}})],1)]),e._v(" "),t("div",{staticClass:"mb-3 row"},[t("label",{staticClass:"col-md-3 col-form-label text-md-end"},[e._v(e._s(e.$t("email")))]),e._v(" "),t("div",{staticClass:"col-md-7"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],staticClass:"form-control",class:{"is-invalid":e.form.errors.has("email")},attrs:{type:"email",name:"email"},domProps:{value:e.form.email},on:{input:function(s){s.target.composing||e.$set(e.form,"email",s.target.value)}}}),e._v(" "),t("has-error",{attrs:{form:e.form,field:"email"}})],1)]),e._v(" "),t("div",{staticClass:"mb-3 row"},[t("label",{staticClass:"col-md-3 col-form-label text-md-end"},[e._v(e._s(e.$t("password")))]),e._v(" "),t("div",{staticClass:"col-md-7"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],staticClass:"form-control",class:{"is-invalid":e.form.errors.has("password")},attrs:{type:"password",name:"password"},domProps:{value:e.form.password},on:{input:function(s){s.target.composing||e.$set(e.form,"password",s.target.value)}}}),e._v(" "),t("has-error",{attrs:{form:e.form,field:"password"}})],1)]),e._v(" "),t("div",{staticClass:"mb-3 row"},[t("label",{staticClass:"col-md-3 col-form-label text-md-end"},[e._v(e._s(e.$t("confirm_password")))]),e._v(" "),t("div",{staticClass:"col-md-7"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password_confirmation,expression:"form.password_confirmation"}],staticClass:"form-control",class:{"is-invalid":e.form.errors.has("password_confirmation")},attrs:{type:"password",name:"password_confirmation"},domProps:{value:e.form.password_confirmation},on:{input:function(s){s.target.composing||e.$set(e.form,"password_confirmation",s.target.value)}}}),e._v(" "),t("has-error",{attrs:{form:e.form,field:"password_confirmation"}})],1)]),e._v(" "),t("div",{staticClass:"mb-3 row"},[t("div",{staticClass:"col-md-7 offset-md-3 d-flex"},[t("v-button",{attrs:{loading:e.form.busy}},[e._v("\n              "+e._s(e.$t("register"))+"\n            ")])],1)])],1)])],1)])}),[],!1,null,null,null).exports}}]);