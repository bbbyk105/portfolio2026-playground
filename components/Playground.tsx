"use client";
import {useEffect,useRef,useState} from "react";
import {gsap} from "gsap";

const works=[
 {n:"01",name:"CaRoot",kind:"AI / MOBILE PRODUCT",year:"2026",desc:"A personal calorie and nutrition management app designed to make everyday meal logging dramatically easier.",url:"https://www.caroot.app",img:"https://raw.githubusercontent.com/bbbyk105/Portfolio2026-ver4/main/public/works/caroot.webp",stack:["Expo","React Native","TypeScript","Supabase","Gemini"]},
 {n:"02",name:"Hakuho",kind:"PRECISION MACHINING / WEB",year:"2026",desc:"Corporate platform for a precision-machining company, connecting technical capability directly to quote conversion.",url:"https://www.hakuhofactory.com",img:"https://raw.githubusercontent.com/bbbyk105/Portfolio2026-ver4/main/public/works/hakuho.webp",stack:["Next.js","React","TypeScript","GSAP","Resend"]},
 {n:"03",name:"Goodwill Legal",kind:"LEGAL / CONTENT PLATFORM",year:"2026",desc:"A publishing-led website for a Sapporo administrative scrivener, built around clear service information and consultation.",url:"https://goodwill-legal.jp",img:"https://raw.githubusercontent.com/bbbyk105/Portfolio2026-ver4/main/public/works/goodwill.webp",stack:["Next.js","TypeScript","CMS","SEO","Resend"]},
 {n:"04",name:"Jurakuen",kind:"COMMERCE / ORGANIC TEA",year:"2025",desc:"A bilingual direct-to-consumer experience for an organic tea producer in Fuji.",url:"https://www.jurakuen.com",img:"https://raw.githubusercontent.com/bbbyk105/Portfolio2026-ver4/main/public/works/jurakuen.webp",stack:["Next.js","Stripe","TypeScript","i18n"]},
 {n:"05",name:"DMC Fuji",kind:"STUDIO / PHOTOGRAPHY",year:"2025",desc:"A bilingual digital home for photography and experience services at the foot of Mt. Fuji.",url:"https://www.dmc123.jp",img:"https://raw.githubusercontent.com/bbbyk105/Portfolio2026-ver4/main/public/works/dmc-fuji.webp",stack:["Next.js","Supabase","TypeScript","CMS"]}
];
const tech=["TYPESCRIPT","PYTHON","NEXT.JS","REACT","REACT NATIVE","EXPO","FASTAPI","SUPABASE","POSTGRESQL","DOCKER","N8N","GSAP"];
export default function Playground(){
 const [menu,setMenu]=useState(false);
 const menuPanel=useRef<HTMLDivElement>(null);
 useEffect(()=>{gsap.from(".reveal",{y:32,opacity:0,duration:1.05,stagger:.08,ease:"power3.out"});gsap.to(".orb",{y:-18,x:12,duration:4,repeat:-1,yoyo:true,ease:"sine.inOut"})},[]);
 useEffect(()=>{
  if(!menuPanel.current)return;
  const links=menuPanel.current.querySelectorAll(".mobileMenuLink");
  gsap.to(menuPanel.current,{clipPath:menu?"inset(0 0 0% 0)":"inset(0 0 100% 0)",duration:menu?.72:.5,ease:"power4.inOut",pointerEvents:menu?"auto":"none"});
  gsap.to(links,{y:menu?0:30,opacity:menu?1:0,duration:.55,stagger:.055,delay:menu?.14:0,ease:"power3.out"});
  document.body.style.overflow=menu?"hidden":"";
  return()=>{document.body.style.overflow=""};
 },[menu]);
 return <main>
  <nav className="nav"><a className="brand" href="#">BK<span>.</span></a><div className="navlinks"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="mailto:byakkokondo@gmail.com">CONTACT</a></div><button className={"menuBtn "+(menu?"isOpen":"")} onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation"><span/><span/><b>{menu?"CLOSE":"MENU"}</b></button></nav>
  <div className="mobileMenu" ref={menuPanel}>
   <div className="mobileMenuMeta"><span>NAVIGATION</span><span>BYAKKO KONDO / 2026</span></div>
   <div className="mobileMenuNav">
    <a className="mobileMenuLink" onClick={()=>setMenu(false)} href="#"><small>00</small>HOME</a>
    <a className="mobileMenuLink" onClick={()=>setMenu(false)} href="#work"><small>01</small>WORK</a>
    <a className="mobileMenuLink" onClick={()=>setMenu(false)} href="#about"><small>02</small>ABOUT</a>
    <a className="mobileMenuLink" onClick={()=>setMenu(false)} href="mailto:byakkokondo@gmail.com"><small>03</small>CONTACT</a>
   </div>
   <div className="mobileMenuFoot"><span>TOKYO, JAPAN</span><span>ENGINEER / CREATIVE DEVELOPER</span></div>
  </div>
  <section className="hero">
   <div className="gridbg"/><div className="orb o1"/><div className="orb o2"/>
   <p className="eyebrow reveal"><i/> BYAKKO KONDO / ENGINEER / CREATIVE DEVELOPER</p>
   <h1 className="reveal">BUILDING<br/><em>DIGITAL SYSTEMS</em><br/>THAT SHIP.</h1>
   <div className="heroBottom reveal"><p>I design and build digital products, web experiences and automation systems — from research prototypes to production services.</p><a href="#work">EXPLORE WORK <b>↘</b></a></div>
   <div className="terminal reveal"><div className="termbar"><span>~/byakko/portfolio</span><span>● LIVE</span></div><pre><span className="cyan">$</span> whoami{"\n"}Byakko Kondo{"\n"}<span className="muted">engineer / creative developer / tokyo</span>{"\n\n"}<span className="cyan">$</span> status{"\n"}shipping products <span className="green">✓</span>{"\n"}building systems <span className="green">✓</span>{"\n"}open to projects <span className="green">✓</span><span className="cursor">▋</span></pre></div>
  </section>
  <div className="ticker"><div>{[...tech,...tech].map((t,i)=><span key={i}>{t}<b>✳</b></span>)}</div></div>
  <section id="work" className="work"><header className="sectionHead"><p>01 / SELECTED WORK</p><h2>PRODUCTS IN<br/><em>PRODUCTION.</em></h2><p className="side">2025—2026<br/>DESIGN / ENGINEERING / SYSTEMS</p></header>
   <div className="workList">{works.map((w,i)=><article className="project" key={w.name}><div className="projectMeta"><span>{w.n}</span><span>{w.kind}</span><span>{w.year}</span></div><div className="projectBody"><div><h3>{w.name}</h3><p>{w.desc}</p><div className="chips">{w.stack.map(x=><span key={x}>{x}</span>)}</div><a href={w.url} target="_blank">VIEW PROJECT ↗</a></div><a className="screen" href={w.url} target="_blank"><img src={w.img} alt=""/><span>LIVE / {String(i+1).padStart(2,"0")}</span></a></div></article>)}</div>
  </section>
  <section id="about" className="about"><div className="sectionHead"><p>02 / ABOUT</p><h2>IDEA TO<br/><em>IMPLEMENTATION.</em></h2></div><div className="aboutGrid"><p className="bigcopy">I work across product development, web engineering, research software and workflow automation.</p><div className="bio"><p>My background began in life science at Gakushuin University. In the Okada Lab, I worked on protein-structure analysis using inter-carbon distances and developed software to automate structural-data workflows.</p><p>After practical engineering experience at Letterfan and Drumroll, I moved into freelance engineering. I now build mobile products, corporate platforms, commerce systems, backend integrations and automation.</p><p>Alongside client work, I develop CaRoot. Since August 2026, I have also served as a director of NPO Proud, supporting IT and web initiatives.</p></div></div>
   <div className="timeline"><div><span>2025—26</span><b>GAKUSHUIN UNIVERSITY</b><p>Life Science / Okada Lab</p></div><div><span>2026</span><b>FREELANCE ENGINEER</b><p>Products / Web / Systems</p></div><div><span>2026—</span><b>CAROOT</b><p>Founder / Product Developer</p></div><div><span>2026.08—</span><b>NPO PROUD</b><p>Director / IT & Web</p></div></div>
  </section>
  <section className="stack"><p>03 / CAPABILITIES</p><h2>THE STACK IS A TOOL.<br/><em>THE OUTCOME IS THE PRODUCT.</em></h2><div className="techgrid">{tech.map((t,i)=><div key={t}><span>{String(i+1).padStart(2,"0")}</span>{t}<b>↗</b></div>)}</div></section>
  <section className="contact"><p>04 / START A PROJECT</p><h2>HAVE AN IDEA?<br/><em>LET'S BUILD IT.</em></h2><a href="mailto:byakkokondo@gmail.com">BYAKKOKONDO@GMAIL.COM <span>↗</span></a></section>
  <footer><b>BYAKKO KONDO</b><span>ENGINEER / CREATIVE DEVELOPER</span><span>TOKYO, JAPAN — 2026</span><a href="#">BACK TO TOP ↑</a></footer>
 </main>
}