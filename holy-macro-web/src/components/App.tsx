import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { ConnectionModule } from './ConnectionModule/ConnectionModule';

export const App = () => {
  return (
    <StyledApp>
      <BrowserRouter>
        <AdminPanel>
          <Link to="/">Home</Link>
          <Link to="/game-view">Game View</Link>
          <Link to="/editor">Editor</Link>
        </AdminPanel>
        <Routes>
          <Route path="/game-view" element={<ConnectionModule />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  margin: 10px;
`;

const AdminPanel = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;