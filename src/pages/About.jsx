import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="ml-10 mr-10">
      <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
        <div className="space-y-6">
          <p className="text-sm font-semibold md:text-base">
            Discover Our Journey &rarr;
          </p>
          <p className="text-3xl font-bold md:text-4xl">Welcome to Our Blog</p>
          <p className="text-base text-gray-600 md:text-lg pb-7">
            At our blog, we are committed to bringing you insightful articles,
            stories, and resources that inspire and inform. Our team of
            passionate writers and creators work tirelessly to deliver content
            that resonates with our readers.
          </p>

          <Link
            to={"/"}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Explore Now
          </Link>
        </div>
        <div className="md:mt-o mt-10 w-full">
          <img
            src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="Blog Inspiration"
            className="rounded-lg"
          />
        </div>
      </div>

      <hr className="mt-6" />
    </div>
  );
}

export default About;
