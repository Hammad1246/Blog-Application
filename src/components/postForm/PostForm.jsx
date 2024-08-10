import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import AppwriteConfig from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "public",
      },
    });

  const slugTransform = useCallback((value) => {
    return value
      ? value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s+/g, "-")
      : "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  const handleFileUpload = async (imageFile) => {
    if (!imageFile) return null;
    return await AppwriteConfig.uploadFile(imageFile);
  };

  const handleFormSubmit = async (data) => {
    try {
      setError(null);
      const file = data.image?.[0]
        ? await handleFileUpload(data.image[0])
        : null;
      const postData = {
        ...data,
        userId: post ? post.userId : userData.$id,
        featuredImage: file ? file.$id : post?.featuredImage,
      };

      if (post) {
        if (file) await AppwriteConfig.deleteFile(post.featuredImage);
        const updatedPost = await AppwriteConfig.updatePost(post.$id, postData);
        navigate(`/post/${updatedPost.$id}`);
      } else {
        const newPost = await AppwriteConfig.createPost(postData);
        navigate(`/post/${newPost.$id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-wrap px-20 pt-24 w-full h-full mb-20"
    >
      <div className="w-2/3 px-2">
        {error && (
          <div role="alert" className="alert alert-error flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={AppwriteConfig.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["public", "private"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className="w-full"
          text={post ? "Update" : "Submit"}
        />
      </div>
    </form>
  );
}

export default PostForm;
