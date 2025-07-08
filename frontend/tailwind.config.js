module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#10B981', // vert
            dark: '#059669'
          },
          background: {
            light: '#FFFFFF',
            dark: '#1F2937'
          },
          text: {
            light: '#374151',
            dark: '#F3F4F6'
          }
        }
      },
    },
    plugins: {
      tailwindcss: [],
  },
  }