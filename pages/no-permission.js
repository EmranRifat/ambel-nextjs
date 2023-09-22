import React from 'react';
import Link from 'next/link';
import Title from '../components/Title';

export default function NoPermissionPage() {
  return (
    <div>
      <Title title="You do not have permission" />
      <section className='bg-lime-50 h-[75vh]'>
        <div className="bg-403 m-auto h-[50vh] bg-no-repeat bg-top">
        </div>
        <div className='text-center'>
          <h1 className='text-2xl text-gray-800'>No permission given</h1>
          <p className='py-2 mb-4 text-gray-600'>You do not have permissions to see this page!</p>
          <Link href="/">
            <a className='border border-emerald-500 hover:text-white hover:bg-emerald-500  text-sm text-emerald-500  rounded-3xl py-2.5 px-5'>Go to Home</a>
          </Link>
        </div>
      </section>
    </div>
  )
}