'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { milestones } from '@/lib/content';

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 70%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div className="tl" ref={ref}>
      <div className="tl-spine">
        <motion.div className="tl-spine-fill" style={{ scaleY: fill }} />
      </div>

      {milestones.map((m, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        return (
          <div className={`tl-row ${side} tone-${m.tone}`} key={m.year + i}>
            <span className={`tl-dot ${m.feature ? 'feature' : ''}`} />
            <motion.div
              className={`tl-card ${m.feature ? 'feature' : ''}`}
              initial={{ opacity: 0, x: side === 'left' ? 40 : -40, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tl-year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
