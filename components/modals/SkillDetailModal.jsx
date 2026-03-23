'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function SkillDetailModal({ skill, isOpen, onClose }) {
  if (!skill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-1">
            {skill.category}
          </p>
          <DialogTitle className="font-serif">{skill.name}</DialogTitle>
          <DialogDescription className="leading-relaxed">{skill.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-2">
              Used For
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(skill.usedFor || []).map((item, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-2">
              Key Libraries &amp; Features
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(skill.keyFeatures || []).map((item, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
