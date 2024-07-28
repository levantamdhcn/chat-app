module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#7269ef',
        darkColor: '#313a43',
        borderColor: '#36404a',
        rockBlue: '#a6b0cf',
        lightPurple: 'rgb(166, 176, 207)',
        bsDark: '#eff2f7',
      },
      shadows: {
        popup: '0 2px 4px rgba(15,34,58,.12)',
      }
    },
    container: {
      maxWidth: {
        'xl': "1140px",
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '21': '21px',
    }
  },
  plugins: [],
}
