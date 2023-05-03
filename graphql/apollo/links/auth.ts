import { setContext } from "@apollo/client/link/context";

import { keepSessionFresh } from "../local/state/isLoggedIn";

export default setContext(async (request, prevContext) => {
    await keepSessionFresh();
});
