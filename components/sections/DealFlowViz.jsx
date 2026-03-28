'use client';
import { motion } from 'framer-motion';

// Node dimensions
const NODE_W = 110;
const NODE_H = 28;

// Node definitions
const SKILLS = [
  { id: 'python',    label: 'Python',          x: 20,  y: 70  },
  { id: 'excel',     label: 'Excel / VBA',      x: 20,  y: 150 },
  { id: 'sql',       label: 'SQL',              x: 20,  y: 230 },
  { id: 'finmodel',  label: 'Fin. Modeling',    x: 20,  y: 310 },
];

const ROLES = [
  { id: 'cm',   label: 'U.S. Bank CM',    x: 295, y: 100 },
  { id: 'cb',   label: 'U.S. Bank CB',    x: 295, y: 210 },
  { id: 'zlab', label: 'Z-Lab Research',  x: 295, y: 330 },
];

const OUTCOMES = [
  { id: 'abf',        label: '6 ABF Deals',      x: 570, y: 70  },
  { id: 'credit',     label: '$1.2M Credit',      x: 570, y: 150 },
  { id: 'structures', label: '10+ Structures',    x: 570, y: 230 },
  { id: 'ml',         label: 'ML Research',       x: 570, y: 340 },
];

// Connections: [fromNode, toNode, color, index-for-delay]
// Each skill→role and role→outcome connection
const CONNECTIONS = [
  // skill → role
  { from: SKILLS[0], to: ROLES[2],  color: '#1A5DD8', strokeEnd: '#5E1AAF' }, // Python → Z-Lab
  { from: SKILLS[0], to: ROLES[0],  color: '#CC0022', strokeEnd: '#E56B1A' }, // Python → CM
  { from: SKILLS[1], to: ROLES[0],  color: '#CC0022', strokeEnd: '#E56B1A' }, // Excel → CM
  { from: SKILLS[1], to: ROLES[1],  color: '#E56B1A', strokeEnd: '#CC0022' }, // Excel → CB
  { from: SKILLS[2], to: ROLES[2],  color: '#1A5DD8', strokeEnd: '#5E1AAF' }, // SQL → Z-Lab
  { from: SKILLS[3], to: ROLES[0],  color: '#CC0022', strokeEnd: '#E56B1A' }, // FinModel → CM
  { from: SKILLS[3], to: ROLES[1],  color: '#E56B1A', strokeEnd: '#CC0022' }, // FinModel → CB
  // role → outcome
  { from: ROLES[0], to: OUTCOMES[0], color: '#CC0022', strokeEnd: '#E56B1A' }, // CM → ABF
  { from: ROLES[0], to: OUTCOMES[1], color: '#CC0022', strokeEnd: '#E56B1A' }, // CM → Credit
  { from: ROLES[1], to: OUTCOMES[2], color: '#E56B1A', strokeEnd: '#CC0022' }, // CB → Structures
  { from: ROLES[1], to: OUTCOMES[1], color: '#E56B1A', strokeEnd: '#CC0022' }, // CB → Credit
  { from: ROLES[2], to: OUTCOMES[3], color: '#1A5DD8', strokeEnd: '#5E1AAF' }, // Z-Lab → ML
];

function makePath(from, to) {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1} ${midX} ${y2} ${x2} ${y2}`;
}

function NodeRect({ node, labelStyle }) {
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={NODE_W}
        height={NODE_H}
        rx={4}
        fill="rgba(0,68,204,0.06)"
        stroke="rgba(0,68,204,0.2)"
        strokeWidth={1}
      />
      <text
        x={node.x + NODE_W / 2}
        y={node.y + NODE_H / 2 + 4}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', 'Courier New', monospace"
        fontSize={10}
        fill="#1C1C28"
        fontWeight={500}
      >
        {node.label}
      </text>
    </g>
  );
}

const headerMotion = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function DealFlowViz() {
  return (
    <section className="section-full flex-col" aria-label="Deal Flow">
      <div className="w-full px-6 lg:px-12 mb-8">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-4"
          {...headerMotion}
        >
          Value Creation
        </motion.p>
        <motion.h2
          className="font-serif font-bold text-headline text-secondary"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          From Skills to Outcomes
        </motion.h2>
      </div>

      <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
        <svg
          viewBox="0 0 700 420"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          {/* Gradient definitions */}
          <defs>
            {CONNECTIONS.map((conn, i) => (
              <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={conn.color} />
                <stop offset="100%" stopColor={conn.strokeEnd} />
              </linearGradient>
            ))}
          </defs>

          {/* Column headers */}
          {[
            { label: 'CAPABILITIES', x: 20 + NODE_W / 2, y: 48 },
            { label: 'EXPERIENCE',   x: 295 + NODE_W / 2, y: 48 },
            { label: 'OUTCOMES',     x: 570 + NODE_W / 2, y: 48 },
          ].map((header) => (
            <text
              key={header.label}
              x={header.x}
              y={header.y}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', 'Courier New', monospace"
              fontSize={8}
              fill="rgba(0,68,204,0.5)"
              fontWeight={600}
              letterSpacing="0.12em"
            >
              {header.label}
            </text>
          ))}

          {/* Animated paths */}
          {CONNECTIONS.map((conn, i) => (
            <motion.path
              key={i}
              d={makePath(conn.from, conn.to)}
              fill="none"
              stroke={`url(#grad-${i})`}
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              animate={{
                strokeOpacity: [0.6, 0.35, 0.6],
              }}
            />
          ))}

          {/* Skill nodes */}
          {SKILLS.map((node) => (
            <NodeRect key={node.id} node={node} />
          ))}

          {/* Role nodes */}
          {ROLES.map((node) => (
            <NodeRect key={node.id} node={node} />
          ))}

          {/* Outcome nodes */}
          {OUTCOMES.map((node) => (
            <NodeRect key={node.id} node={node} />
          ))}
        </svg>
      </div>
    </section>
  );
}
