"use strict";(()=>{var e={};e.id=159,e.ids=[159],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},2801:(e,t,n)=>{n.r(t),n.d(t,{config:()=>p,default:()=>l,routeModule:()=>d});var r={};n.r(r),n.d(r,{default:()=>u});var s=n(1802),o=n(7153),a=n(6249);let i=require("googleapis");async function u(e,t){if("POST"!==e.method)return t.status(405).send({message:"Only POST requests are allowed"});let n=e.body;try{let e=new i.google.auth.GoogleAuth({credentials:{client_email:process.env.GOOGLE_CLIENT_EMAIL,private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n")},scopes:["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/spreadsheets"]}),r=i.google.sheets({auth:e,version:"v4"}),s=await r.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID,range:"A1:E1",valueInputOption:"USER_ENTERED",requestBody:{values:[[n.nom,n.prenom,n.telephone,n.email,n.ville]]}});return t.status(200).json({data:s.data})}catch(e){return console.error(e),t.status(500).send({message:"Something went wrong"})}}let l=(0,a.l)(r,"default"),p=(0,a.l)(r,"config"),d=new s.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/submit",pathname:"/api/submit",bundlePath:"",filename:""},userland:r})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=2801);module.exports=n})();