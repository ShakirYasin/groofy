import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { GoVerified } from "react-icons/go"
import NoResults from "../../components/NoResults"
import UserInfo from "../../components/UserInfo"
import VideoCard from "../../components/VideoCard"
import useAuthStore from "../../store/authStore"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"


const Search = ({videos}: {videos: Video[]}) => {

    const [isAccounts, setIsAccounts] = useState(false)
    const router = useRouter()
    const {searchTerm}: any = router.query
    const {allUsers} = useAuthStore()

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="w-full">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
        </div>
        {isAccounts ? (
            <div className="md:mt-16">
                {searchedAccounts.length ? (
                    searchedAccounts.map((user: IUser, i: number) => (
                        <Link href={`/profile/${user._id}`} key={i}>
                            <div className='flex items-center gap-3 cursor-pointer p-2 font-semibold rounded border-b-2 border-gray-200'>
                                <div>
                                <Image 
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                    alt="user profile"
                                />
                                </div>
                                <div className='hidden lg:block'>
                                <p className='capitalize flex items-center gap-1 text-md font-bold text-primary '>
                                    {user.userName}
                                    <GoVerified className='text-blue-400' />
                                </p>
                                <p className='lowercase text-gray-400 text-xs'>{user.userName.replaceAll(' ', '')}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ): (
                    <NoResults text={`No video results for ${searchTerm}`} />
                )}
            </div>
        ): (
            <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                {videos.length ? (
                    videos.map((video: Video, i:number) => (
                        <VideoCard post={video} key={i} />
                    ))
                ): (
                    <NoResults text={`No video results for ${searchTerm}`} />
                )}
            </div>
        )}
    </div>
  )
}


export const getServerSideProps = async (
    {params: { searchTerm }}: {params: {searchTerm: string}}
) => {

    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {
            videos: res.data
        }
    }

}

export default Search