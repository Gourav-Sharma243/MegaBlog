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

    storeUserMapping(userId, userName) {
        try {
            const existingMappings = JSON.parse(localStorage.getItem('userMappings') || '{}');
            existingMappings[userId] = userName;
            localStorage.setItem('userMappings', JSON.stringify(existingMappings));
        } catch (error) {
            
        }
    }

    getUserName(userId) {
        try {
            const mappings = JSON.parse(localStorage.getItem('userMappings') || '{}');
            
            const knownUsers = {
                '6892e34c9a6c093320ef': 'Radhika Gaikwad',
                '68917766761498febb37': 'Vansh Rana',
                '6891770814e233b4b087': 'Taranveer Singh',
                '688aceb55b81f0db941a': 'Sarthak Bishnoi',
                '6887e3b5b93dabf9211f': 'Gourav2',
                '688406c453e66eb38e36': 'Gourav Sharma',
            };
            
            if (mappings[userId]) {
                return mappings[userId];
            }
            
            if (knownUsers[userId]) {
                return knownUsers[userId];
            }
            
            const shortId = userId.slice(-8);
            return `User ${shortId}`;
            
        } catch (error) {
            return 'Anonymous';
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId, authorName}) {
        try {
            if (authorName) {
                this.storeUserMapping(userId, authorName);
            }
            
            const uniqueId = ID.unique();
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                uniqueId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
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
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            return false
        }
    }

    async getPostsWithAuthors(queries = [Query.equal("status", "active")]){
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            
            return posts;
        } catch (error) {
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
            return response;
        } catch (error) {
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
            return false
        }
    }

    getFileView(fileId) {
        const url = this.bucket.getFileView(conf.appwriteBucketId, fileId);
        return url;
    }
}

const service = new Service()
export default service