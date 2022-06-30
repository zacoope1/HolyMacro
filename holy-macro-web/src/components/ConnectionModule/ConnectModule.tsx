import { useState } from "react";

export const ConnectModule = (props: { setIp: (input: any) => any, connect: () => any; }) => {
    const [isValidIp, setIsValidIp] = useState<boolean>(false);

    return (
        <>
            <label>Enter Your Computer's IP Address</label>
            <input placeholder="xxx.xxx.xxx.xxx" onKeyDown={(e) => { isValidIp && e.key === 'Enter' && props.connect(); }} onChange={(e) => { setIsValidIp(props.setIp(e.target.value)); }} />
            <button disabled={!isValidIp} onClick={() => { props.connect(); }}>Connect</button>
        </>
    );
};