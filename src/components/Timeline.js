'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { milestones } from '@/lib/content';

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  return (
    <div className="tl" ref={ref}>
      <div className="tl-spine">
        <motion.div className="tl-spine-fill" style={{ scaleY: fill }} />
      </div>

      {milestones.map((m, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        return (
          <div className={`tl-row ${side} tone-${m.tone}`} key={m.year + i}>
            <motion.span
              className={`tl-dot ${m.feature ? 'feature' : ''}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.1 }}
            />
            <motion.div
              className={`tl-card ${m.feature ? 'feature' : ''}`}
              initial={{ opacity: 0, x: side === 'left' ? 44 : -44, y: 14 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {m.photo && (
                <div className="tl-photo">
                  <img src={`/images/${m.photo}`} alt={m.title} loading="lazy" />
                </div>
              )}
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
