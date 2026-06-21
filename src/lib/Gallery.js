'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { photos } from '@/lib/photos';

// Split the stream into three rows that scroll on their own.
function splitRows(list, rows = 3) {
  const out = Array.from({ length: rows }, () => []);
  list.forEach((p, i) => out[i % rows].push(p));
  return out;
}

export default function Gallery() {
  const [active, setActive] = useState(null);
  const rows = splitRows(photos, 3);

  return (
    <>
      <div className="river" aria-label="Photos of Papa, always moving">
        {rows.map((row, r) => (
          <div className={`river-row ${r % 2 === 1 ? 'rev' : ''}`} key={r}>
            {/* duplicated track so the loop is seamless */}
            <div className="river-track">
              {[...row, ...row].map((p, i) => (
                <button
                  key={p.src + i}
                  className="river-item"
                  onClick={() => setActive(p)}
                  aria-label={p.cap}
                >
                  <img src={`/images/${p.src}`} alt={p.cap} loading="lazy" />
                  <span className="cap">{p.cap}</span>
                </button>
              ))}
            </div>
          </div>
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
            initial={{ scale: 0.92, opacity: 0 }}
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
