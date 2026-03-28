'use client';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function ExperienceModal({ experience, isOpen, onClose }) {
  if (!experience) return null;

  const details = experience.description;
  const detailsArray = Array.isArray(details) ? details : [details];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">{experience.date}</Badge>
            {experience.type && (
              <Badge variant="secondary" className="text-xs capitalize">{experience.type}</Badge>
            )}
          </div>
          <DialogTitle className="font-serif text-xl leading-snug text-secondary">{experience.title}</DialogTitle>
          <DialogDescription>
            {experience.role} &middot; {experience.organization}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
            Key Responsibilities &amp; Achievements
          </h4>
          <ul className="space-y-3">
            {detailsArray.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span className="text-sm text-muted leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          {experience.paperLink && (
            <a
              href={experience.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent border border-accent/30 hover:border-accent/60 rounded px-3 py-2 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> View Published Paper
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
