import {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";
const Protected = ({ children }) => {
    
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
    


// const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!user) {
 
    navigate('/')
  
   return // ...
    } 

    setLoading(false)

    
});

    }, [loading])
    
    if (loading) {
        return (
            <CircularProgress size={50} />
        )
    }

    return (
        <>
 {children}
        </>
  )
}

export default Protected