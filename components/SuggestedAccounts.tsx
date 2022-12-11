import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect}  from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'
import UserInfo from './UserInfo'

const SuggestedAccounts = () => {
  const {fetchAllUsers, allUsers} = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className='lg:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <UserInfo user={user} key={user._id} />
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts