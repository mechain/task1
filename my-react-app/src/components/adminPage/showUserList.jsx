import { useEffect } from "react"
import { useGetUsersListsMutation } from "../../redux/api"

export default function ShowUserList() {
    const [getUserLists, { data, isLoading }] = useGetUsersListsMutation()
    useEffect(() => {
        getUserLists()
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            {isLoading ? <div>is Loading</div> :
                data && data.data.map(e => <span key={e.email}>{`${e.email} ${e.accountStatus} ${e.userListing}`}</span>)
            }
        </div>
    )
}

