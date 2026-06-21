'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryPhotos } from '@/lib/photos';

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="masonry">
        {galleryPhotos.map((p, i) => (
          <motion.button
            key={p.src}
            className="m-item"
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: Math.min((i % 6) * 0.06, 0.36), ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(p)}
            aria-label={p.cap}
          >
            <img src={`/images/${p.src}`} alt={p.cap} loading="lazy" />
            <span className="cap">{p.cap}</span>
          </motion.button>
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
          <motion.figure
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={`/images/${active.src}`} alt={active.cap} />
            <figcaption>{active.cap}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </>
  );
}
