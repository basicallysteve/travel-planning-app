import Input from '../components/Input'
import { useState, useMemo } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

function User ({user, setUser}){
    user = user || {
        user_id: null,
        name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""

    }

    const [stateFullUser, setStateFullUser] = useState(user)
    const [validated, setValidated] = useState(false);
    const updateUserField = (field, value) => {
        setStateFullUser({
            ...stateFullUser,
            [field]: value
        })
    }

    const handleSubmit = (e) => {
        console.log(e.currentTarget.checkValidity(), stateFullUser);
        if (e.currentTarget?.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault()
        setValidated(true);
        
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
            
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default User;