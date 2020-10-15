import * as yup from 'yup'

export const schema = yup.object().shape({
    name: yup.string().required(`User name required.`),
    email: yup.string().email(`Valid email required.`).required(`Please input an email.`),
    password: yup.string().required(`Password is required.`).min(8, `A minimum of 8 characters is required.`),
    serviceTerms: yup.boolean().oneOf([true], `Agreement to service terms required.`),
})