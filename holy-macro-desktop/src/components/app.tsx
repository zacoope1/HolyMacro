import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

export const App = () => {
    ReactDOM.render(<AppFrame />, document.body);
};

const StyledAppFrame = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 100%;
    min-height: 100%;
`;

const StyledNavbar = styled.div`
    display: flex;
    flex-grow: 3;
    background: orange;
`;

const StyledAppContent = styled.div`
    display: flex;
    flex-grow: 7;
    background: lightblue;
`;

const MenuButtonToggle = styled.div`
    position: fixed;
`;

const AppFrame = (): JSX.Element => {

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    return (
        <StyledAppFrame>
            <HashRouter>
                {!menuOpen && <MenuButtonToggle><MenuIcon onClick={() => setMenuOpen(true)} /></MenuButtonToggle>}
                <StyledNavbar>
                    {
                        menuOpen &&
                        <>
                            <CloseIcon onClick={() => setMenuOpen(false)} />
                            <Link to="/">Home</Link>
                            <Link to="/settings">Settings</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    }
                </StyledNavbar>
                <StyledAppContent>
                    <Router />
                </StyledAppContent>
            </HashRouter>
        </StyledAppFrame>
    );
};

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<><h1>hi1</h1></>} />
            <Route path="/settings" element={<><h1>hi2</h1></>} />
            <Route path="/profile" element={<><h1>hi3</h1></>} />
        </Routes>
    );
};