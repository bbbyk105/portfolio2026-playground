"use client";
import {useEffect,useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const works=[
["01","CaRoot","Product / App","AI-assisted calorie and nutrition management.","https://www.caroot.app"],
["02","Hakuho","Web / Manufacturing","Digital presence for precision manufacturing.","https://www.hakuhofactory.com"],
["03","Goodwill Legal","Web / Legal","Content and consultation platform for a legal office.","https://goodwill-legal.jp"],
["04","Jurakuen","Commerce / Tea","Bilingual commerce for an organic tea producer.","https://www.jurakuen.com"],
["05","DMC Fuji","Web / Studio","Photography-led bilingual studio experience.","https://www.dmc123.jp"]
];

function Mark(){return <span className="mark" aria-hidden="true"><i/><i/><i/><i/></span>}
export default function Playground(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  gsap.from(".hero-copy>*",{y:50,opacity:0,duration:.9,stagger:.08,ease:"power3.out"});
  gsap.to(".hero-orb",{y:-28,rotate:12,duration:5,repeat:-1,yoyo:true,ease:"sine.inOut"});
  gsap.utils.toArray<HTMLElement>(".work-card").forEach((el)=>gsap.from(el,{y:70,opacity:0,scrollTrigger:{trigger:el,start:"top 90%",end:"top 62%",scrub:1}}));
  gsap.to(".rail-inner",{xPercent:-20,ease:"none",scrollTrigger:{trigger:".rail",start:"top bottom",end:"bottom top",scrub:1}});
 },root);return()=>ctx.revert()},[]);
 return <div ref={root} className="site">
 <header className="topbar"><a className="brand" href="#"><Mark/>BYAKKO</a><nav><a href="#work">Work</a><a href="#about">About</a><a href="#stack">Stack</a></nav><a className="top-cta" href="mailto:byakkokondo@gmail.com">Contact <span>↗</span></a></header>
 <main>
 <section className="hero">
   <div className="hero-grid"/>
   <div className="hero-copy"><p className="kicker">CREATIVE DEVELOPER / TOKYO, JAPAN</p><h1>BUILDING DIGITAL<br/><span>EXPERIENCES</span><br/>THAT MOVE.</h1><p className="lead">I design and build products, websites and systems from idea to operation — combining engineering, interface design and motion.</p><div className="hero-actions"><a className="btn primary" href="#work">Explore work <b>→</b></a><a className="btn ghost" href="#about">About me</a></div></div>
   <div className="hero-visual"><div className="hero-orb"><Mark/></div><div className="data-card d1"><small>STATUS</small><strong>AVAILABLE</strong><span>2026 / TOKYO</span></div><div className="data-card d2"><small>SYSTEM</small><strong>DESIGN × CODE</strong><span>GSAP / NEXT.JS</span></div></div>
 </section>
 <section className="rail"><div className="rail-inner">PRODUCT ENGINEERING　/　WEB DEVELOPMENT　/　INTERACTION DESIGN　/　AUTOMATION　/　PRODUCT ENGINEERING　/　WEB DEVELOPMENT　/　INTERACTION DESIGN　/　AUTOMATION　/　</div></section>
 <section className="intro" id="about"><p className="section-label">WHAT I DO</p><div><h2>From complex requirements<br/>to clear digital products.</h2><p>My background began in life science at Gakushuin University and software development in the Okada Lab. Today I work across product development, web experiences, backend integrations and automation.</p></div></section>
 <section className="work-section" id="work"><div className="section-head"><p className="section-label">SELECTED WORK / 01—05</p><h2>Projects built<br/>end to end.</h2></div><div className="work-grid">{works.map(w=><a className="work-card" href={w[4]} target="_blank" rel="noreferrer" key={w[1]}><div className="card-top"><span>{w[0]}</span><span>{w[2]}</span></div><div className="project-art"><div className="mini-grid"/><Mark/><span className="project-name">{w[1]}</span></div><div className="card-copy"><h3>{w[1]}</h3><p>{w[3]}</p><span className="card-link">View project →</span></div></a>)}</div></section>
 <section className="metrics"><div><strong>05</strong><span>SELECTED PROJECTS</span></div><div><strong>END—TO—END</strong><span>PLANNING TO OPERATION</span></div><div><strong>JP / EN</strong><span>MULTILINGUAL DELIVERY</span></div><div><strong>2026</strong><span>BASED IN TOKYO</span></div></section>
 <section className="stack-section" id="stack"><div><p className="section-label">TECHNOLOGY</p><h2>Tools chosen for<br/>the problem.</h2></div><div className="stack-list">{["TypeScript","Next.js / React","React Native / Expo","Python / FastAPI","Supabase / PostgreSQL","Docker / n8n","GSAP"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></section>
 <section className="contact"><div className="contact-mark"><Mark/></div><p className="section-label">START A PROJECT</p><h2>Have something<br/>worth building?</h2><p>For projects, collaborations, or a conversation about an idea.</p><a className="btn primary" href="mailto:byakkokondo@gmail.com">byakkokondo@gmail.com <b>↗</b></a></section>
 </main>
 <footer><a className="brand" href="#"><Mark/>BYAKKO</a><span>© 2026 BYAKKO KONDO</span><a href="https://github.com/bbbyk105">GITHUB ↗</a></footer>
 </div>
}