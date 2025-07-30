import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Automatically log in after account creation
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailSession(email, password);
            return session;
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
            throw error;
        }
    }

    // Enhanced security methods
    async updatePassword({oldPassword, newPassword}) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error("Appwrite service :: updatePassword :: error", error);
            throw error;
        }
    }

    async sendPasswordRecovery(email) {
        try {
            return await this.account.createRecovery(
                email, 
                `${window.location.origin}/reset-password`
            );
        } catch (error) {
            console.error("Appwrite service :: sendPasswordRecovery :: error", error);
            throw error;
        }
    }

    async completePasswordRecovery({userId, secret, password}) {
        try {
            return await this.account.updateRecovery(userId, secret, password, password);
        } catch (error) {
            console.error("Appwrite service :: completePasswordRecovery :: error", error);
            throw error;
        }
    }

    async sendEmailVerification() {
        try {
            return await this.account.createVerification(
                `${window.location.origin}/verify-email`
            );
        } catch (error) {
            console.error("Appwrite service :: sendEmailVerification :: error", error);
            throw error;
        }
    }

    async verifyEmail({userId, secret}) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.error("Appwrite service :: verifyEmail :: error", error);
            throw error;
        }
    }

    async getSessions() {
        try {
            return await this.account.listSessions();
        } catch (error) {
            console.error("Appwrite service :: getSessions :: error", error);
            throw error;
        }
    }

    async deleteSession(sessionId) {
        try {
            return await this.account.deleteSession(sessionId);
        } catch (error) {
            console.error("Appwrite service :: deleteSession :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;