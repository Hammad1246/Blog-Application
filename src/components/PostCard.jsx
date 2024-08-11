import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import AppwriteConfig from "../appwrite/config";

function PostCard({ $id, featuredImage, title }) {
  const previewSrc = useMemo(() => {
    return AppwriteConfig.getFilePreview(featuredImage);
  }, [featuredImage]);

  return (
    <div className="w-[300px] rounded-md border flex flex-col mx-2 my-8 overflow-hidden shadow-lg shadow-zinc-500 ">
      <img
        src={previewSrc}
        alt={title}
        className="h-[200px] bg-black w-full  object-fill"
        onError={(e) => (e.target.style.display = 'none')}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link
          to={`/post/${$id}`}
          className="mt-4 inline-block w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-center"
        >
          Read
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
