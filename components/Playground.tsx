"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import {C} from "./Lang";
import {home,tech,ui} from "@/lib/site";
import {works} from "@/lib/works";

export default function Playground(){
 useEffect(()=>{gsap.from(".reveal",{y:32,opacity:0,duration:1.05,stagger:.08,ease:"power3.out"});gsap.to(".orb",{y:-18,x:12,duration:4,repeat:-1,yoyo:true,ease:"sine.inOut"})},[]);
 return <main>
  <SiteNav/>
  <section className="hero">
   <div className="gridbg"/><div className="orb o1"/><div className="orb o2"/>
   <p className="eyebrow reveal"><i/> <C value={home.eyebrow}/></p>
   <h1 className="reveal">BUILDING<br/><em>DIGITAL SYSTEMS</em><br/>THAT SHIP.</h1>
   <div className="heroBottom reveal"><p><C value={home.intro}/></p><a href="#work"><C value={home.exploreWork}/> <b>↘</b></a></div>
   <div className="terminal reveal"><div className="termbar"><span>~/byakko/portfolio</span><span>● LIVE</span></div><pre><span className="cyan">$</span> whoami{"\n"}Byakko Kondo{"\n"}<span className="muted">engineer / creative developer / tokyo</span>{"\n\n"}<span className="cyan">$</span> status{"\n"}shipping products <span className="green">✓</span>{"\n"}building systems <span className="green">✓</span>{"\n"}open to projects <span className="green">✓</span><span className="cursor">▋</span></pre></div>
  </section>
  <div className="ticker"><div>{[...tech,...tech].map((t,i)=><span key={i}>{t}<b>✳</b></span>)}</div></div>
  <section id="work" className="work"><header className="sectionHead"><p>01 / SELECTED WORK</p><h2>PRODUCTS IN<br/><em>PRODUCTION.</em></h2><p className="side">2025—2026<br/>DESIGN / ENGINEERING / SYSTEMS</p></header>
   <div className="workList">{works.map(w=><article className="project" key={w.slug}><div className="projectMeta"><span>{w.index}</span><span className="upper"><C value={w.kind}/></span><span>{w.year}</span></div><div className="projectBody"><div><h3>{w.name}</h3><p><C value={w.statement}/></p><div className="chips">{w.stack.map(x=><span key={x}>{x}</span>)}</div><a href={w.url} target="_blank" rel="noreferrer"><C value={ui.viewProject}/> ↗</a></div><a className="screen" href={w.url} target="_blank" rel="noreferrer"><img src={w.screens.desktop} alt={w.name} width={1600} height={1000}/><span>LIVE / {w.index}</span></a></div></article>)}</div>
  </section>
  <section id="about" className="about"><div className="sectionHead"><p>02 / ABOUT</p><h2>IDEA TO<br/><em>IMPLEMENTATION.</em></h2></div><div className="aboutGrid"><p className="bigcopy"><C value={home.aboutLede}/></p><div className="bio">{home.aboutBio.map(p=><p key={p.en}><C value={p}/></p>)}</div></div>
   <div className="timeline">{home.timeline.map(t=><div key={t.span}><span>{t.span}</span><b><C value={t.title}/></b><p><C value={t.note}/></p></div>)}</div>
  </section>
  <section className="stack"><p>03 / CAPABILITIES</p><h2>THE STACK IS A TOOL.<br/><em>THE OUTCOME IS THE PRODUCT.</em></h2><div className="techgrid">{tech.map((t,i)=><div key={t}><span>{String(i+1).padStart(2,"0")}</span>{t}<b>↗</b></div>)}</div></section>
  <section className="contact"><p>04 / START A PROJECT</p><h2>HAVE AN IDEA?<br/><em>LET&apos;S BUILD IT.</em></h2><a href="mailto:byakkokondo@gmail.com">BYAKKOKONDO@GMAIL.COM <span>↗</span></a></section>
  <SiteFooter/>
 </main>
}
