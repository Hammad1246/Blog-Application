import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { LandingPage } from "../pages/index";
import AppwriteConfig from "../appwrite/config";
import { PostCard } from "../components/index";

function Home() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    AppwriteConfig.getPosts([]).then((response) => {
      if (isMounted) {
        setPosts(response.documents || []);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const renderPosts = useMemo(() => {
    if (posts.length === 0) {
      return (
        <h1 className="font-bold text-4xl w-full h-screen flex justify-center items-center">
          Oops! No posts available.
        </h1>
      );
    }

    return posts.map((post) => (
      <div key={post.$id}>
        <PostCard {...post} />
      </div>
    ));
  }, [posts]);

  return (
    <>
      {!authStatus && <LandingPage />}
      {authStatus && (
        <div className="w-full h-full mt-16">
          <div className="flex flex-wrap justify-start items-center">
            {renderPosts}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
