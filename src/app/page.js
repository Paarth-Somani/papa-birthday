'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Background from '@/components/Background';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import Wishes from '@/components/Wishes';
import Confetti from '@/components/Confetti';
import { letter } from '@/lib/content';
import { topPhotos } from '@/lib/photos';

const blurUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
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
              190
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
        <span className="nav-mark">Papa</span>
        <div className="nav-links">
          <a href="#story">Story</a>
          <a href="#photos">Photos</a>
          <a href="#wishes">Wishes</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-collage">
            <img className="hc1" src={`/images/${topPhotos[0].src}`} alt="" />
            <img className="hc2" src={`/images/${topPhotos[1].src}`} alt="" />
            <img className="hc3" src={`/images/${topPhotos[2].src}`} alt="" />
            <img className="hc4" src={`/images/${topPhotos[3].src}`} alt="" />
          </div>

          <motion.p className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            today is the day
          </motion.p>
          <motion.h1 className="hero-title"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.1 }}>
            Happy Birthday,<br /><span className="shine">Papa</span>
          </motion.h1>
          <motion.p className="hero-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Forty nine years in, and you are still my favourite story to tell. I built
            this whole thing myself, for the one person who never missed a single
            moment of mine.
          </motion.p>
          <motion.div className="hero-cta"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
            <a href="#story" className="btn btn-primary"><span>Start the story</span><ArrowDown size={18} /></a>
            <a href="#wishes" className="btn btn-ghost">Leave a wish</a>
          </motion.div>

          <div className="scroll-cue"><span className="line" /><p>scroll</p></div>
        </section>

        {/* LETTER */}
        <section className="letter section-pad">
          <div className="wrap">
            <motion.p className="letter-lead" {...blurUp}>{letter.lead}</motion.p>
            {letter.paragraphs.map((para, i) => (
              <motion.p className="letter-text" key={i} {...blurUp} transition={{ ...blurUp.transition, delay: 0.1 + i * 0.1 }}>
                {para}
              </motion.p>
            ))}
            <motion.p className="letter-sign" {...blurUp}>{letter.sign}</motion.p>
            <motion.p className="letter-from" {...blurUp}>Parth</motion.p>
          </div>
        </section>

        {/* STORY / TIMELINE */}
        <section className="section-pad" id="story">
          <div className="wrap">
            <motion.p className="eyebrow" {...blurUp}>the throughline</motion.p>
            <motion.h2 className="s-title" {...blurUp}>One word carried<br />every <em>single chapter.</em></motion.h2>
            <motion.p className="s-desc" {...blurUp}>
              From a freight business his grandfather started in 1979, through a year
              in 2008 that most people would never have come back from, to three
              companies and a community he still shows up for. Here is the throughline,
              the way I have watched it my whole life.
            </motion.p>
          </div>
          <Timeline />
        </section>

        {/* PHOTOS */}
        <section className="section-pad" id="photos">
          <div className="wrap">
            <motion.p className="eyebrow" {...blurUp}>the proof</motion.p>
            <motion.h2 className="s-title" {...blurUp}>A life, <em>in full colour.</em></motion.h2>
            <motion.p className="s-desc" {...blurUp}>
              Rajasthan rooftops, water on every continent, a sunrise on safari, and a
              hundred ordinary evenings at home. He is smiling in every single one. Tap
              any photo to open it.
            </motion.p>
          </div>
          <div className="wrap" style={{ maxWidth: '1320px' }}>
            <Gallery />
          </div>
        </section>

        {/* WISHES */}
        <section className="section-pad" id="wishes">
          <div className="wrap">
            <motion.p className="eyebrow" {...blurUp}>शुभकामनाएं</motion.p>
            <motion.h2 className="s-title" {...blurUp}>Leave Papa a <em>birthday wish.</em></motion.h2>
            <motion.p className="s-desc" {...blurUp}>
              Family, friends, the whole Inland family. Write him something. It will
              show up right here for him to read today.
            </motion.p>
            <Wishes onSent={() => confettiRef.current?.burst(window.innerWidth / 2, window.innerHeight / 2, 90)} />
          </div>
        </section>

        {/* FINALE */}
        <section className="finale" ref={finaleRef}>
          <Confetti ref={confettiRef} />
          <div className="wrap" style={{ position: 'relative', zIndex: 6 }}>
            <motion.p className="finale-eyebrow" {...blurUp}>from me, today and always</motion.p>
            <motion.h2 className="finale-title" {...blurUp}>Happy Birthday, Papa.</motion.h2>
            <motion.p className="finale-sub" {...blurUp}>Here is to your next chapter. Write it the way you always have.</motion.p>
            <motion.button className="btn btn-primary" {...blurUp}
              onClick={() => {
                const c = finaleRef.current?.querySelector('#confetti');
                confettiRef.current?.burst((c?.offsetWidth || window.innerWidth) / 2, (c?.offsetHeight || 400) * 0.6, 180);
              }}>
              <span>🎉 One more time</span>
            </motion.button>
          </div>
        </section>

        <footer>Made by Parth, with love. June 2026</footer>
      </main>
    </>
  );
}
