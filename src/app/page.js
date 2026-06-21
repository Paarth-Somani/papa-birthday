'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Background from '@/components/Background';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import Wishes from '@/components/Wishes';
import Confetti from '@/components/Confetti';
import { values } from '@/lib/content';
import { heroCollage } from '@/lib/photos';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function Home() {
  const [solid, setSolid] = useState(false);
  const confettiRef = useRef(null);
  const finaleRef = useRef(null);
  const firedRef = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // fire confetti once when finale scrolls into view
  useEffect(() => {
    const el = finaleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            const c = el.querySelector('#confetti');
            confettiRef.current?.burst(
              (c?.offsetWidth || window.innerWidth) / 2,
              (c?.offsetHeight || 400) * 0.55,
              170
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Background />

      <div className="progress"><motion.div className="progress-fill" style={{ scaleX: progress }} /></div>

      <nav className={`nav ${solid ? 'solid' : ''}`}>
        <span className="nav-mark">Pravveen</span>
        <div className="nav-links">
          <a href="#journey">Journey</a>
          <a href="#family">Family</a>
          <a href="#legacy">Legacy</a>
          <a href="#wishes">Wishes</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-collage">
            <img className="hc1" src={`/images/${heroCollage[0]}`} alt="" />
            <img className="hc2" src={`/images/${heroCollage[1]}`} alt="" />
            <img className="hc3" src={`/images/${heroCollage[2]}`} alt="" />
            <img className="hc4" src={`/images/${heroCollage[3]}`} alt="" />
          </div>

          <motion.p className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            today is a special day
          </motion.p>
          <motion.h1 className="hero-title"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            Happy Birthday,<br /><span className="shine">Papa</span>
          </motion.h1>
          <motion.p className="hero-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Four-something chapters in, and you’re still writing the best ones.
            This one’s from all of us — for the man who rebuilt everything,
            twice, and never once missed a single one of our birthdays.
          </motion.p>
          <motion.div className="hero-cta"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
            <a href="#journey" className="btn btn-primary"><span>Begin the story</span><ArrowDown size={18} /></a>
            <a href="#wishes" className="btn btn-ghost">Leave a wish</a>
          </motion.div>

          <div className="scroll-cue"><span className="line" /><p>scroll</p></div>
        </section>

        {/* LETTER */}
        <section className="letter section-pad">
          <div className="wrap">
            <motion.p className="letter-text" {...fadeUp}>
              Somewhere between the early mornings, the late flights, and the
              companies built from nothing, you still showed up for every school
              play, every holiday, every 2am phone call. We don’t say it enough,
              so today we’re saying it properly: <em>we see you, we’re proud of
              you, and we love you.</em>
            </motion.p>
            <motion.p className="letter-sign" {...fadeUp}>— Anu, Parth, Aryamann &amp; Tvesha</motion.p>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section-pad" id="journey">
          <div className="wrap">
            <motion.p className="eyebrow" {...fadeUp}>the thread</motion.p>
            <motion.h2 className="s-title" {...fadeUp}>One word has carried<br />every <em>single chapter.</em></motion.h2>
            <motion.p className="s-desc" {...fadeUp}>
              From a grandfather’s freight business in 1979, through a setback in
              2008 most people would never recover from, to three companies and a
              community he still shows up for — here’s the throughline.
            </motion.p>
          </div>
          <Timeline />
        </section>

        {/* FAMILY */}
        <section className="section-pad" id="family">
          <div className="wrap">
            <motion.p className="eyebrow" {...fadeUp}>three decades, in faces</motion.p>
            <motion.h2 className="s-title" {...fadeUp}>The years, <em>in photographs.</em></motion.h2>
            <motion.p className="s-desc" {...fadeUp}>
              Prague streets, Rhine waterfalls, Barcelona doorways, Scottish
              hillsides, a sunrise over the Mara — and somehow you’re smiling in
              every single one.
            </motion.p>
            <Gallery />
          </div>
        </section>

        {/* LEGACY */}
        <section className="section-pad" id="legacy">
          <div className="wrap">
            <motion.p className="eyebrow" {...fadeUp}>what we actually learned</motion.p>
            <motion.h2 className="s-title" {...fadeUp}>Not the polished version.<br /><em>The real one.</em></motion.h2>
            <div className="values-grid">
              {values.map((v, i) => (
                <motion.div className="value-card" key={v.n}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="n">{v.n}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WISHES */}
        <section className="section-pad" id="wishes">
          <div className="wrap">
            <motion.p className="eyebrow" {...fadeUp}>शुभकामनाएं</motion.p>
            <motion.h2 className="s-title" {...fadeUp}>Leave him a <em>birthday wish.</em></motion.h2>
            <motion.p className="s-desc" {...fadeUp}>
              Family, friends, the whole Inland family — write something. It’ll
              appear here for everyone to see.
            </motion.p>
            <Wishes onSent={() => confettiRef.current?.burst(window.innerWidth / 2, window.innerHeight / 2, 80)} />
          </div>
        </section>

        {/* FINALE */}
        <section className="finale" ref={finaleRef}>
          <Confetti ref={confettiRef} />
          <div className="wrap" style={{ position: 'relative', zIndex: 6 }}>
            <motion.p className="finale-eyebrow" {...fadeUp}>from all of us, today and always</motion.p>
            <motion.h2 className="finale-title" {...fadeUp}>Happy Birthday, Papa.</motion.h2>
            <motion.p className="finale-sub" {...fadeUp}>Here’s to the next chapter — write it the way you always have.</motion.p>
            <motion.button className="btn btn-primary" {...fadeUp}
              onClick={() => {
                const c = finaleRef.current?.querySelector('#confetti');
                confettiRef.current?.burst((c?.offsetWidth || window.innerWidth) / 2, (c?.offsetHeight || 400) * 0.6, 160);
              }}>
              <span>🎉 One more time</span>
            </motion.button>
          </div>
        </section>

        <footer>With love, always. · June 2026</footer>
      </main>
    </>
  );
}
