'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { milestones } from '@/lib/content';

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 70%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="tl" ref={ref}>
      {/* Animated spine path */}
      <svg className="tl-svg" viewBox="0 0 2 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffc24b" />
            <stop offset="50%" stopColor="#ff9e2c" />
            <stop offset="100%" stopColor="#ff5d73" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 1 0 Q 1.2 150 1 300 Q 0.8 450 1 600 Q 1.2 750 1 1000"
          stroke="url(#tlGrad)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>

      {/* Timeline cards */}
      {milestones.map((m, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const isFeature = m.feature;
        const yOffset = i * 140;

        return (
          <motion.div
            key={m.year + i}
            className={`tl-row ${side} tone-${m.tone} ${isFeature ? 'feature' : ''}`}
            style={{
              position: 'relative',
              marginTop: i === 0 ? '0px' : '80px',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated dot */}
            <motion.div
              className={`tl-dot ${isFeature ? 'feature' : ''}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: 'spring',
                stiffness: 120,
                damping: 15,
              }}
              whileHover={{ scale: 1.3 }}
            />

            {/* Card with bounce animation */}
            <motion.div
              className={`tl-card ${isFeature ? 'feature' : ''}`}
              initial={{
                opacity: 0,
                x: side === 'left' ? 60 : -60,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                type: 'spring',
                stiffness: 100,
                damping: 18,
              }}
              whileHover={{
                y: -8,
                boxShadow:
                  '0 20px 40px rgba(0,0,0,0.15), 0 0 40px rgba(255, 193, 7, 0.2)',
              }}
            >
              <span className="tl-year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>

              {/* Feature card accent */}
              {isFeature && (
                <div className="feature-accent">
                  <span className="accent-label">the pivot</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
