import { useEffect, useState } from "react"
import Loader from "./Loader"
import { stripHTML, formatDate } from "./utils"

const Post = ({ objectID }) => {

    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(false) 

    useEffect(() => {
        if (objectID) {
            getPost() // Calls getPost if ObjectID is available
        }
    }, [objectID])


    // This call fetches the individual post data using the OBJECT ID
    const getPost = async () => {
        setLoading(true) // Sets the loader true  
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/items/${objectID}`, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Accept": "application/json" 
                }
            })
            const res = await response.json()
            setLoading(false) // Sets the loader false after we recieve the data
            setPostData(res) // Sets the received data to postData

        } catch (error) {
            console.log(error) // Logs error incase we have any
        }
    }

    return (
        <>
            {!loading ?
                <div className="mr-6 ml-6 mt-4">
                    <div className="rounded-md w-full border p-6 mb-2">
                        <div className="text-xs text-gray-600 font-bold">{postData?.author}</div>
                        <div className="">{postData?.title}</div>
                        <div className="flex gap-2 mt-4">
                            <div className="text-xs text-gray-600">Points :{postData?.points + " |  "}</div>
                            {postData?.relevancy_score ? <div className="text-xs text-gray-600">Relevancy Score: {postData?.relevancy_score + " |  "}</div> : null}
                            <div className="text-xs text-gray-600">Date: {formatDate(postData?.created_at_i) + " |  "}</div>
                        </div>
                    </div>
                    <div className="ml-10">
                        {postData?.children?.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item?.text ?
                                        <div className="rounded-md w-full border p-2 mb-2">
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-xs text-gray-600 font-bold">{item?.author + " | "}</div>

                                                <div className="text-xs text-gray-600 font-bold">{formatDate(item?.created_at_i)}</div>
                                            </div>
                                            <div className="text-sm ml-2">{stripHTML(item?.text)}</div>
                                        </div> : null}
                                </div>
                            )
                        })}
                    </div>
                </div> :
                <div className="ml-6 mr-6">
                    <div className="animate-pulse bg-gray-200 h-20 w-full mt-4">
                    </div>
                    <div className="ml-6 mt-4">
                        <Loader />
                    </div>
                </div>
            }

        </>
    )
}

export default Post