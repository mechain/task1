import { useEffect, useState } from "react"
import { useLoginUserMutation } from "../redux/api"
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const navigate = useNavigate()
    const [loginUser, { isSuccess }] = useLoginUserMutation();
    const [formState, setFormState] = useState({
        email: '',
        password: "",
        isAdmin: false
    });

    useEffect(() => {
        if (isSuccess) {
            navigate('/home')
        }
    }, [isSuccess])

    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '150px' }}>
        <label>
            Email
            <input value={formState.email} onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))} />
        </label>
        <label>
            Password
            <input value={formState.password} onChange={e => setFormState(prev => ({ ...prev, password: e.target.value }))} />
        </label>
        <label>
            Admin Login
            <input type="checkbox" value={formState.isAdmin} onChange={e => setFormState(prev => ({ ...prev, isAdmin: !prev.isAdmin }))} />
        </label>
        <button onClick={() => {
            loginUser(formState)
        }}>Login</button>
        <button onClick={() => navigate('/signup')} >Sign Up</button>
    </div>
}