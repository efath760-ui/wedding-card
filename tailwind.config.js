/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF8F1',
        card: '#FBF8F1',
        gold: '#B97D3E',
        goldText: '#B97D3E',
        olive: '#8D8F58',
        line: 'rgba(185, 125, 62, 0.25)',
      },
      fontFamily: {
        viaoda: ["'Viaoda Libre'", "'EB Garamond'", 'cursive'],
        alex: ["'Alex Brush'", "'The Nautigal'", 'cursive'],
        baskerville: ["'Libre Baskerville'", 'Baskerville', "'Times New Roman'", 'serif'],
        cormorant: ["'Cormorant Garamond'", "'Times New Roman'", 'serif'],
        ebGaramond: ["'EB Garamond'", 'serif'],
        times: ["'Times New Roman'", 'Times', 'serif'],
        lora: ["'Lora'", "'Times New Roman'", 'serif'],
        jost: ["'Jost'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
