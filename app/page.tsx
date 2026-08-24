'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [brushMarks, setBrushMarks] = useState<{ id: number; x: number; y: number; angle: number; size: number }[]>([]);
  const [flecks, setFlecks] = useState<{ id: number; x: number; y: number; driftX: number; driftY: number; size: number }[]>([]);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function scatterFlecks(x: number, y: number) {
      const created = Array.from({ length: 3 }, (_, index) => ({
        id: Date.now() + Math.random() + index,
        x,
        y,
        driftX: -12 + Math.random() * 24,
        driftY: -10 + Math.random() * 18,
        size: 2 + Math.random() * 2,
      }));
      setFlecks((items) => [...items.slice(-30), ...created]);
      window.setTimeout(() => setFlecks((items) => items.filter((item) => !created.some((fleck) => fleck.id === item.id))), 680);
    }

    function leaveBrushMark(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      const last = lastPointer.current;
      if (last && Math.hypot(event.clientX - last.x, event.clientY - last.y) < 10) return;
      const angle = last ? Math.atan2(event.clientY - last.y, event.clientX - last.x) * (180 / Math.PI) : 0;
      const id = Date.now() + Math.random();
      lastPointer.current = { x: event.clientX, y: event.clientY };
      setBrushMarks((marks) => [...marks.slice(-18), { id, x: event.clientX, y: event.clientY, angle, size: 16 + Math.random() * 12 }]);
      scatterFlecks(event.clientX, event.clientY);
      window.setTimeout(() => setBrushMarks((marks) => marks.filter((mark) => mark.id !== id)), 720);
    }

    function touchBrushMark(event: PointerEvent) {
      if (event.pointerType !== 'touch') return;
      const id = Date.now() + Math.random();
      setBrushMarks((marks) => [...marks.slice(-18), { id, x: event.clientX, y: event.clientY, angle: -12 + Math.random() * 24, size: 26 }]);
      scatterFlecks(event.clientX, event.clientY);
      window.setTimeout(() => setBrushMarks((marks) => marks.filter((mark) => mark.id !== id)), 720);
    }

    window.addEventListener('pointermove', leaveBrushMark);
    window.addEventListener('pointerdown', touchBrushMark);
    return () => { window.removeEventListener('pointermove', leaveBrushMark); window.removeEventListener('pointerdown', touchBrushMark); };
  }, []);

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
      <div className="brush-trail" aria-hidden="true">
        {brushMarks.map((mark) => <i key={mark.id} className="brush-mark" style={{ left: mark.x, top: mark.y, width: mark.size, transform: `translate(-50%, -50%) rotate(${mark.angle}deg)` }} />)}
        {flecks.map((fleck) => <i key={fleck.id} className="brush-fleck" style={{ left: fleck.x, top: fleck.y, width: fleck.size, height: fleck.size, '--fleck-x': `${fleck.driftX}px`, '--fleck-y': `${fleck.driftY}px` } as React.CSSProperties} />)}
      </div>
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
