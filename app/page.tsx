'use client';

import { useState } from 'react';

const works = [
  { src: '/works/summer-lingxi.jpg', title: '一个由海浪书写的夏天', tag: '原创角色 · 海报' },
  { src: '/works/kill-la-kill.jpg', title: '战斗姿态', tag: '人物插画 · 同人' },
  { src: '/works/headphones.jpg', title: '耳机女孩', tag: '人物插画' },
  { src: '/works/experiment-04.jpg', title: 'EL LISSITZKY', tag: '实验作品 · 海报' },
  { src: '/works/apex-bangalore.png', title: '班加罗尔邮票', tag: 'APEX · 角色设计' },
  { src: '/works/apex-octane.png', title: '动力小子邮票', tag: 'APEX · 角色设计' },
];

export default function Home() {
  const [rays, setRays] = useState<{ id: number; x: number; y: number; delay: number; angle: number }[]>([]);

  function radiateAtWorks(event: React.MouseEvent<HTMLAnchorElement>) {
    const id = Date.now();
    setRays(Array.from({ length: 8 }, (_, index) => ({
      id: id + index,
      x: event.clientX,
      y: event.clientY,
      delay: index * 35,
      angle: index * 45,
    })));
    window.setTimeout(() => setRays([]), 760);
  }

  return (
    <main>
      <div className="line-burst" aria-hidden="true">
        {rays.map((ray) => <i key={ray.id} className="radiating-line" style={{ left: ray.x, top: ray.y, animationDelay: `${ray.delay}ms`, '--angle': `${ray.angle}deg` } as React.CSSProperties} />)}
      </div>
      <header className="site-header">
        <a className="brand" href="#top"><img src="/avatar.jpg" alt="恒奈普大叔的头像" />恒奈普大叔<span>HNP</span></a>
        <nav aria-label="页面导航"><a href="#works" onClick={radiateAtWorks}>作品</a><a href="#about">关于</a><a href="#contact">联系</a></nav>
      </header>
      <section className="hero" id="top">
        <p className="eyebrow">ILLUSTRATOR · COMICS · CHARACTER</p>
        <h1>把感兴趣的事，<br />画下来。</h1>
        <p className="intro">恒奈普大叔是一位擅长平涂的插画创作者。<br />主要画人物、插画与小漫画，也会为每一个灵感留出位置。</p>
        <a className="scroll-link" href="#works">查看作品 <span>↓</span></a>
      </section>
      <section className="works" id="works" aria-labelledby="works-title">
        <div className="section-heading"><p className="eyebrow">SELECTED WORKS</p><h2 id="works-title">作品精选</h2><p>人物、色彩和一些正在生长的想象。</p></div>
        <div className="gallery">{works.map((work, index) => <figure className={`work work-${index + 1}`} key={work.src}><div className="image-wrap"><img src={work.src} alt={work.title} /></div><figcaption><strong>{work.title}</strong><span>{work.tag}</span></figcaption></figure>)}</div>
      </section>
      <section className="about" id="about"><p className="eyebrow">ABOUT</p><div><h2>平涂、人物，<br />还有轻松的合作。</h2><p>喜欢用干净的色块和清晰的线条画出角色的情绪。无论是插画、漫画还是小小的个人实验，都希望画面看起来鲜活、有一点自己的故事。</p><p>也很好沟通。欢迎聊聊有趣的创作想法。</p></div></section>
      <footer id="contact"><p className="eyebrow">LET'S MAKE SOMETHING</p><h2>想一起画点什么？</h2><p>有合作想法，欢迎发邮件给我。</p><a className="contact-placeholder" href="mailto:1043846762@qq.com">1043846762@qq.com ↗</a><small>© 恒奈普大叔 · 2026</small></footer>
    </main>
  );
}
