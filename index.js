import{a as g,S,i as n}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const q="47529418-7c1904dc6f9bbd03298cb58bf";g.defaults.baseURL="https://pixabay.com/api/";const y=async(e,s=1,o=15)=>{const a=new URLSearchParams({key:q,q:e,image_type:"photo",orientaiton:"horizontal",safesearch:"true",page:s,per_page:o});try{return await g.get("",{params:a})}catch(t){throw t}};let u;const h=e=>{const s=document.querySelector(".gallery"),o=e.map(({webformatURL:a,largeImageURL:t,tags:r,likes:l,views:b,comments:w,downloads:L})=>`<div class='photo-card'>
        <a href="${t}">
          <img src="${a}" alt="${r}" loading=""lazy/>
        </a>
        <div class="info">
          <div>
            <p>Likes</p>
            <p>${l}</p>
          </div>
          <div>
            <p>Views</p>
            <p>${b}</p>
          </div>
          <div>
            <p>Comments</p>
            <p>${w}</p>
          </div>
          <div>
            <p>Downloads</p>
            <p>${L}</p>
          </div>
        </div>
      </div>`).join("");s.insertAdjacentHTML("beforeend",o),u?u.refresh():u=new S(".gallery a",{captionsData:"alt",captionDelay:250})},P=()=>{const e=document.querySelector(".gallery");e.innerHTML=""},m=document.querySelector(".search-form"),R=document.querySelector(".loader"),v=document.querySelector(".load-more");let i=1,f="";const d=15;m.addEventListener("submit",$);v.addEventListener("click",E);async function $(e){e.preventDefault();const s=m.elements.search.value.trim();if(!s){n.warning({title:"Warning",message:"Search query cannot be empty!",position:"topRight"});return}f=s,i=1,P(),p(!0),c(!1);try{const{data:o}=await y(f,i,d);if(o.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}else i*d>=o.totalHits?(c(!1),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):c(!0);h(o.hits)}catch(o){n.error({title:"Error",message:`Something went wrong: ${o.message}`,position:"topRight"})}finally{p(!1)}}async function E(){i+=1,c(!1),p(!0);try{const{data:e}=await y(f,i,d);i*d>=e.totalHits?(c(!1),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):c(!0),h(e.hits),M()}catch(e){n.error({title:"Error",message:`Something went wrong: ${e.message}`,position:"topRight"})}finally{p(!1)}}const M=()=>{const e=document.querySelector(".photo-card");e&&window.scrollBy({top:e.getBoundingClientRect().height*2,behavior:"smooth"})},p=e=>R.style.display=e?"block":"none",c=e=>v.style.display=e?"block":"none";
//# sourceMappingURL=index.js.map
