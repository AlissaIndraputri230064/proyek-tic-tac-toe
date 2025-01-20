/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/*.html'],
  theme: {
    extend: {
      colors : {
        'navy' : '#22668D',
        'light-orange' : '#FFCC70',
        'orange' : '#D79517',
        'red' : '#CB1919',
        'yellow' : '#FFFADD'
      },
      fontFamily : {
        'ShortShack' : ['"Short Stack"', 'cursive']
      },
      width : {
        'custom-961' : '961px',
        '525' :'525px',
      },
      height : {
        'custom-64' : '64px',
        '436' : '436px',
      }
    },
  },
  plugins: [],
};

