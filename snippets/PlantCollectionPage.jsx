// Displays a grid of unlockable flower cards.
// Tracks user's total focus minutes and shows which flowers are unlocked.
// If a new flower is unlocked, a toast popup appears and an animation plays.

const unlockThresholds = [10, 30, 75, 90, 50, 120, 200, 250, 300];  // Minutes needed
const flowerNames = [
  'Sunflower', 'Poppy', 'Nocturnal Lily', 'Lily',
  'Flower Baby Deer', 'Witch Magic Bouquet', 'Mangolia Tree',
  'Saturnia', 'Starlight'
];

// Create flower objects with unlock status and UI info
const flowers = flowerNames.map((name, idx) => {
  const required = unlockThresholds[idx];
  const unlocked = totalMinutes >= required;
  return {
    name,
    unlocked,
    index: idx,
    image: name.toLowerCase().replace(/ /g, '').replace(/[^a-z]/g, '') + '.png',
    unlockText: `${Math.min(totalMinutes, required)} / ${required} mins`,
  };
});

// Handle toast for newly unlocked flowers (compared to what's stored locally)
useEffect(() => {
  const prev = JSON.parse(localStorage.getItem(`unlocked_flowers_${userId}`) || '[]');
  const newlyUnlocked = flowers
    .filter((f, idx) => f.unlocked && !prev.includes(idx))
    .map((f, idx) => ({ ...f, index: idx }));

  if (newlyUnlocked.length > 0) {
    setPlantBadge(userId); // show badge on nav icon
    setNewUnlock(
      newlyUnlocked.length === 1
        ? newlyUnlocked[0]
        : { multiple: true, names: newlyUnlocked.map((f) => f.name) }
    );
  }
}, [totalMinutes]);
