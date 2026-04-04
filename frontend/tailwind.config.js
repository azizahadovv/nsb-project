module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: {
      primary: { 50:'#E8F2FF',100:'#D1E5FF',500:'#0066CC',600:'#004D99',700:'#003D7A' },
      accent: { 50:'#FFF3EB',500:'#FF6600',600:'#CC5200' },
      solar: { 50:'#FFF9EB',500:'#F7B32B',600:'#D99A1A' },
      dark: '#1A1D23'
    },
    fontFamily: { display: ['"Plus Jakarta Sans"','sans-serif'], body: ['Manrope','sans-serif'] }
  }},
  plugins: []
};
