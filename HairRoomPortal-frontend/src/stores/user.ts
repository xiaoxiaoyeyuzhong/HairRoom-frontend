import { defineStore } from 'pinia';
import {getCurrentUser} from "../services/user.ts";

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null as API.CurrentUser | null,
    }),
    actions: {
        async fetchCurrentUser() {
            this.currentUser = await getCurrentUser();
        },
    },
});