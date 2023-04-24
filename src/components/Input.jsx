import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
function Input ({type, value, id, name, label, onUpdate, required = false, disabled = false, feedbackMessages = {}, ...props}){
    const [inputValue, setInputValue] = useState(value)
    useEffect(() => {
        setInputValue(value)
    }, [value])


    const onChange = (e) => {
        onUpdate && onUpdate(e.target.value)
    }

    
    switch(type){
        case "text":
        case "email":
        case "password":
            return (
                <Form.Group controlId={id}>

                    <Form.Label>{label}</Form.Label>
                    <InputGroup hasValidation={required}>
                    <Form.Control type={type} value={inputValue} onChange={onChange} required={required} />
                    <Form.Text className="text-muted" disabled={disabled} />
                    {
                        Object.keys(feedbackMessages).map((key) => {
                            return (
                                <Form.Control.Feedback type={key} key={`${id}-${key}`}>
                                    {feedbackMessages[key]}
                                </Form.Control.Feedback>
                            )
                        })
                    }
                    </InputGroup>

                    
                </Form.Group>
            )
        default:
            return (
                <>
                <label for={name}>{label}</label>
                <input name={name} type={type} value={inputValue} onChange={onChange} required={required} disabled={disabled} />
                </>
            )
    }
   
}

export default Input