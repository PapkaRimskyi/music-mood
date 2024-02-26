/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors.js';

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'previous-image': "url('@public/images/previous.svg')",
        'play-image': "url('@public/images/play.svg')",
        'pause-image': "url('@public/images/pause.svg')",
        'next-image': "url('@public/images/next.svg')",
        'loop-image': "url('@public/images/loop.svg')",
        'shuffle-image': "url('@public/images/shuffle.svg')",
      }
    },
    colors: {
      ...colors,
      neonBlack: "#000000",
      neonWhite: "#fbf8fd",
      neonPurple: "#ab20fd",
      neonDarkerPurple: "#7d12ff",
      neonPink: "#E26EE5",
      neonDarkPurple: "rgba(32, 5, 137, .5)",
      neonDarkBlue: "#27005D",
    },
  },
  plugins: [],
}

