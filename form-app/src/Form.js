import React from 'react'

export default function Form(props) {
    let { values, submit, change, disabled, errors } = props;

    let onSubmit = (evt) => {
        evt.preventDefault();
        submit()
    }

    let onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        let valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return(
        <form onSubmit={onSubmit}>
            <h1>Add a User</h1>
            <div style={{color: 'red'}}>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.serviceTerms}</div>
            </div>
            <div>
                <label> Name:
                    <input
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={onChange}
                    ></input>
                </label>
                <label> Email:
                    <input
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                    ></input>
                </label>
                <label> Password:
                    <input
                    type='text'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                    ></input>
                </label>
                <label> By checking, you agree to the Privacy and Usage Terms of Service--
                    <input
                    type='checkbox'
                    name='serviceTerms'
                    checked={values.serviceTerms}
                    onChange={onChange}
                    ></input>
                </label>
            </div>
            <button disabled={disabled}>Submit</button>
        </form>
    )
}