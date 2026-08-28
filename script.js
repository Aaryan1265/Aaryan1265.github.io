document.addEventListener("DOMContentLoaded",()=>{

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

/* Scroll reveal */
const observer=new IntersectionObserver(
entries=>entries.forEach(e=>{
if(e.isIntersecting)e.target.classList.add("show");
}),
{threshold:.1}
);

$$(".reveal").forEach(el=>observer.observe(el));


/* Changing role */
const role=$("#role");

const roles=[
"Software Developer",
"Full-Stack Developer",
"Backend Developer",
"AI & Data Developer"
];

let r=0,i=0,del=false;

function type(){

const text=roles[r];

role.textContent=del
?text.slice(0,--i)
:text.slice(0,++i);

if(i===text.length){
del=true;
return setTimeout(type,1000);
}

if(i===0){
del=false;
r=(r+1)%roles.length;
}

setTimeout(type,del?40:70);
}

type();


/* Name scramble */
const name=$("#name");
const original=name.dataset.text;
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

name.addEventListener("mouseenter",()=>{

let frame=0;

const animate=()=>{

name.textContent=original
.split("")
.map((c,index)=>
c===" "
?" "
:index<frame
?c
:chars[Math.floor(Math.random()*chars.length)]
)
.join("");

if(++frame<=original.length)
requestAnimationFrame(animate);
else
name.textContent=original;

};

animate();

});


/* Smooth scroll */
$$('a[href^="#"]').forEach(a=>{

a.addEventListener("click",e=>{

e.preventDefault();

$(a.getAttribute("href"))
.scrollIntoView({
behavior:"smooth"
});

});

});

});