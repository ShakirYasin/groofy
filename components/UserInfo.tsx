import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'
import { IUser } from '../types'

const UserInfo = ({user, isAcomment}: {user: IUser, isAcomment: boolean}) => {
  return (
    <Link href={`/profile/${user._id}`}>
        <div className='flex gap-3  hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
        <div className='w-8 h-8'>
            <Image 
            src={user.image}
            width={34}
            height={34}
            className="rounded-full"
            alt="user profile"
            layout='responsive'
            />
        </div>
        <div className={`${isAcomment ? 'block' : 'hidden xl:block'}`}>
            <p className='flex items-center capitalize gap-1 text-md font-bold text-primary'>
            {user.userName}
            <GoVerified className='text-blue-400' />
            </p>
            <p className='text-gray-400 text-xs lowercase'>{user.userName.replaceAll(' ', '')}</p>
        </div>
        </div>
    </Link>
  )
}

export default UserInfo