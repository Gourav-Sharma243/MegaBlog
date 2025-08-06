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
                const session = await this.login({email, password});
                
                if (session) {
                    try {
                        await this.sendEmailVerification();
                    } catch (verificationError) {
                        
                    }
                    
                    const { default: appwriteService } = await import('./config.js');
                    appwriteService.storeUserMapping(userAccount.$id, name);
                }
                
                return session;
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailSession(email, password);
            if (session) {
                // Get user info and store mapping for author display
                const user = await this.getCurrentUser();
                if (user) {
                    // Import the service to store user mapping
                    const { default: appwriteService } = await import('./config.js');
                    appwriteService.storeUserMapping(user.$id, user.name);
                }
            }
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user) {
                const { default: appwriteService } = await import('./config.js');
                appwriteService.storeUserMapping(user.$id, user.name);
            }
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserInfo() {
        try {
            const user = await this.account.get();
            return {
                $id: user.$id,
                name: user.name,
                email: user.email,
                emailVerification: user.emailVerification
            };
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async updatePassword({oldPassword, newPassword}) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            throw error;
        }
    }

    getBaseUrl() {
        if (import.meta.env.PROD) {
            return conf.productionUrl;
        } else {
            return window.location.origin;
        }
    }

    async sendPasswordRecovery(email) {
        try {
            return await this.account.createRecovery(
                email, 
                `${this.getBaseUrl()}/reset-password`
            );
        } catch (error) {
            throw error;
        }
    }

    async completePasswordRecovery({userId, secret, password}) {
        try {
            return await this.account.updateRecovery(userId, secret, password, password);
        } catch (error) {
            throw error;
        }
    }

    async sendEmailVerification() {
        try {
            return await this.account.createVerification(
                `${this.getBaseUrl()}/verify-email`
            );
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail({userId, secret}) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            throw error;
        }
    }

    async getSessions() {
        try {
            return await this.account.listSessions();
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(sessionId) {
        try {
            return await this.account.deleteSession(sessionId);
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;