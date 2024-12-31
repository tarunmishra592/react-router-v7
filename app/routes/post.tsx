import { Form, Link, NavLink, redirect, useFetcher, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/post";

export async function clientLoader({params}: Route.LoaderArgs){
    const postId = params.postId
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return await data.json()
}

export async function clientAction({params}: Route.LoaderArgs){
    try{
        await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
            method: 'DELETE'
        })
        return { deleted: true }
    }catch(err){
        return { deleted: false }
    }    
}

export default function Post({loaderData}: Route.ComponentProps){

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isDeleted = fetcher?.data?.deleted
    const isNavigation = Boolean(navigation.location)

    const isDeleting = fetcher.state != 'idle'

    if(isNavigation){
        return <p>Navigating...</p>
    }

    return(
        <div>
            {!isDeleted && <h2>Post title: {loaderData.title}</h2>}
            <button onClick={() => navigate('/')}>Redirect</button>
            {isDeleting && <p>Post Deleting...</p>}
            {/* <Link to="/about">About</Link> */}
            <fetcher.Form method="delete">
                <button type="submit">Delete</button>
            </fetcher.Form>
        </div>
    )
}