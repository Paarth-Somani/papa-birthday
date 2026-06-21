'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { chapters } from '@/lib/photos';

// portrait-oriented files get a taller tile
const portraits = new Set([
  'young_dad_kids_toddlers.jpg',
  'barcelona_city_family.jpg',
  'barcelona_old_town_group.jpg',
  'safari_family_sunrise.jpg',
  'wedding_traditional_family.jpg',
  'prague_couple_romantic.jpg',
  'parth_solo_portrait.jpg',
  'aryamann_solo_portrait.jpg',
  'tvesha_solo_portrait.jpg',
]);

export default function Gallery() {
  const [active, setActive] = useState(null);

  // Flatten all photos from all chapters into one continuous stream
  const allPhotos = chapters.flatMap((ch) => ch.photos);

  return (
    <>
      <div className="continuous-gallery">
        {allPhotos.map((p, i) => (
          <motion.div
            key={`${p.src}-${i}`}
            className={`tile ${portraits.has(p.src) ? 'portrait' : ''}`}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: Math.min(i * 0.03, 0.2),
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setActive(p)}
          >
            <img src={`/images/${p.src}`} alt={p.cap} loading="lazy" />
            <span className="cap">{p.cap}</span>
          </motion.div>
        ))}
      </div>

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
