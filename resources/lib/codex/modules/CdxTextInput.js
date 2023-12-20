"use strict";var m=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var f=(e,n)=>{var r={};for(var u in e)w.call(e,u)&&n.indexOf(u)<0&&(r[u]=e[u]);if(e!=null&&m)for(var u of m(e))n.indexOf(u)<0&&B.call(e,u)&&(r[u]=e[u]);return r};const t=require("vue"),I=require("./Icon.js"),l=require("./constants.js"),V=require("./useModelWrapper.js"),S=require("./useSplitAttributes.js"),h=require("./useFieldData.js"),T=require("./_plugin-vue_export-helper.js");require("./useComputedDirection.js");require("./useComputedLanguage.js");require("./useComputedDisabled.js");const q=l.makeStringTypeValidator(l.TextInputTypes),M=l.makeStringTypeValidator(l.ValidationStatusTypes),K=t.defineComponent({name:"CdxTextInput",components:{CdxIcon:I.CdxIcon},inheritAttrs:!1,expose:["focus","blur"],props:{modelValue:{type:[String,Number],default:""},inputType:{type:String,default:"text",validator:q},status:{type:String,default:"default",validator:M},disabled:{type:Boolean,default:!1},startIcon:{type:[String,Object],default:void 0},endIcon:{type:[String,Object],default:void 0},clearable:{type:Boolean,default:!1}},emits:["update:modelValue","keydown","input","change","focus","blur","clear"],setup(e,{emit:n,attrs:r}){const u=r.id,{computedDisabled:a,computedStatus:c,computedInputId:i}=h(t.toRef(e,"disabled"),t.toRef(e,"status"),u),s=t.inject(l.FieldDescriptionIdKey,void 0),d=V(t.toRef(e,"modelValue"),n),p=t.computed(()=>e.clearable&&!!d.value&&!a.value),C=t.computed(()=>({"cdx-text-input--has-start-icon":!!e.startIcon,"cdx-text-input--has-end-icon":!!e.endIcon,"cdx-text-input--clearable":p.value,["cdx-text-input--status-".concat(c.value)]:!0})),{rootClasses:b,rootStyle:v,otherAttrs:g}=S(r,C),x=t.computed(()=>{const y=g.value,{id:o}=y;return f(y,["id"])}),k=t.computed(()=>({"cdx-text-input__input--has-value":!!d.value}));return{computedInputId:i,descriptionId:s,wrappedModel:d,isClearable:p,rootClasses:b,rootStyle:v,otherAttrsMinusId:x,inputClasses:k,computedDisabled:a,onClear:o=>{d.value="",n("clear",o)},onInput:o=>{n("input",o)},onChange:o=>{n("change",o)},onKeydown:o=>{(o.key==="Home"||o.key==="End")&&!o.ctrlKey&&!o.metaKey||n("keydown",o)},onFocus:o=>{n("focus",o)},onBlur:o=>{n("blur",o)},cdxIconClear:I.Q4}},methods:{focus(){this.$refs.input.focus()},blur(){this.$refs.input.blur()}}});const F=["id","type","aria-describedby","disabled"];function $(e,n,r,u,a,c){const i=t.resolveComponent("cdx-icon");return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["cdx-text-input",e.rootClasses]),style:t.normalizeStyle(e.rootStyle)},[t.createCommentVNode(' size="1" is to prevent the browser from setting an implicit min-width '),t.withDirectives(t.createElementVNode("input",t.mergeProps({id:e.computedInputId,ref:"input","onUpdate:modelValue":n[0]||(n[0]=s=>e.wrappedModel=s),class:["cdx-text-input__input",e.inputClasses]},e.otherAttrsMinusId,{type:e.inputType,"aria-describedby":e.descriptionId,disabled:e.computedDisabled,size:"1",onInput:n[1]||(n[1]=(...s)=>e.onInput&&e.onInput(...s)),onChange:n[2]||(n[2]=(...s)=>e.onChange&&e.onChange(...s)),onFocus:n[3]||(n[3]=(...s)=>e.onFocus&&e.onFocus(...s)),onBlur:n[4]||(n[4]=(...s)=>e.onBlur&&e.onBlur(...s)),onKeydown:n[5]||(n[5]=(...s)=>e.onKeydown&&e.onKeydown(...s))}),null,16,F),[[t.vModelDynamic,e.wrappedModel]]),e.startIcon?(t.openBlock(),t.createBlock(i,{key:0,icon:e.startIcon,class:"cdx-text-input__icon-vue cdx-text-input__start-icon"},null,8,["icon"])):t.createCommentVNode("v-if",!0),e.endIcon?(t.openBlock(),t.createBlock(i,{key:1,icon:e.endIcon,class:"cdx-text-input__icon-vue cdx-text-input__end-icon"},null,8,["icon"])):t.createCommentVNode("v-if",!0),e.isClearable?(t.openBlock(),t.createBlock(i,{key:2,icon:e.cdxIconClear,class:"cdx-text-input__icon-vue cdx-text-input__clear-icon",onMousedown:n[6]||(n[6]=t.withModifiers(()=>{},["prevent"])),onClick:e.onClear},null,8,["icon","onClick"])):t.createCommentVNode("v-if",!0)],6)}const A=T._export_sfc(K,[["render",$]]);module.exports=A;
