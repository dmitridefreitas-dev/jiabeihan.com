// Shared spring physics constants — use these across all components
// instead of custom ease curves for consistent, organic motion

export const springs = {
  // Snappy: buttons, toggles, UI feedback
  snappy: { type: 'spring', stiffness: 500, damping: 30 },
  // Content: cards, text reveals, section entrances
  content: { type: 'spring', stiffness: 200, damping: 25, mass: 0.8 },
  // Ambient: background blobs, slow drifts
  ambient: { type: 'spring', stiffness: 40, damping: 15, mass: 2 },
};
