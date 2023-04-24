import Input from '../components/Input'
import { useState, useMemo } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserAPI from "../services/api/User"
import { useLocation } from 'react-router-dom';
function User ({user}){
    user = user || {
        user_id: null,
        name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""

    }
    
    let {state} = useLocation()
    if(state && state.user){
        user = state.user
    }
    let {createUser, updateUser, deleteUser} = new UserAPI().repo();
    const [stateFullUser, setStateFullUser] = useState(user)
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})

    let passwordValid = useMemo(()=>{
        return stateFullUser.password == stateFullUser.password_confirmation
    },[stateFullUser.password, stateFullUser.password_confirmation])

    const updateUserField = (field, value) => {
        setStateFullUser({
            ...stateFullUser,
            [field]: value
        })
    }

    const handleSubmit = (e) => {
        if (e.currentTarget?.checkValidity() === false || !passwordValid) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault()
        setValidated(true);

        
        createUser({user: stateFullUser}).then((response) => {
            if(response.status == 400){
                setErrors(response.data.data)
            }

            if(response.status == 200){
                setErrors([])
                setStateFullUser(response.data.data)
            }
        })
    }
    let passwordInputs;
    
    {
        if(stateFullUser.user_id == null){
            passwordInputs = (
                <>
                <Input type="password" value={stateFullUser.password} onUpdate={(e) => updateUserField('password', e)} id="password" name="password" label="Password" required={stateFullUser.user_id == null} disabled={stateFullUser.user_id != null}/>
            <Input type="password" value={stateFullUser.password_confirmation} onUpdate={(e) => updateUserField('password_confirmation', e)} id="password_confirmation" name="password_confirmation" label="Confirm Password" required={stateFullUser.user_id == null} disabled={stateFullUser.user_id != null}/>
                </>
            )
        }
        
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Input type="text" value={stateFullUser.name} onUpdate={(e) => updateUserField('name', e)} id="name" name="name" label="Name" required={true} feedbackMessages={
                {
                    invalid: "Please provide a name"
                }
            } />
            <Input type="text" value={stateFullUser.last_name} onUpdate={(e) => updateUserField('last_name', e)} id="last_name" name="last_name" label="Last Name" required={true}  />
            <Input type="email" value={stateFullUser.email} onUpdate={(e) => updateUserField('email', e)} id="email" name="email" label="Email" disabled={stateFullUser.user_id != null} />
            {passwordInputs}
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default User;