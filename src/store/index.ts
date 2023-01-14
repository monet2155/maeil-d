import { atom } from "jotai";
import { User } from "src/@types/user";

/** User ID atom */
export const userAtom = atom<User | null>(null);
