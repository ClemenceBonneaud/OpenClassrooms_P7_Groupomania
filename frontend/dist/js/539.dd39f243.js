"use strict";(self["webpackChunkgroupomania_v1_0"]=self["webpackChunkgroupomania_v1_0"]||[]).push([[539],{4068:function(e,s,a){a.d(s,{Z:function(){return m}});var n=a(3396),o=a(5348);const t={class:"header header--log"},l=(0,n._)("div",null,[(0,n._)("figure",null,[(0,n._)("img",{src:o,alt:"Logo Groupomania"})])],-1),i=(0,n.Uk)("S'inscrire"),r=(0,n.Uk)("Se connecter");function u(e,s,a,o,u,p){const d=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("header",t,[l,(0,n._)("nav",null,[(0,n.Wm)(d,{to:"/signup"},{default:(0,n.w5)((()=>[i])),_:1}),(0,n.Wm)(d,{to:"/login"},{default:(0,n.w5)((()=>[r])),_:1})])])}var p={name:"HeaderLog",props:[""]},d=a(89);const c=(0,d.Z)(p,[["render",u]]);var m=c},3539:function(e,s,a){a.r(s),a.d(s,{default:function(){return R}});var n=a(3396),o=a(7139),t=a(9242);const l={class:"signup"},i={class:"bloc"},r=(0,n._)("label",null,"Nom",-1),u={key:0,class:"formMessage"},p=(0,n._)("label",null,"Prenom",-1),d={key:1,class:"formMessage"},c=(0,n._)("label",null,"Poste au sein de l'entreprise",-1),m={key:2,class:"formMessage"},g=(0,n._)("label",null,"Email",-1),h={key:3,class:"formMessage"},w=(0,n._)("label",null,"Mot de passe",-1),k={key:4,class:"formMessage"},f={key:0,class:"errorMessage"},y={key:1,class:"bouton bouton--disabled"};function b(e,s,a,b,x,_){const v=(0,n.up)("HeaderLog");return(0,n.wg)(),(0,n.iD)("div",l,[(0,n.Wm)(v),(0,n._)("h1",null,(0,o.zw)(x.titre),1),(0,n._)("div",i,[(0,n._)("form",null,[r,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>x.nom=e),type:"text"},null,512),[[t.nr,x.nom]]),_.nomRegexValid()?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("p",u," Veuillez saisir un nom valide ")),p,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>x.prenom=e),type:"text"},null,512),[[t.nr,x.prenom]]),_.prenomRegexValid()?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("p",d," Veuillez saisir un prénom valide ")),c,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":s[2]||(s[2]=e=>x.job=e),type:"text"},null,512),[[t.nr,x.job]]),_.jobRegexValid()?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("p",m," Veuillez saisir un poste valide ")),g,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":s[3]||(s[3]=e=>x.email=e),type:"email",onKeyup:s[4]||(s[4]=e=>_.analyseEmail())},null,544),[[t.nr,x.email]]),x.emailDisplayed?((0,n.wg)(),(0,n.iD)("p",h," Veuillez saisir un email valide ")):(0,n.kq)("",!0),w,(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":s[5]||(s[5]=e=>x.password=e),type:"password",onChange:s[6]||(s[6]=e=>_.checkPassword())},null,544),[[t.nr,x.password]]),x.passwordDisplayed?((0,n.wg)(),(0,n.iD)("p",k," Veuillez saisir un mot de passe ")):(0,n.kq)("",!0)]),x.errorMessage?((0,n.wg)(),(0,n.iD)("p",f," Oups ! Il semblerait que "+(0,o.zw)(x.errorMessage),1)):(0,n.kq)("",!0),_.validatedFields()?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",y," Se connecter ")),_.validatedFields()?((0,n.wg)(),(0,n.iD)("button",{key:2,class:"bouton",onClick:s[7]||(s[7]=e=>_.createAccount())}," Se connecter ")):(0,n.kq)("",!0)])])}var x=a(4068);const _=a(6265),v=_.create({baseURL:"http://localhost:3000/api/"});var z={name:"SignupView",path:"/auth/signup",props:[""],data(){return{titre:"S'inscrire",nom:"",prenom:"",job:"",email:"",password:"",emailDisplayed:!1,passwordDisplayed:!1,errorMessage:null,sessionToken:null}},methods:{nomRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),s=e.exec(this.nom);return s},prenomRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),s=e.exec(this.prenom);return s},jobRegexValid:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),s=e.exec(this.job);return s},analyseEmail:function(){let e=new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}"),s=e.exec(this.email);this.emailDisplayed=!s},checkPassword:function(){""!=this.password?this.passwordDisplayed=!1:this.passwordDisplayed=!0},validatedFields:function(){let e=new RegExp("^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"),s=new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}"),a=e.exec(this.nom),n=e.exec(this.prenom),o=e.exec(this.job),t=s.exec(this.email);return!!(a&&n&&o&&t&&""!=this.password)},createAccount:function(){let e={lastName:this.nom,firstName:this.prenom,job:this.job,email:this.email,password:this.password};v.post("auth/signup",e).then((e=>{this.$store.state.sessionToken=e.data.token,this.$store.state.userId=e.data.userId,this.$router.push("/")})).catch((e=>{console.log(e),this.errorMessage=e.response.data.error}))}},components:{HeaderLog:x.Z}},D=a(89);const V=(0,D.Z)(z,[["render",b]]);var R=V},5348:function(e,s,a){e.exports=a.p+"img/icon-left-font-monochrome-black.6906c026.svg"}}]);
//# sourceMappingURL=539.dd39f243.js.map