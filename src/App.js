import logo from './logo.svg';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme';


import Router from './routes';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { StyledChart } from './components/chart';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
