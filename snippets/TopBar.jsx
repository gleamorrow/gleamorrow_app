// Displays the user's current coin count in the top bar.
// On first load, counts up rapidly from 0 to target.
// On later updates (e.g. rewards), smoothly animates 1-by-1.

useEffect(() => {
  const userId = user?.id || localStorage.getItem("mock_user_id");
  if (!userId) return;

  fetch(apiUrl(`/api/user-coins?id=${userId}`))
    .then((res) => res.json())
    .then((data) => {
      if (typeof data.coins === 'number') {
        setCoins(data.coins);        // update coin context
        setAnimatedCoins(0);         // reset display to 0
        setJustLoaded(true);         // enable fast animation
      }
    });
}, [user?.id]);

useEffect(() => {
  if (animatedCoins >= coins) return;

  const animate = () => {
    setAnimatedCoins((prev) => {
      const step = justLoaded ? Math.ceil((coins - prev) / 20) : 1;
      const next = Math.min(prev + step, coins);
      if (next >= coins) setJustLoaded(false);
      return next;
    });

    setTimeout(animate, justLoaded ? 10 : 70);
  };

  animate();
}, [coins, animatedCoins, justLoaded]);
