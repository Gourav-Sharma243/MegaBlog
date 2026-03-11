import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index';

import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        try {
            if (!userData || !userData.$id) {
                alert("User data not loaded yet. Please wait or re-login.");
                return;
            }

            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image[0]) {
                    alert("Please select a cover image.");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    appwriteService.storeUserMapping(userData.$id, userData.name);

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                        authorName: userData.name,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    alert("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            console.error("PostForm :: submit :: error", error);
            alert(error.message || "An unexpected error occurred. Please try again.");
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (!userData) {
        return <div className="text-center py-8 text-gray-600">Loading user data...</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto px-4 pb-20">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow space-y-6">
                    <Input
                        label="Post Title"
                        placeholder="Give your story a title..."
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="URL Slug"
                        placeholder="story-link-slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-light/70 dark:text-text-dark/70 ml-1">Content</label>
                        <RTE
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                    </div>
                </div>
                
                <div className="w-full lg:w-80 space-y-6">
                    <div className="p-6 rounded-[32px] bg-white/50 dark:bg-surface-dark/30 border border-gray-100 dark:border-white/5 space-y-6">
                        <Input
                            label="Cover Image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        
                        {post && (
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/5">
                                <img
                                    src={appwriteService.getFileView(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        
                        <Select
                            options={["active", "inactive"]}
                            label="Visibility"
                            {...register("status", { required: true })}
                        />
                        
                        <Button type="submit" className="w-full py-4 text-base">
                            {post ? "Publish Changes" : "Create Post"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
