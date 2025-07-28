import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setError(""); // reset error before new attempt

    try {
      if (post) {
        const file = data.image && data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost && dbPost.$id) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          setError("Failed to update post. Please try again.");
        }
      } else {
        // Defensive: ensure data.image exists and is an array
        if (!data.image || !data.image[0]) {
          setError("Please upload a featured image.");
          return;
        }
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file && file.$id) {
          data.featuredImage = file.$id;
          const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
          if (dbPost && dbPost.$id) {
            navigate(`/post/${dbPost.$id}`);
          } else {
            setError("Post creation failed. Please try again.");
          }
        } else {
          setError("Image upload failed. Please try again.");
        }
      }
    } catch (err) {
      setError(
        err?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
      <div className="w-full lg:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-6"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-6"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full lg:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-6"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-6">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg shadow-md max-h-48 w-full object-cover"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-6"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full py-3"
        >
          {post ? "Update" : "Submit"}
        </Button>
        {error && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
