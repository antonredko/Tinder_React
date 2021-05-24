import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export default function FormAuth() {
    const auth = useAuth()
    const [formtype, setFormtype] = useState('signin')

    function FormAction(event) {
        event.preventDefault()

        const {email, password} = event.target

        if (formtype === 'signin') {
            auth.signin(email.value, password.value)
            return
        }
        if (formtype === 'signup') {
            auth.signup(email.value, password.value)
            return
        }
    }
    
    return (
        <div className="form_block">
            {!auth.user && <form className="from_auth" onSubmit={FormAction}>
                <button type="button" onClick={() => setFormtype(formtype === 'signin' ? 'signup' : 'signin')}>{formtype === 'signin' ? 'SignUp' : 'SignIn'}</button>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">{formtype === 'signin' ? 'Login' : 'Registration'}</button>
            </form>}
        </div>
    )
}