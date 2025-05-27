import { defineStore } from 'pinia';
import {getCurrentUser} from "../services/user.ts";

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null as API.CurrentUser | null,
    }),
    actions: {
        async fetchCurrentUser() {
            if(this.currentUser == null){
                this.currentUser = await getCurrentUser();
            }
            else{
                return this.currentUser;
            }
        },
        async setCurrentUserState(currentUser: API.CurrentUser){
            this.currentUser = currentUser;
        },
    },
});