const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 gradient-bg animated-gradient" />

      {/* Spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-screen opacity-20 animate-spotlight">
        <div className="w-full h-full bg-gradient-radial from-yellow-400/30 via-yellow-400/10 to-transparent blur-3xl" />
      </div>
      <div className="absolute top-0 right-1/3 w-80 h-screen opacity-15 animate-spotlight-2">
        <div className="w-full h-full bg-gradient-radial from-green-400/30 via-green-400/10 to-transparent blur-3xl" />
      </div>

      {/* Camera flashes - lots of them for paparazzi effect */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl animate-camera-flash" />
      <div
        className="absolute top-20 left-20 w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-32 right-1/4 w-28 h-28 bg-white rounded-full blur-2xl animate-camera-flash"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/3 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-xl animate-flash"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-32 right-1/3 w-26 h-26 bg-white rounded-full blur-2xl animate-camera-flash"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-30 h-30 bg-yellow-100 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-20 w-24 h-24 bg-white rounded-full blur-xl animate-camera-flash"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-yellow-200 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-24 left-1/2 w-22 h-22 bg-white rounded-full blur-xl animate-camera-flash"
        style={{ animationDelay: "0.3s" }}
      />
      <div
        className="absolute bottom-40 right-32 w-26 h-26 bg-yellow-300 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-2/3 left-16 w-24 h-24 bg-white rounded-full blur-xl animate-camera-flash"
        style={{ animationDelay: "1.8s" }}
      />
      <div
        className="absolute bottom-16 right-1/2 w-28 h-28 bg-yellow-100 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "2.3s" }}
      />
      <div
        className="absolute top-16 right-1/4 w-20 h-20 bg-white rounded-full blur-xl animate-camera-flash"
        style={{ animationDelay: "2.8s" }}
      />
      <div
        className="absolute bottom-24 left-1/2 w-26 h-26 bg-yellow-200 rounded-full blur-2xl animate-flash"
        style={{ animationDelay: "0.6s" }}
      />
      <div
        className="absolute top-1/4 right-16 w-24 h-24 bg-white rounded-full blur-xl animate-camera-flash"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute bottom-1/2 left-24 w-22 h-22 bg-yellow-300 rounded-full blur-xl animate-flash"
        style={{ animationDelay: "2.7s" }}
      />

      {/* Radial spotlight overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
    </div>
  );
};

export default BackgroundEffect;
