"use strict";(self["webpackChunkfasttodo"]=self["webpackChunkfasttodo"]||[]).push([[116],{1116:function(t,i,e){e.r(i),e.d(i,{default:function(){return y}});var n=e(3396);const r={class:"registration-page"};function s(t,i,e,s,a,o){const l=(0,n.up)("FastRegistration");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n.Wm)(l)])}var a=e(7139);const o={class:"registration"},l={class:"container"},u={class:"registration-wrap"},c={class:"registration__form",action:"#"},g={class:"registration__form-avatar"},p=["src"],m=["innerHTML"],d={class:"registration__form-input-row"},_={class:"registration__form-text"};function h(t,i,r,s,h,v){const f=(0,n.up)("formInput"),w=(0,n.up)("mainBtn");return(0,n.wg)(),(0,n.iD)("section",o,[(0,n._)("div",l,[(0,n._)("div",u,[(0,n._)("form",c,[(0,n._)("div",g,[(0,n._)("img",{src:e(5459)("./"+t.registration.avatarImg)},null,8,p)]),(0,n._)("h2",{class:"registration__form-title",innerHTML:t.registration.title},null,8,m),(0,n._)("div",d,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.registration.input,(t=>((0,n.wg)(),(0,n.j4)(f,{key:t.id,elId:t.id,elType:t.type,elClass:t.class,elValue:t.value,elPlaceholder:t.placeholder,onInputAction:i=>v.registrationinputSave(t.id)},null,8,["elId","elType","elClass","elValue","elPlaceholder","onInputAction"])))),128)),(0,n.Wm)(w,{elText:t.registration.btnText,elClass:"registration__form-btn",onClickAction:i[0]||(i[0]=t=>v.registerPerson())},null,8,["elText"])]),(0,n._)("p",_,[(0,n._)("span",null,(0,a.zw)(t.registration.question),1),(0,n._)("button",{class:"title-gradient",type:"button",onClick:i[1]||(i[1]=i=>(t.registration.animSection=!1,v.animRegistration(),v.loginToRouter()))},"Login...")])])])])])}var v=e(65),f=e(654),w=e(962),T={components:{formInput:f.Z,mainBtn:w.Z},computed:{...(0,v.Se)(["registration","user"])},methods:{animRegistration(){this.$store.dispatch("animRegistration")},loginToRouter(){this.$store.dispatch("loginToRouter")},registrationinputSave(t){this.$store.commit("registrationinputSave",t)},async registerPerson(){await this.$store.dispatch("registerPerson",{name:this.registration.input[0].value,email:this.registration.input[1].value,password:this.registration.input[2].value,passwordConfirm:this.registration.input[3].value})}},mounted(){this.registration.animSection=!0,this.animRegistration()}},R=e(89);const C=(0,R.Z)(T,[["render",h],["__scopeId","data-v-b897432a"]]);var I=C,b={components:{FastRegistration:I}};const k=(0,R.Z)(b,[["render",s]]);var y=k}}]);
//# sourceMappingURL=116.c4004275.js.map