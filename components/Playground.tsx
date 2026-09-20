"use client";
import {useRef} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import Ticker from "./Ticker";
import Reveal from "./Reveal";
import LottieMark from "./LottieMark";
import {C} from "./Lang";
import {capabilities,home,site,tech,ui} from "@/lib/site";

gsap.registerPlugin(useGSAP);

export default function Playground(){
 const root=useRef<HTMLElement>(null);
 /* useGSAP, not useEffect: it reverts the tween when the effect re-runs. A bare
    gsap.from() records whatever the element looks like at the time it is called,
    so a second run — a client-side navigation back to the homepage, or React's
    development double-mount — captured the mid-entrance opacity as its end
    value and left the hero stuck near invisible. */
 useGSAP(()=>{
  const targets=gsap.utils.toArray<HTMLElement>(".reveal",root.current);
  if(!targets.length)return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(targets,{clearProps:"all"});return}
  gsap.from(targets,{y:32,opacity:0,duration:1.05,stagger:.08,ease:"power3.out",
   onComplete:()=>gsap.set(targets,{clearProps:"opacity,transform"})});
 },{scope:root});
 return <main ref={root}>
  <SiteNav/>
  <section className="hero">
   <div className="gridbg"/>
   <div className="heroTop reveal"><p className="eyebrow"><C value={home.eyebrow}/></p><p className="heroMeta"><C value={site.place}/><br/><C value={ui.available}/></p></div>
   <h1 className="reveal">BUILDING<br/><em>DIGITAL SYSTEMS</em><br/>THAT SHIP.</h1>
   <div className="heroFoot">
    <div className="heroBottom reveal"><p><C value={home.intro}/></p><a href="#can-do"><C value={home.exploreWork}/> <b>↘</b></a></div>
    <div className="terminal reveal"><div className="termbar"><span>~/byakko/portfolio</span></div><pre><span className="cyan">$</span> whoami{"\n"}Byakko Kondo{"\n"}<span className="muted">engineer / creative developer / tokyo</span>{"\n\n"}<span className="cyan">$</span> status{"\n"}shipping products <span className="green">✓</span>{"\n"}building systems <span className="green">✓</span>{"\n"}open to projects <span className="green">✓</span><span className="cursor">▋</span></pre></div>
   </div>
  </section>
  <Ticker/>
  <section id="can-do" className="canDo"><header className="sectionHead"><p>01 / WHAT I CAN DO</p><h2>WHAT I CAN<br/><em>BUILD FOR YOU.</em></h2><p className="side"><C value={home.canDoSide}/></p></header>
   <Reveal className="canDoGrid" stagger={0.09}>{capabilities.map(c=><article className="canDoCard" key={c.index}><div className="canDoMark"><LottieMark src={c.mark}/></div><div className="canDoBody"><span className="canDoIndex">{c.index}</span><h3><C value={c.title}/></h3><p><C value={c.body}/></p><div className="chips">{c.items.map(i=><span key={i}>{i}</span>)}</div></div></article>)}</Reveal>
   <Link className="canDoWorks" href="/works"><span><C value={home.canDoWorks}/></span><b><C value={ui.allWorks}/> ↗</b></Link>
  </section>
  <section id="about" className="about"><div className="sectionHead"><p>02 / ABOUT</p><h2>IDEA TO<br/><em>IMPLEMENTATION.</em></h2></div><div className="aboutGrid"><p className="bigcopy"><C value={home.aboutLede}/></p><div className="bio">{home.aboutBio.map(p=><p key={p.en}><C value={p}/></p>)}</div></div>
   <div className="timeline">{home.timeline.map(t=><div key={t.span}><span>{t.span}</span><b><C value={t.title}/></b><p><C value={t.note}/></p></div>)}</div>
  </section>
  <section className="stack"><p>03 / CAPABILITIES</p><h2>THE STACK IS A TOOL.<br/><em>THE OUTCOME IS THE PRODUCT.</em></h2><div className="techgrid">{tech.map((t,i)=><div key={t}><span>{String(i+1).padStart(2,"0")}</span>{t}<b>↗</b></div>)}</div></section>
  <section className="contact"><p>04 / START A PROJECT</p><h2>HAVE AN IDEA?<br/><em>LET&apos;S BUILD IT.</em></h2><a href="mailto:byakkokondo@gmail.com">BYAKKOKONDO@GMAIL.COM <span>↗</span></a></section>
  <SiteFooter/>
 </main>
}
