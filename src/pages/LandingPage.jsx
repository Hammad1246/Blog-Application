import React from 'react'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

function LandingPage() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated)
    return (
        <div className="bg-white px-6 pt-14 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24">       
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to our Blog Website
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the captivating world of our blog website, where you can
              share your thoughts, learn from others, and stay updated on the
              latest trends and innovations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-2">
              {authStatus ? (<Link
                to={"/home"}
                className="rounded-full border border-white bg-black  px-4 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </Link>):(<Link
                to={"/signup"}
                className="rounded-full border border-white bg-black  px-4 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </Link>)}
              
            </div>
          </div>
        </div>
      </div>
    )
}

export default LandingPage
