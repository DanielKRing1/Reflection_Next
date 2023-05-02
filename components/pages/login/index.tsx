import { useState } from "react";
import { LoginPhase } from "./types";
import SignupForm from "./SignUp/SignupForm";
import LoginForm from "./Login/LoginForm";
import { createUser, login } from "../../../session/access";

type Props = {};

export default (props: Props) => {
    const [loginPhase, setLoginPhase] = useState(LoginPhase.Login);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        let success;

        switch (loginPhase) {
            case LoginPhase.Login: {
                success = await login(username, password);
            }
            default:
            case LoginPhase.Signup: {
                success = await createUser(username, password);
            }
        }

        console.log(success);
    };

    return (
        <>
            {loginPhase === LoginPhase.Login ? (
                <LoginForm
                    username={username}
                    onChangeUsername={setUsername}
                    password={password}
                    onChangePassword={setPassword}
                    onSubmit={handleSubmit}
                    setLoginPhase={setLoginPhase}
                />
            ) : (
                <SignupForm
                    username={username}
                    onChangeUsername={setUsername}
                    password={password}
                    onChangePassword={setPassword}
                    onSubmit={handleSubmit}
                    setLoginPhase={setLoginPhase}
                />
            )}
        </>
    );
};
