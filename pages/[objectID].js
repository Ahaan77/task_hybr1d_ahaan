import Post from "../components/Post"
import { useRouter } from 'next/router'

export default function ObjectID() {

    const router = useRouter()
    const { objectID } = router.query

    return (
        <Post objectID={objectID} />
    )
}
