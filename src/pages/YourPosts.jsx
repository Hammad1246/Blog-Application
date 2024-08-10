import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { LandingPage } from "../pages/index";
import AppwriteConfig from "../appwrite/config";
import { PostCard, Button } from "../components/index";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

function YourPosts() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.$id) {
      AppwriteConfig.getPosts([Query.equal("userId", userData.$id)])
        .then((post) => {
          setPosts(post.documents);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [userData.$id]);

  const renderPosts = useMemo(() => {
    if (posts.length === 0) {
      return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl">Create Post First.</h1>
          <Button
            className="mt-4"
            onClick={() => navigate("/add-post")}
            text="Create"
          />
        </div>
      );
    }

    return posts.map((post) => (
      <div key={post.$id}>
        <PostCard {...post} />
      </div>
    ));
  }, [posts, navigate]);

  if (!authStatus) {
    return <LandingPage />;
  }

  return (
    <div className="w-full h-full mt-16">
      <div className="flex flex-wrap justify-start items-center">
        {renderPosts}
      </div>
    </div>
  );
}

export default YourPosts;
