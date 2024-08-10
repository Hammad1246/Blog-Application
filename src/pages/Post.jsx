import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppwriteConfig from '../appwrite/config';
import { Button } from '../components/index';
import parse from 'html-react-parser';

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData && post.userId === userData.$id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AppwriteConfig.getPost(slug);
        if (response) {
          setPost(response);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      if (post) {
        await AppwriteConfig.deletePost(post.$id);
        await AppwriteConfig.deleteFile(post.featuredImage);
        navigate('/your-posts');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 mb-20">
      <div className="flex justify-between items-center w-full max-w-5xl px-8 py-4 bg-white shadow-md rounded-lg mt-10">
        <div className="flex items-center">
          <img
            className="h-16 w-16 rounded-full border-2 border-gray-300"
            src={AppwriteConfig.getFilePreview(post.featuredImage)}
            alt="Profile"
          />
          <p className="ml-4 text-lg font-semibold text-gray-800">Hammad Saleem</p>
        </div>
        {isAuthor && (
          <div className="flex space-x-4">
            <Button
              text="Edit"
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
            <Button
              text="Delete"
              onClick={deletePost}
              className="bg-red-600 text-white hover:bg-red-700"
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl px-8 py-6 bg-white shadow-md rounded-lg mt-8">
        <div className="relative">
          <img
            className="w-full h-[500px] object-contain rounded-lg"
            src={AppwriteConfig.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="prose lg:prose-xl text-gray-700">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
