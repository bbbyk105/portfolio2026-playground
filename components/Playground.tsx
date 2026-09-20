"use client";
import {useEffect,useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const works=[
["01","CaRoot","Consumer app / Nutrition","2026","A personal calorie and nutrition product designed to make everyday meal logging effortless.","https://www.caroot.app"],
["02","Hakuho","Precision machining","2026","A conversion-focused corporate experience for a precision-machining company.","https://www.hakuhofactory.com"],
["03","Goodwill Legal","Legal / Professional services","2026","A clear digital front door for a Sapporo administrative scrivener's office.","https://goodwill-legal.jp"],
["04","Jurakuen","Organic tea / Commerce","2025","A bilingual direct-to-consumer experience for an organic tea producer in Fuji.","https://www.jurakuen.com"],
["05","DMC Fuji","Photography / Studio","2025","A bilingual visual experience bringing photography and related services into one system.","https://www.dmc123.jp"]
];

function BalloonFlower({className=""}:{className?:string}){return <div className={"balloon-flower "+className} aria-hidden="true"><i/><i/><i/><i/><i/><b/></div>}
function SoftFlower({className=""}:{className?:string}){return <div className={"soft-flower "+className} aria-hidden="true"><i/><i/><i/><i/><i/></div>}

export default function Playground(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  gsap.from(".hero-word span",{yPercent:120,rotate:4,duration:1.15,stagger:.08,ease:"power4.out"});
  gsap.from(".balloon-main",{scale:.65,opacity:0,rotate:-18,duration:1.5,delay:.25,ease:"elastic.out(1,.7)"});
  gsap.to(".balloon-main",{y:-22,rotate:7,duration:4.2,repeat:-1,yoyo:true,ease:"sine.inOut"});
  gsap.to(".bg-flower-a",{rotate:80,y:100,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.to(".bg-flower-b",{rotate:-70,y:-80,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.utils.toArray<HTMLElement>(".work").forEach((el,i)=>gsap.from(el,{x:i%2?80:-80,opacity:.15,scrollTrigger:{trigger:el,start:"top 88%",end:"top 45%",scrub:1}}));
  gsap.to(".ticker-inner",{xPercent:-25,ease:"none",scrollTrigger:{trigger:".ticker",start:"top bottom",end:"bottom top",scrub:1}});
  gsap.to(".about-balloon",{rotate:55,y:-120,scrollTrigger:{trigger:".about",start:"top bottom",end:"bottom top",scrub:1}});
 },root);return()=>ctx.revert()},[]);
 return <div ref={root}>
 <header><a className="logo" href="#">BYAKKO®</a><nav><a href="#works">WORKS</a><a href="#about">ABOUT</a><a href="mailto:byakkokondo@gmail.com">CONTACT</a></nav><span className="menu">TOKYO / JP</span></header>
 <main>
 <section className="hero">
  <SoftFlower className="bg-flower-a"/><SoftFlower className="bg-flower-b"/>
  <BalloonFlower className="balloon-main"/>
  <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
  <div className="sticker">GOOD IDEAS<br/>MOVE PEOPLE.</div>
  <p className="eyebrow">CREATIVE DEVELOPER / ENGINEER — 2026</p>
  <h1 className="hero-word"><span>MAKE</span><span>IT</span><span className="aqua">MOVE.</span></h1>
  <div className="hero-bottom"><p>INTERACTIVE EXPERIENCES<br/>FOR A BRIGHTER TOMORROW.</p><a href="#works" className="round"><span className="arrow-line"/></a><p className="right">ENGINEERING × DESIGN<br/>MOTION × INTERACTION</p></div>
 </section>
 <div className="ticker"><div className="ticker-inner">DESIGN　×　DEVELOPMENT　×　MOTION　×　INTERACTION　×　PRODUCT　×　DESIGN　×　DEVELOPMENT　×　MOTION　×　INTERACTION　×　PRODUCT　×　</div></div>
 <section id="works" className="works"><div className="section-title"><span>01 / SELECTED WORK</span><h2>WORKS—</h2><p>Products and sites designed and built end to end.</p></div>{works.map(w=><a className="work" href={w[5]} target="_blank" rel="noreferrer" key={w[1]}><div className="work-num">{w[0]}</div><div><h3>{w[1]}</h3><p>{w[2]} — {w[3]}</p></div><p className="statement">{w[4]}</p><div className="arrow"><span/></div></a>)}</section>
 <section id="about" className="about"><SoftFlower className="about-bg"/><BalloonFlower className="about-balloon"/><p className="micro">02 / ABOUT — BYAKKO KONDO</p><h2>I BUILD DIGITAL<br/><em>THINGS THAT MOVE.</em></h2><div className="about-grid"><p>My background began in life science at Gakushuin University. In the Okada Lab, I developed software for protein-structure analysis and automated structural-data workflows.</p><p>Today I work across mobile products, websites, commerce, backend integrations and automation — from requirements and UI/UX to implementation, deployment and operation.</p></div><div className="journey"><span>GAKUSHUIN / OKADA LAB</span><span>LETTERFAN / DRUMROLL</span><span>FREELANCE ENGINEER</span><span>CaRoot / PRODUCT</span><span>NPO PROUD / DIRECTOR</span></div></section>
 <section className="stack"><p className="micro">03 / TOOLBOX</p><div className="stackline">TYPESCRIPT　PYTHON　NEXT.JS　REACT　REACT NATIVE　EXPO　FASTAPI　SUPABASE　POSTGRESQL　DOCKER　N8N　GSAP</div></section>
 <section className="contact"><p className="micro">04 / CONTACT</p><h2>HAVE A GOOD IDEA?<br/><span>LET'S MOVE IT.</span></h2><a href="mailto:byakkokondo@gmail.com">BYAKKOKONDO@GMAIL.COM <i className="external-arrow"/></a></section>
 </main><footer><span>BYAKKO KONDO © 2026</span><a href="https://github.com/bbbyk105">GITHUB <i className="external-arrow"/></a><span>ENGINEER / CREATIVE DEVELOPER</span></footer>
 </div>
}