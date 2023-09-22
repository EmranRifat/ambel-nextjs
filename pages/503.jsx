import React from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
  return <section className='bg-lime-50 h-screen'>
    <div className="bg-503 m-auto h-[75vh] bg-no-repeat bg-top">
    </div>
    <div className='text-center'>
      <h1 className='text-2xl text-gray-800'>Smething went wrong!</h1>
      <p className='py-2 mb-4 text-gray-600'>The page you are looking for not available!</p>
      <Link href="/">
        <a className='border border-emerald-500 hover:text-white hover:bg-emerald-500  text-sm text-emerald-500  rounded-3xl py-2.5 px-5'>Go to Home</a>
      </Link>
    </div>
  </section>
}