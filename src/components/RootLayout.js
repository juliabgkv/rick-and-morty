import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';

function RootLayout() {
  return (
    <>
        <MainNavigation />
        <Outlet />
    </>
  );
}

export default RootLayout;