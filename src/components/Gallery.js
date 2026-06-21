'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { chapters } from '@/lib/photos';

// portrait-oriented files get a taller tile
const portraits = new Set([
  'young_dad_kids_01.jpg',
  'pacific_cultural_family.jpg',
  'safari_family_sunrise.jpg',
  'barcelona_solo_family_01.jpg',
  'barcelona_family_02.jpg',
  'wedding_tent_group.jpg',
  'bride_family_red.jpg',
  'anniversary_kiss.jpg',
  'selfie_4_kids.jpg',
  'prague_couple_01.jpg',
  'barcelona_extfamily_02.jpg',
]);

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <>
      {chapters.map((ch) => (
        <div className="chapter" key={ch.id}>
          <motion.div
            className="chapter-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>{ch.label}</h3>
            <span className="note">{ch.note}</span>
          </motion.div>

          <div className="chapter-grid">
            {ch.photos.map((p, i) => (
              <motion.div
                key={p.src}
                className={`tile ${portraits.has(p.src) ? 'portrait' : ''}`}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(p)}
              >
                <img src={`/images/${p.src}`} alt={p.cap} loading="lazy" />
                <span className="cap">{p.cap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {active && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
        >
          <button className="close" aria-label="Close" onClick={() => setActive(null)}>×</button>
          <motion.img
            src={`/images/${active.src}`}
            alt={active.cap}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}
