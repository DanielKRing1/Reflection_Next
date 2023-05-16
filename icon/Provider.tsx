import { IconContext } from "react-icons/lib";
import { useTheme } from "styled-components";

type Props = {
    children: React.ReactNode;
};

export default ({ children }: Props) => {
    // THEME
    const theme = useTheme();

    return (
        <IconContext.Provider
            value={{ color: theme.colors.accent, size: "20px" }}
        >
            {children}
        </IconContext.Provider>
    );
};
