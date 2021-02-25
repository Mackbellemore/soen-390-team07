import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Inventory from '../components/views/Inventory.jsx';
import { sidebarStyles } from '../components/Sidebar.jsx';
import Login from '../components/views/Login.jsx';
import AdminPage from '../components/views/AdminPage.jsx';
import MainDashboard from '../components/views/MainDashboard.jsx';
import LandingPage from '../components/views/LandingPage';
import NoAccess from '../components/views/NoAccess.jsx';
import { RootStoreContext } from '../stores/stores.jsx';
import { rolesAvailable } from '../constants.js';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';

const MenuItems = () => (
  <Flex direction="column">
    <ChakraLink as={Link} to="/main">
      Dashboard
    </ChakraLink>
    <ChakraLink as={Link} to="/admin">
      Admin
    </ChakraLink>
    <ChakraLink as={Link} to="/inventory">
      Inventory
    </ChakraLink>
  </Flex>
);

const Index = () => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <>
      <BrowserRouter>
        <Menu
          styles={sidebarStyles}
          pageWrapId={'page-wrap'}
          customBurgerIcon={false}
          customCrossIcon={false}
          isOpen={uiStore.sidebarState}
          onClose={uiStore.toggleSidebarState}
        >
          <MenuItems />
        </Menu>
        <main id="page-wrap">
          <NavBar />
          <Switch>
            <ProtectedRoute path="/admin" allowedRoles={['Admin']}>
              <AdminPage />
            </ProtectedRoute>
            <ProtectedRoute path="/main" allowedRoles={rolesAvailable}>
              <MainDashboard />
            </ProtectedRoute>
            <ProtectedRoute path="/inventory" allowedRoles={rolesAvailable}>
              <Inventory />
            </ProtectedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/no-access">
              <NoAccess />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
};

export default observer(Index);
