export default function Page() {
  return (
    <div className="stage">
      {/* SVG filter used by the .refract layer for the glass distortion effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquidWarp" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.025"
            numOctaves={2}
            seed={9}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="cards">
        {/* ---------- Card 1: Total Reviews ---------- */}
        <section className="card">
          <div className="volume"></div>
          <div className="refract"></div>
          <div className="cornerBloom"></div>
          <div className="bodyShade"></div>
          <div className="specular"></div>
          <div className="edgeLight"></div>
          <div className="rim"></div>
          <div className="content">
            <div className="icon purple">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.2 5.25h13.6c1.02 0 1.85.83 1.85 1.85v6.36c0 1.02-.83 1.85-1.85 1.85h-5.98l-2.72 2.27v-2.27H5.2a1.85 1.85 0 0 1-1.85-1.85V7.1c0-1.02.83-1.85 1.85-1.85Z"
                  stroke="#fff"
                  strokeWidth={1.65}
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="10.48" r=".9" fill="#fff" />
                <circle cx="12" cy="10.48" r=".9" fill="#fff" />
                <circle cx="15" cy="10.48" r=".9" fill="#fff" />
              </svg>
            </div>
            <p className="title">Total Reviews</p>
            <p className="value">1,248</p>
            <p className="change green">
              <span className="arrow accent">↑</span>
              <strong className="accent">12%</strong> vs last 7 days
            </p>
            <svg className="chart purple-chart" viewBox="0 0 94 42" aria-hidden="true">
              <defs>
                <linearGradient id="pf2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#bd5cff" stopOpacity=".48" />
                  <stop offset=".48" stopColor="#9130dd" stopOpacity=".25" />
                  <stop offset="1" stopColor="#6515a9" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ps2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset=".22" stopColor="#eab1ff" stopOpacity=".52" />
                  <stop offset=".52" stopColor="#a83eff" stopOpacity=".12" />
                  <stop offset=".82" stopColor="#d98fff" stopOpacity=".58" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="pb2" x="-30%" y="-70%" width="160%" height="240%">
                  <feGaussianBlur stdDeviation={2.4} />
                </filter>
                <filter id="pshadow2" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation={2} />
                </filter>
              </defs>
              <ellipse cx="47" cy="33.5" rx="20" ry="2.1" fill="#5c1595" opacity=".18" filter="url(#pshadow2)" />
              <path
                fill="url(#pf2)"
                d="M0 29 C7 27, 12 20, 20 20 C27 20, 31 25, 36 28 C39 30, 42 31, 45 29 C49 27, 53 23, 57 21 C62 19, 65 13, 69 11 C74 8, 80 8, 84 10 C90 12, 92 17, 94 22 L94 37 L0 37 Z"
              />
              <path
                d="M31 27 C35 28,39 31,44 30 C48 29,52 25,56 23"
                fill="none"
                stroke="#c46aff"
                strokeWidth={5}
                opacity=".18"
                filter="url(#pb2)"
                strokeLinecap="round"
              />
              <path
                d="M1 28.7 C8 27,13 20.5,20 20.5 C27 20.5,31 25.5,36 28 C40 30.5,43 31,46 28.8 C50 26.4,53 23.5,57 21.5 C62 19,65 13.5,69 11.5 C74 8.7,80 8.5,84 10.5 C90 12.5,92 17,94 22"
                fill="none"
                stroke="url(#ps2)"
                strokeWidth={4.5}
                opacity=".64"
                filter="url(#pb2)"
                strokeLinecap="round"
              />
              <path
                className="glow"
                d="M0 29 C7 27 12 20 20 20 C27 20 31 25 36 28 C40 30.5 43 31 46 29 C50 26 53 23 57 21 C62 19 65 13 69 11 C74 8 80 8 84 10 C90 12 92 17 94 22"
              />
              <path
                className="line"
                d="M0 29 C7 27 12 20 20 20 C27 20 31 25 36 28 C40 30.5 43 31 46 29 C50 26 53 23 57 21 C62 19 65 13 69 11 C74 8 80 8 84 10 C90 12 92 17 94 22"
              />
            </svg>
          </div>
        </section>

        {/* ---------- Card 2: Average Rating ---------- */}
        <section className="card">
          <div className="volume"></div>
          <div className="refract"></div>
          <div className="cornerBloom"></div>
          <div className="bodyShade"></div>
          <div className="specular"></div>
          <div className="edgeLight"></div>
          <div className="rim"></div>
          <div className="content">
            <div className="icon gold">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="m12 3.8 2.1 4.37 4.83.7-3.49 3.39.82 4.8L12 14.8l-4.26 2.26.82-4.8-3.49-3.39 4.83-.7L12 3.8Z"
                  stroke="#fff"
                  strokeWidth={1.45}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="title">Average Rating</p>
            <p className="value">4.3</p>
            <p className="change amber">
              <span className="arrow accent">→</span>
              <strong className="accent">0.3</strong> vs last 7 days
            </p>
            <svg className="chart gold-chart" viewBox="0 0 94 42" aria-hidden="true">
              <defs>
                <linearGradient id="gf2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd15a" stopOpacity=".50" />
                  <stop offset=".48" stopColor="#dfa018" stopOpacity=".27" />
                  <stop offset="1" stopColor="#8e5b08" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gs2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset=".22" stopColor="#ffe799" stopOpacity=".56" />
                  <stop offset=".52" stopColor="#e0a51e" stopOpacity=".12" />
                  <stop offset=".82" stopColor="#ffd46c" stopOpacity=".60" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <filter id="gb2" x="-30%" y="-70%" width="160%" height="240%">
                  <feGaussianBlur stdDeviation={2.4} />
                </filter>
                <filter id="gshadow2" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation={2} />
                </filter>
              </defs>
              <ellipse cx="45" cy="33.5" rx="19" ry="2.1" fill="#8e5a09" opacity=".17" filter="url(#gshadow2)" />
              <path
                fill="url(#gf2)"
                d="M0 29 C7 29,12 22,19 21 C26 20,31 26,36 28 C39 30,42 31,45 29 C49 27,53 24,57 22 C62 20,65 18,68 14 C72 9,77 7,82 9 C88 10,92 15,94 20 L94 37 L0 37 Z"
              />
              <path
                d="M31 27 C35 28.5,39 31,44 30 C48 28.5,52 25.5,56 23"
                fill="none"
                stroke="#ffd96c"
                strokeWidth={5}
                opacity=".18"
                filter="url(#gb2)"
                strokeLinecap="round"
              />
              <path
                d="M1 28.8 C8 29,12 22,19 21.5 C26 20.5,31 26,36 28 C40 30.3,42 31,45 29 C49 27,53 24,57 22 C62 20,65 18,68 14 C72 9,77 7,82 9 C88 10,92 15,94 20"
                fill="none"
                stroke="url(#gs2)"
                strokeWidth={4.5}
                opacity=".66"
                filter="url(#gb2)"
                strokeLinecap="round"
              />
              <path
                className="glow"
                d="M0 29 C7 29 12 22 19 21 C26 20 31 26 36 28 C40 30 42 31 45 29 C49 27 53 24 57 22 C62 20 65 18 68 14 C72 9 77 7 82 9 C88 10 92 15 94 20"
              />
              <path
                className="line"
                d="M0 29 C7 29 12 22 19 21 C26 20 31 26 36 28 C40 30 42 31 45 29 C49 27 53 24 57 22 C62 20 65 18 68 14 C72 9 77 7 82 9 C88 10 92 15 94 20"
              />
            </svg>
          </div>
        </section>
      </div>
      <div className="bottom-line"></div>
    </div>
  );
}
