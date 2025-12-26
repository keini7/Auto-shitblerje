import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSpinner,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { heart, home, person, search } from 'ionicons/icons';
import HomePage from './pages/Home/HomePage';
import CarDetailsPage from './pages/Home/CarDetailsPage';
import SearchPage from './pages/Search/SearchPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import AccountHomePage from './pages/Account/AccountHomePage';
import LoginPage from './pages/Account/LoginPage';
import RegisterPage from './pages/Account/RegisterPage';
import MyCarsPage from './pages/Account/MyCarsPage';
import AddCarPage from './pages/Account/AddCarPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

console.log('[App] App.tsx loaded');

const LoadingFallback = () => {
  console.log('[App] Rendering LoadingFallback');
  return (
    <IonApp>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#000' }}>
        <IonSpinner />
        <div style={{ marginLeft: '16px', color: '#fff' }}>Duke ngarkuar...</div>
      </div>
    </IonApp>
  );
};

const Tabs = () => {
  const location = useLocation();
  console.log('[App] Tabs component rendering, location:', location.pathname);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <HomePage />
        </Route>
        <Route exact path="/tabs/search">
          <SearchPage />
        </Route>
        <Route exact path="/tabs/favorites">
          <FavoritesPage />
        </Route>
        <Route exact path="/tabs/account">
          <AccountHomePage />
        </Route>
        <Route exact path="/tabs/account/my-cars">
          <MyCarsPage />
        </Route>
        <Route exact path="/tabs/account/add">
          <AddCarPage />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home" selected={location.pathname.startsWith('/tabs/home')}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/tabs/search" selected={location.pathname.startsWith('/tabs/search')}>
          <IonIcon icon={search} />
          <IonLabel>Kërko</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="favorites"
          href="/tabs/favorites"
          selected={location.pathname.startsWith('/tabs/favorites')}
        >
          <IonIcon icon={heart} />
          <IonLabel>Favorites</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="account"
          href="/tabs/account"
          selected={location.pathname.startsWith('/tabs/account')}
        >
          <IonIcon icon={person} />
          <IonLabel>Llogaria</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const history = useHistory();
  console.log('[App] AppRoutes component rendering');
  console.log('[App] Current location:', location.pathname);
  const { loading } = useAuth();
  console.log('[App] Auth loading state:', loading);

  if (loading) {
    console.log('[App] Still loading, showing fallback');
    return <LoadingFallback />;
  }

  useEffect(() => {
    if (location.pathname === '/') {
      console.log('[App] Redirecting from / to /tabs/home');
      history.replace('/tabs/home');
    }
  }, [location.pathname, history]);

  console.log('[App] Loading complete, rendering routes');
  return (
    <Switch>
      <Route path="/tabs" render={() => {
        console.log('[App] Rendering Tabs route, location:', location.pathname);
        return <Tabs />;
      }} />
      <Route exact path="/car/:id">
        <CarDetailsPage />
      </Route>
      <Route exact path="/account/login">
        <LoginPage />
      </Route>
      <Route exact path="/account/register">
        <RegisterPage />
      </Route>
      <Route exact path="/">
        <Redirect to="/tabs/home" />
      </Route>
      <Route path="*">
        <Redirect to="/tabs/home" />
      </Route>
    </Switch>
  );
};

const App: React.FC = () => {
  console.log('[App] App component rendering');
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <FavoritesProvider>
            <AppRoutes />
          </FavoritesProvider>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
