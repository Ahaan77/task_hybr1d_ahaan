import Link from "next/link"
import { useState, useEffect } from "react"
import Footer from "./Footer"
import Loader from "./Loader"
import { formatDate } from "./utils"
import listData from "../services"

const Home = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        listData(setLoader, setData)
    }, [])


    // This function handles the search and queries for each key stroke on search box
    const handleSearch = async (e) => {
        setLoader(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/search?query=${e.target.value}`, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            const res = await response.json()
            setLoader(false)
            setData(res?.hits)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-8">
            <div className="flex font-light text-3xl mb-6 mt-2 justify-center">
                Search Hacker News
            </div>
            <div className="flex gap-3 w-full">
                <section className="flex items-center p-4 pt-6 w-full ">
                    <input onChange={handleSearch} className="flex-1 border-2 border-gray-300 bg-white text-black h-10 px-10 rounded-lg focus:outline-none" type="search" placeholder="Search" />
                </section>
            </div>
            {!loader ?
                <div className="ml-2">
                    {
                        data?.map((item, index) => {
                            return (
                                <Link key={index} href={`/${item?.objectID}`}>
                                    <div  className="rounded-md w-full border p-6 mb-2 hover:bg-gray-100 cursor-pointer hover:transition duration-200">
                                        <div className="text-xs text-gray-600 font-bold">{item?.author}</div>
                                        <div className="">{item?.title}</div>
                                        <div className="flex gap-2 mt-4">
                                            <div className="text-xs text-gray-600">Points :{item?.points + " |  "}</div>
                                            <div className="text-xs text-gray-600">Comments: {item?.num_comments + " |  "}</div>
                                            {item?.relevancy_score ? <div className="text-xs text-gray-600">Relevancy Score: {item?.relevancy_score + " |  "}</div> : null}
                                            <div className="text-xs text-gray-600">Date: {formatDate(item?.created_at_i )+ " |  "}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div> :
                <Loader />
            }
            <Footer />
        </div>
    )
}

export default Home