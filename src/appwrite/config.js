import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Store user mapping in localStorage for author display
    storeUserMapping(userId, userName) {
        try {
            const existingMappings = JSON.parse(localStorage.getItem('userMappings') || '{}');
            existingMappings[userId] = userName;
            localStorage.setItem('userMappings', JSON.stringify(existingMappings));
        } catch (error) {
            console.log("Error storing user mapping:", error);
        }
    }

    // Get user name from mapping
    getUserName(userId) {
        try {
            const mappings = JSON.parse(localStorage.getItem('userMappings') || '{}');
            
            // Known users mapping for existing posts
            const knownUsers = {
                '6892e34c9a6c093320ef': 'Radhika Gaikwad',
                '68917766761498febb37': 'Vansh Rana',
                '6891770814e233b4b087': 'Taranveer Singh',
                '688aceb55b81f0db941a': 'Sarthak Bishnoi',
                '6887e3b5b93dabf9211f': 'Gourav2',
                '688406c453e66eb38e36': 'Gourav Sharma',
                // Add new users as they join
            };
            
            // Return cached name or known user name
            if (mappings[userId]) {
                return mappings[userId];
            }
            
            if (knownUsers[userId]) {
                return knownUsers[userId];
            }
            
            // For unknown users, show a generic name with part of their ID
            const shortId = userId.slice(-8);
            return `User ${shortId}`;
            
        } catch (error) {
            console.log("Error getting user mapping:", error);
            return 'Anonymous';
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId, authorName}) {
        try {
            // Store author name in localStorage for future reference
            if (authorName) {
                this.storeUserMapping(userId, authorName);
            }
            
            // Use unique ID to avoid slug conflicts
            const uniqueId = ID.unique();
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                uniqueId, // Use unique ID instead of user-generated slug
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error; // Re-throw to handle in the UI
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // Method to get posts with author information
    async getPostsWithAuthors(queries = [Query.equal("status", "active")]){
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            
            // Note: In a real-world scenario, you'd need server-side implementation
            // to fetch user details by userId. For now, we'll work with available data.
            return posts;
        } catch (error) {
            console.log("Appwrite service :: getPostsWithAuthors :: error", error);
            return false
        }
    }


    async uploadFile(file){
    try {
        const response = await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        console.log("Uploaded File ID:", response.$id);
        return response;
    } catch (error) {
        console.log("uploadFile error", error);
        return false;
    }
}


    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId) {
        const url = this.bucket.getFileView(conf.appwriteBucketId, fileId);
        console.log("Generated view URL:", url.toString());
        return url;
    }
}

const service = new Service()
export default service