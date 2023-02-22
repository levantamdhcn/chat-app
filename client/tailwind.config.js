module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'grey-700': '#e1e9f1',
        'muted': '#9aa1b9',
        'main': '#7269ef'
      },
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
    },
    backgroundColor: {
      'body-dark': '#303841',
      'card-dark': '#262e35',
    }
  },
  plugins: [],
}
