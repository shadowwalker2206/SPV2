const BirthdayHero = () => {
  return (
    <header className="relative py-20 text-center">
      {/* Sparkle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="sparkle" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
        <div className="sparkle" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
        <div className="sparkle" style={{ top: '30%', left: '70%', animationDelay: '2s' }}></div>
        <div className="sparkle" style={{ top: '80%', left: '20%', animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 floating-element text-transparent bg-clip-text" 
            style={{ backgroundImage: 'var(--gradient-celebration)' }}>
          HAPPY BIRTHDAY BUDDY
        </h1>

        <div className="celebration-card p-8 max-w-3xl mx-auto mb-8">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
            <span className="text-2xl">To Doraemon💖</span><br/>
            Thanks for all the nonstop bakchodi, and listening to my shyt talks whenever i call u<br/>
            Cheers to another year of irritating me for free 🥂😜✨<br/>
            Cheers to more laughter, stupid night talks, and unforgettable memories. 🥂<br/>
            Everything is pretty good except one thing, why do u ghost me always<br/>
            ek baat aur meri reels dekhne pe tax laga hai kya jo tumse meri reels dekhi nhi jaa rhi hai<br/>
            <br/>
            <span className="text-xl font-semibold text-celebration-primary">
              Anyways stay HAPPY stay short ....bacchi of sinister six💕
            </span>
          </p>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          Click on memories to explore our beautiful moments together ✨
        </p>
      </div>
    </header>
  );
};

export default BirthdayHero;