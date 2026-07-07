export function ShipLoader() {
  return (
    <div className="relative h-24 w-48 overflow-hidden rounded-xl bg-indigo-50">
      <div className="absolute left-0 right-0 bottom-0 h-10 flex animate-wave-scroll">
        <WavePattern />
        <WavePattern />
      </div>

      <div className="absolute bottom-7 animate-ship-sail">
        <div className="animate-ship-bob">
          <ShipIcon className="h-9 w-14 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}

function WavePattern() {
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="h-10 w-48 flex-shrink-0 text-indigo-200"
    >
      <path
        d="M0 10 Q 12.5 2 25 10 T 50 10 T 75 10 T 100 10 V20 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShipIcon({ className = "h-9 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="8" r="1.6" fill="currentColor" opacity="0.5" className="animate-smoke" />
      <circle
        cx="15"
        cy="8"
        r="1.6"
        fill="currentColor"
        opacity="0.5"
        className="animate-smoke"
        style={{ animationDelay: "0.5s" }}
      />
      <rect x="12" y="10" width="5" height="9" rx="1" fill="currentColor" />

      <rect x="18" y="18" width="22" height="8" rx="1" fill="currentColor" opacity="0.85" />
      <circle cx="23" cy="22" r="1.3" fill="white" />
      <circle cx="29" cy="22" r="1.3" fill="white" />
      <circle cx="35" cy="22" r="1.3" fill="white" />

      <path d="M8 26 L56 26 L49 35 L15 35 Z" fill="currentColor" />
      <circle cx="32" cy="30" r="2.2" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  );
}
