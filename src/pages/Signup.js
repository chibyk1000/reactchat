import React, { useState } from "react";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import { v4 } from "uuid";
// import LoadingButton from "@mui/lab/LoadingButton";
import { FaRegIdBadge } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const id = v4();
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
const [loading, setLoading] = useState(false)
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      if ((!name || !email || !password || !password_confirmation)) {
        toast.error("empty inputs", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
        return
      }

      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      if (user) {


         const docRef = await addDoc(collection(db, "users"), {
           name: name,
           id: id,
           email: email,
         });
   await setDoc(doc(db, "friends", email), {
          user: id,
          friends: [],
        });

        // const resp = await setDoc(doc(db, "users", "mychat"), {
        //   name: name,
        //   id: id,
        //   email: email,
        // });

 
          toast.success("Signup successfull, redirecting to dashboard", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
          });
        
        setTimeout(() => {
             setLoading(false);
          navigate('/chat')
        }, 3000)
   
      }
    } catch (error) {
      setLoading(false)
    }
  };
  return (
    <form className=" w-7/12 mx-auto pt-10 " onSubmit={handleSignup}>
      <Box component="section" className=" bg-white p-4">
        <p className="text-chat font-bold uppercase text-3xl">
          Create an account
        </p>
        <TextField
          id="filled-basic"
          label="name"
          variant="filled"
          className="block w-full my-10"
          margin="normal"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          id="filled-basic"
          label="email"
          variant="filled"
          className="block w-full my-10"
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="password"
          variant="filled"
          className="block w-full "
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="confirm password   "
          variant="filled"
          className="block w-full "
          margin="normal"
          value={password_confirmation}
          onChange={(event) => setPassword_confirmation(event.target.value)}
        />
        <div className="flex justify-between my-4">
          <Button
            variant="contained"
            className="mt-5"
            color="secondary"
            type="submit"
            startIcon={<FaRegIdBadge />}
            disabled={loading && true}
          >
            {loading ? (
              <>
               loading ...
                <CircularProgress color="info" size="20px" />
              </>
            ) : (
                
              'Register'
            )}
          </Button>
          <p className="inline-block ">
            already have an account{" "}
            <Link
              to="/"
              className="font-bold text-chat underline hover:no-underline "
            >
              login here
            </Link>
          </p>
        </div>
      </Box>
      <ToastContainer />
    </form>
  );
};

export default Signup;
