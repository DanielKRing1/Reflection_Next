import ClickContainer from "../../../generic/Button/Base/ClickContainer";
import FlexCol from "../../../generic/Flex/FlexCol";

import CredentialForm, { CredentialFormProps } from "../generic/CredentialForm";
import { LoginPhase } from "../types";

export type SignupFormProps = {
    setLoginPhase: (loginPhase: LoginPhase) => void;
} & Omit<CredentialFormProps, "submitButtonText">;

export default (props: SignupFormProps) => {
    const { setLoginPhase } = props;

    const handleToggleLoginPhase = () => {
        setLoginPhase(LoginPhase.Login);
    };

    return (
        <FlexCol>
            <h1>Create Account</h1>
            <CredentialForm {...props} submitButtonText="Signup" />
            <ClickContainer onClick={handleToggleLoginPhase}>
                <h6>Log In</h6>
            </ClickContainer>{" "}
        </FlexCol>
    );
};
