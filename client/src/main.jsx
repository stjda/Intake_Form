import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material'
import { RouteContextProvider } from './util/context/routeContext.jsx';

// Create a custom theme with global styles
const muiTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `  
        * {
          -webkit-font-smoothing: antialiased;
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          height: 100%;
          
        }
        button:focus-visible {
          outline: 2px solid #4a90e2 !important;
          outline: -webkit-focus-ring-color auto 5px !important;
        }
        a {
          text-decoration: none;
        }
      `,
    },
  },
});

// Render the app with the theme
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MuiThemeProvider theme={muiTheme}>
      <RouteContextProvider>
        <CssBaseline /> {/* Normalize the CSS and add global styles */}
        <App />
      </RouteContextProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
);
