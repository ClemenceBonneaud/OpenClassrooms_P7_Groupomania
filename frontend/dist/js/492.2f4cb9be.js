"use strict";(self["webpackChunkgroupomania_v1_0"]=self["webpackChunkgroupomania_v1_0"]||[]).push([[492],{2492:function(e,o,s){s.r(o),s.d(o,{default:function(){return R}});var a=s(3396),l=s(7139),i=s(9242);const n={class:"profil"},r={class:"bloc"},t=(0,a._)("label",null,"Nom",-1),p={key:0,class:"formMessage"},d=(0,a._)("label",null,"Prenom",-1),u={key:1,class:"formMessage"},m=(0,a._)("label",null,"Poste au sein de l'entreprise",-1),c={key:2,class:"formMessage"},f=(0,a._)("label",null,"Mot de passe",-1),w={key:3,class:"formMessage"},g={key:0,class:"errorMessage"},h={class:"profilEdit"},b={key:0,class:"bouton bouton--disabled"},k=(0,a.Uk)("Annuler");function y(e,o,s,y,x,_){const v=(0,a.up)("HeaderHome"),D=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(v),(0,a._)("h1",null,(0,l.zw)(x.titre),1),(0,a._)("div",r,[(0,a._)("form",null,[t,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>x.nom=e),type:"text"},null,512),[[i.nr,x.nom]]),_.nomRegexValid()?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("p",p," Veuillez saisir un nom valide ")),d,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":o[1]||(o[1]=e=>x.prenom=e),type:"text"},null,512),[[i.nr,x.prenom]]),_.prenomRegexValid()?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("p",u," Veuillez saisir un prénom valide ")),m,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":o[2]||(o[2]=e=>x.job=e),type:"text"},null,512),[[i.nr,x.job]]),_.jobRegexValid()?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("p",c," Veuillez saisir un poste valide ")),f,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":o[3]||(o[3]=e=>x.password=e),type:"password",onChange:o[4]||(o[4]=e=>_.checkPassword())},null,544),[[i.nr,x.password]]),x.passwordDisplayed?((0,a.wg)(),(0,a.iD)("p",w," Veuillez saisir un mot de passe ")):(0,a.kq)("",!0)]),x.errorMessage?((0,a.wg)(),(0,a.iD)("p",g," Oups ! Il semble que "+(0,l.zw)(x.errorMessage),1)):(0,a.kq)("",!0),(0,a._)("div",h,[_.validatedFields()?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("button",b," Modifier ")),_.validatedFields()?((0,a.wg)(),(0,a.iD)("button",{key:1,class:"bouton",onClick:o[5]||(o[5]=e=>_.modifierProfil())}," Modifier ")):(0,a.kq)("",!0),(0,a.Wm)(D,{to:"/monprofil",class:"bouton"},{default:(0,a.w5)((()=>[k])),_:1})])])])}var x=s(2026);const _=s(6265),v=_.create({baseURL:"http://localhost:3000/api/"});var D={name:"ProfilDetail",path:"/monprofil/modification",props:[""],data(){return{titre:"Modifier mon profil",nom:"",prenom:"",job:"",password:"",emailDisplayed:!1,passwordDisplayed:!1,errorMessage:null}},methods:{nomRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),o=e.exec(this.nom);return o},prenomRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),o=e.exec(this.prenom);return o},jobRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),o=e.exec(this.job);return o},checkPassword:function(){""!=this.password?this.passwordDisplayed=!1:this.passwordDisplayed=!0},validatedFields:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),o=e.exec(this.nom),s=e.exec(this.prenom),a=e.exec(this.job);return!!(o&&s&&a&&""!=this.password)},modifierProfil:function(){let e={lastName:this.nom,firstName:this.prenom,job:this.job,password:this.password};const o=this.$store.state.userId;v.put(`auth/modify/${o}`,e).then((e=>{console.log(e),this.$router.push("/monprofil")})).catch((e=>{console.log(e),this.errorMessage=e.response.data.error}))}},components:{HeaderHome:x.Z}},V=s(89);const M=(0,V.Z)(D,[["render",y]]);var R=M}}]);
//# sourceMappingURL=492.2f4cb9be.js.map