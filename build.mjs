import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const site = read('content/site.json');
const home = read('content/home.json');
const about = read('content/about.json');
const approach = read('content/approach.json');
const contact = read('content/contact.json');
const resume = read('content/resume.json');
const projects = fs.readdirSync(path.join(root, 'content/projects'))
  .filter(n => n.endsWith('.json'))
  .map(n => read(`content/projects/${n}`))
  .sort((a,b) => (Number(a.order)||0) - (Number(b.order)||0));
const e = (s='') => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const href = (s='') => {
 const t=String(s||'').trim();
 if(t.startsWith('/') && !t.startsWith('//') && !/[\s<>"']/.test(t)) return e(t);
 if(/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:[\/?#][^\s<>"']*)?$/i.test(t)) return e(t);
 return '';
};
const image = (s,alt='',cls='') => href(s) ? `<img src="${href(s)}" alt="${e(alt)}" class="${e(cls)}" loading="lazy">` : '';
const paras = s => String(s||'').split(/\n\s*\n/).filter(Boolean).map(p => `<p>${e(p).replace(/\n/g,'<br>')}</p>`).join('');
const bullets = values => `<ul class="bullets">${(values||[]).map(s=>`<li>${e(s)}</li>`).join('')}</ul>`;
const card = p => `<article class="work-card"><a class="card-image-link" href="/portfolio/${encodeURIComponent(p.slug||'')}/" aria-label="Read ${e(p.title)} case study">${image(p.image,p.sample?'Illustrative sample project thumbnail':`Thumbnail for ${p.title}`,'card-image')}</a><div class="card-body"><div class="card-kicker">${e(p.category)}</div><h3><a href="/portfolio/${encodeURIComponent(p.slug||'')}/">${e(p.title)}</a></h3><p>${e(p.summary)}</p><a class="case-link" href="/portfolio/${encodeURIComponent(p.slug||'')}/">View case study <span aria-hidden="true">→</span></a></div></article>`;
const navs = [['Home','/'],['About','/about/'],['Portfolio','/portfolio/'],['My Approach','/approach/'],['Contact','/contact/']];
function header(active='') {
 const nav = navs.map(([label,url])=>`<a href="${url}" ${active===url?'aria-current="page"':''}>${label}</a>`).join('');
 return `<header class="site-header"><div class="header-inner"><a href="/" class="brand" aria-label="Home"><span class="brand-mark">ZR</span><span class="brand-content"><strong>${e(site.name)}</strong><small>${e(site.brand_subtitle)}</small></span></a><nav class="desktop-nav" aria-label="Main navigation">${nav}</nav><a class="resume-nav" href="/resume/">View Résumé <span aria-hidden="true">↗</span></a><details class="mobile-nav"><summary aria-label="Open navigation menu"><span>Menu</span><span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation">${nav}<a href="/resume/">Résumé</a></nav></details></div></header>`;
}
function footer() {return `<footer class="site-footer"><div class="footer-inner"><p><strong>${e(site.name)}</strong><span> · ${e(site.brand_subtitle)}</span></p><p>${e(site.footer_note)}</p><a href="/contact/">Get in touch <span aria-hidden="true">→</span></a></div></footer>`}
function layout(title,desc,body,active='') {
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="theme-color" content="#ffffff"><meta name="description" content="${e(desc)}"><title>${e(title)} | ${e(site.name)}</title><link rel="stylesheet" href="/assets/styles.css"></head><body><a class="skip-link" href="#main">Skip to content</a>${header(active)}<main id="main">${body}</main>${footer()}</body></html>`;
}
function pageIntro(data) {return `<p class="eyebrow">${e(data.eyebrow)}</p><h1>${e(data.headline)}</h1><div class="lead">${paras(data.introduction)}</div>`}
function contentSection(title,body) {return `<section class="text-section"><h2>${e(title)}</h2>${paras(body)}</section>`}
const homepage = `<section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">${e(home.eyebrow)}</p><h1>${e(home.headline_line_one)}<br>${e(home.headline_line_two)} <em>${e(home.headline_emphasis)}</em></h1><p class="hero-description">${e(home.introduction)}</p><a class="primary-button" href="#selected-work">Explore My Work <span aria-hidden="true">→</span></a></div><div class="hero-photo">${image(home.portrait,'Demonstration portrait — replace with an authentic professional photograph','portrait')}</div></div></section>
<section class="work-section container" id="selected-work"><div class="section-heading"><h2>Selected Work</h2><p>${e(home.work_intro)}</p></div><div class="work-grid">${(projects.filter(p=>p.featured).slice(0,3).length?projects.filter(p=>p.featured).slice(0,3):projects.slice(0,3)).map(card).join('')}</div><div class="work-more"><a href="/portfolio/">View all projects <span aria-hidden="true">→</span></a></div></section>
<section class="strengths wide-container" aria-label="Key strengths"><h2>Key<br>Strengths</h2><ul>${(home.strengths||[]).map(s=>`<li><span aria-hidden="true">✓</span>${e(s)}</li>`).join('')}</ul></section>`;
const aboutPage = `<div class="content-page container">${pageIntro(about)}${contentSection(about.experience_heading,about.experience_body)}${contentSection(about.leadership_heading,about.leadership_body)}<section class="text-section"><h2>Areas of focus</h2>${bullets(about.focus_points)}</section><div class="quiet-cta"><a href="/portfolio/">See my approach in action <span aria-hidden="true">→</span></a></div></div>`;
const approachPage = `<div class="content-page container">${pageIntro(approach)}<div class="process-grid">${(approach.phases||[]).map((s,i)=>`<article class="process-card"><span class="step-number">0${i+1}</span><h2>${e(s.title)}</h2>${paras(s.description)}</article>`).join('')}</div>${contentSection(approach.tools_heading,approach.tools_body)}<div class="quiet-cta"><a href="/portfolio/">Explore my portfolio <span aria-hidden="true">→</span></a></div></div>`;
const portfolioPage = `<div class="content-page container"><p class="eyebrow">Portfolio</p><h1>Selected Learning Design Work</h1><div class="lead"><p>Examples of eLearning design, curriculum development, and instructional design leadership. Open each project to see the challenge, design choices, deliverables, and evidence.</p></div><div class="work-grid portfolio-grid">${projects.map(card).join('')}</div><p class="fine-print">Some entries are sample outlines awaiting approved project details. Please replace sample images and text before using this portfolio in applications.</p></div>`;
const resumeLink = href(site.resume_url);
const resumePage = `<div class="content-page container">${pageIntro(resume)}<div class="info-panel">${resumeLink?`<a class="primary-button" href="${resumeLink}" target="_blank" rel="noopener noreferrer">Open my résumé <span aria-hidden="true">↗</span></a>`:`<p class="placeholder-info">${e(resume.note)}</p>`}</div><div class="quiet-cta"><a href="/contact/">Contact me <span aria-hidden="true">→</span></a></div></div>`;
const email = String(site.email||'').trim(), linkedIn = href(site.linkedin_url);
const contactLinks = `${email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?`<a class="contact-tile" href="mailto:${e(email)}"><span class="contact-icon" aria-hidden="true">✉</span><span><strong>Email</strong><small>${e(email)}</small></span><span aria-hidden="true">→</span></a>`:''}${linkedIn?`<a class="contact-tile" href="${linkedIn}" target="_blank" rel="noopener noreferrer"><span class="contact-icon" aria-hidden="true">in</span><span><strong>LinkedIn</strong><small>View professional profile</small></span><span aria-hidden="true">↗</span></a>`:''}`;
const contactPage = `<div class="content-page container">${pageIntro(contact)}<div class="contact-options">${contactLinks||`<div class="info-panel"><p class="placeholder-info">${e(contact.note)}</p></div>`}</div></div>`;
function projectPage(p){const demoLink=href(p.external_url);return `<div class="content-page project-page container"><p class="eyebrow">${e(p.category)}</p><h1>${e(p.title)}</h1><div class="lead"><p>${e(p.summary)}</p></div>${p.sample?'<p class="sample-label">Sample case study outline — replace with approved project details before publishing</p>':''}<div class="project-hero-image">${image(p.image, p.sample?'Illustrative placeholder for case study':`Project image for ${p.title}`,'project-image')}</div>${contentSection('The challenge',p.challenge)}${contentSection('My design process',p.design_process)}${contentSection('Solution & deliverables',p.deliverables)}${contentSection('Results & evidence',p.outcomes)}${contentSection('Tools & collaboration',p.tools)}${demoLink?`<a class="primary-button" href="${demoLink}" target="_blank" rel="noopener noreferrer">View live sample <span aria-hidden="true">↗</span></a>`:''}<div class="quiet-cta"><a href="/portfolio/">← Back to portfolio</a></div></div>`}
function writePage(route,title,desc,body,nav){const dir = route==='/'?out:path.join(out,route.replace(/^\/+|\/+$/g,'')); fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),layout(title,desc,body,nav),'utf8');}
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
writePage('/','Home','Learning design, strategy, and leadership portfolio.',homepage,'/');
writePage('/about/','About','Experience in instructional design, learner support, and leadership.',aboutPage,'/about/');
writePage('/portfolio/','Portfolio','Learning design project case studies.',portfolioPage,'/portfolio/');
writePage('/approach/','My Approach','ADDIE, Agile, collaboration, and iteration.',approachPage,'/approach/');
writePage('/resume/','Résumé','Professional experience and résumé.',resumePage,'');
writePage('/contact/','Contact','Connect about instructional design and learning opportunities.',contactPage,'/contact/');
for(const p of projects){if(!/^[a-z0-9-]+$/.test(p.slug))throw new Error('Invalid case study slug');writePage(`/portfolio/${p.slug}/`,p.title,p.summary,projectPage(p),'/portfolio/')}
fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n','utf8');
console.log(`Built ${6+projects.length} pages in ${out}`);
