import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const [success, setSuccess] = useState(null)

  const signup = async (formval) => {
    setIsLoading(true)
    setError(null)
    // console.log('At useSignup: ', email, password);
    console.log('At useSignup', formval);
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formval })
    })
    const json = await response.json()
    console.log("json: ", json);
    if (!response.ok) {
      setIsLoading(false)
      setSuccess(null)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('User', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      
      //update Error
      setError(null)
      //update success
      setSuccess('Registered Successfully!')
    }
  }

  return { signup, isLoading, error, success }
}