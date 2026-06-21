'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function Wishes({ onSent }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ text: '', kind: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    try {
      const { data, error } = await supabase
        .from('birthday_wishes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setWishes(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function submit(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus({ text: 'Connect Supabase first (see README) to enable wishes.', kind: 'err' });
      return;
    }
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    setStatus({ text: 'Sending…', kind: '' });
    try {
      const { error } = await supabase
        .from('birthday_wishes')
        .insert([{ name: name.trim(), relation: relation.trim(), message: message.trim() }]);
      if (error) throw error;
      setStatus({ text: 'Sent with love.', kind: 'ok' });
      setName(''); setRelation(''); setMessage('');
      load();
      onSent?.();
    } catch (e) {
      console.error(e);
      setStatus({ text: 'Could not send that — please try again.', kind: 'err' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className="wish-form" onSubmit={submit}>
        <div className="wish-row">
          <input
            type="text" placeholder="Your name" value={name}
            onChange={(e) => setName(e.target.value)} maxLength={60} required
          />
          <input
            type="text" placeholder="How you know him — e.g. daughter, friend" value={relation}
            onChange={(e) => setRelation(e.target.value)} maxLength={60}
          />
        </div>
        <textarea
          rows={3} placeholder="Write your birthday message…" value={message}
          onChange={(e) => setMessage(e.target.value)} maxLength={500} required
        />
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          <span>{submitting ? 'Sending…' : 'Send birthday wish'}</span>
          <Send size={18} />
        </button>
        <p className={`wish-status ${status.kind}`}>{status.text}</p>
      </form>

      <div className="wish-grid">
        {loading && <p className="wish-empty">Loading wishes…</p>}
        {!loading && !isSupabaseConfigured && (
          <p className="wish-empty">The guestbook turns on once Supabase is connected — see the README for the 10-minute setup.</p>
        )}
        {!loading && isSupabaseConfigured && wishes.length === 0 && (
          <p className="wish-empty">No wishes yet — be the first.</p>
        )}
        {wishes.map((w, i) => (
          <motion.div
            key={w.id || i}
            className="wish-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
          >
            <p>{w.message}</p>
            <div className="meta">{w.name}{w.relation ? ` · ${w.relation}` : ''}</div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
