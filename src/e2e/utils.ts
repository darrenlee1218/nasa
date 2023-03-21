import { E2E_HOST } from "constants/env";

export const makeTestUrl = (path: string) => `${E2E_HOST}${path}`;
