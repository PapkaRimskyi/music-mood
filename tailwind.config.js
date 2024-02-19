/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors.js';

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'loop-image': "url('Public/images/loop.svg')",
        'shuffle-image': "url('Public/images/shuffle.svg')",
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
    },
  },
  plugins: [],
}

