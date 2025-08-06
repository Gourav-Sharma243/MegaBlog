const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tiny_mce_rte_id: String(import.meta.env.VITE_TINYMCE_RTE_ID),
    // Production URL for email verification links
    productionUrl: String(import.meta.env.VITE_PRODUCTION_URL || 'https://megablog.gouravsharma.dev')
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf