import { useEffect, useState } from "react"
import { useSignUpUserMutation } from "../redux/api"
import { useNavigate } from "react-router-dom"

export default function SignUpUser() {
    const navigate = useNavigate()
    const [signUpUser, { isSuccess }] = useSignUpUserMutation()
    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        password: "",
        phone: "",
        email: ""
    })
    const [isAdminLogin, setIsAdminLogin] = useState(false)
    const changeHandler = (e) => {
        setFormState(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    }, [isSuccess])

    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '150px' }}>
        {Object.keys(formState).map(key => <label key={key}>{key}
            <input placeholder={key} value={formState[key]} id={key} key={key} onChange={changeHandler} />
        </ label>)}
        <label key='admin'>
            Admin Signup
            <input value={isAdminLogin} type="checkbox" onChange={e => setIsAdminLogin(prev => !prev)} />
        </label>
        <button onClick={(e) => {
            signUpUser({ ...formState, isAdmin: isAdminLogin, phone: Number(formState.phone) })
        }}>Sign Up</button>
    </div>
}