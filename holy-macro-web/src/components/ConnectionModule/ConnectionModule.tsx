import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Environment } from "../../environments/environment";
import { isIP } from "is-ip";
import { Alert, CircularProgress } from "@mui/material";
import { GameView } from "../GameView/GameView";

export const ConnectionModule = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [ip, setIp] = useState<string>('');
    const [connectionErrorOccurred, setConnectionErrorOccurred] = useState<boolean>(false);

    const connect = () => {
        setConnectionErrorOccurred(false);
        if (isIP(ip)) {
            console.log(`Attempting to connect to ws://${ip}:${Environment.SOCKET_PORT}`);
            setIsConnected(true);
            setSocket(io(`ws://${ip}:${Environment.SOCKET_PORT}`));
        }
    };

    const updateIp = (ip: string) => {
        if (isIP(ip)) {
            setIp(ip);
            return true;
        }
        else {
            return false;
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('Connect', () => setIsLoaded(true));
            socket.on("connect_error", (err) => {
                setConnectionErrorOccurred(true);
                socket?.disconnect();
                setSocket(null);
                setIsConnected(false);
                setIsLoaded(false);
                setIp('');
            });
        }
    }, [socket]);

    return (
        <StyledMacroButtonView>
            {connectionErrorOccurred && <Alert severity="error">A Connection Error Has Occurred</Alert>}
            {isConnected ? isLoaded ? socket && <GameView socket={socket} /> : <CircularProgress /> : <ConnectModule setIp={updateIp} connect={connect} />}
        </StyledMacroButtonView>
    );
};

const ConnectModule = (props: { setIp: (input: any) => any, connect: () => any; }) => {
    const [isValidIp, setIsValidIp] = useState<boolean>(false);

    return (
        <>
            <label>Enter Your Computer's IP Address</label>
            <input placeholder="xxx.xxx.xxx.xxx" onKeyDown={(e) => { isValidIp && e.key === 'Enter' && props.connect(); }} onChange={(e) => { setIsValidIp(props.setIp(e.target.value)); }} />
            <button disabled={!isValidIp} onClick={() => { props.connect(); }}>Connect</button>
        </>
    );
};

const StyledMacroButtonView = styled.div`
    margin: auto;
    align-items: center;
    border: 1px solid red;
    padding: 1em;
`;
