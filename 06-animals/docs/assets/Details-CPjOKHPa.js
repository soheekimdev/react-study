import{j as a}from"./vendor-react-CtW5r0F0.js";import{d as r}from"./data-C0-iocHs.js";import{f as t}from"./vendor-react-router-u5A5fqQQ.js";import"./vendor-@remix-run-Br25Cn4W.js";const l=()=>{const i=t();console.log(i.id);const s=r.find(o=>o.id===Number(i.id));return console.log(s),a.jsxs("section",{className:"detail",children:[a.jsx("img",{src:s.img,alt:s.name}),a.jsx("h2",{children:s.name}),a.jsx("div",{children:s.description})]})};export{l as default};