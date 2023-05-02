import FlexCol from "../../../generic/Flex/FlexCol";

import CredentialForm, { CredentialFormProps } from "../generic/CredentialForm";
import { LoginPhase } from "../types";

export type LoginFormProps = {
    setLoginPhase: (loginPhase: LoginPhase) => void;
} & Omit<CredentialFormProps, "submitButtonText">;

export default (props: LoginFormProps) => {
    const { setLoginPhase } = props;

    const handleToggleLoginPhase = () => {
        setLoginPhase(LoginPhase.Signup);
    };

    return (
        <FlexCol>
            <h1>Login</h1>

            <CredentialForm {...props} submitButtonText="Login" />

            <h6 onClick={handleToggleLoginPhase}>Create Account</h6>
        </FlexCol>
    );
};
