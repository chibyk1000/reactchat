import {useState, useRef} from "react";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setLoading(true);
  
          if (( !email || !password)) {
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
            setLoading(false);
            return;
      }
      
      const user = await signInWithEmailAndPassword(auth, email, password)
      
      if (user) { 
        
          toast.success("Login successfull", {
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
            navigate("/chat");
          }, 2000);
   
      }
      
    } catch (error) {

        toast.error("invalid login details", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      setLoading(false);
      
    }
  }
  return (
    <form className=" w-7/12 mx-auto pt-10 " onSubmit={handleLogin}>
      <Box component="section" className=" bg-white p-4">
        <p className="text-chat font-bold uppercase text-3xl">
          Login to reach your friends
        </p>
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
        <div className="flex justify-between my-4">
          <Button
            variant="contained"
            className="mt-5"
            color="secondary"
            startIcon={<AiOutlineLogin />}
            type="submit"
            disabled={loading && true}
          >
            {loading ? (
              <>
                loading ...
                <CircularProgress color="info" size="20px" />
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="inline-block ">
            Don't have an account{" "}
            <Link
              to="/signup"
              className="font-bold text-chat underline hover:no-underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </Box>
      <ToastContainer />
    </form>
  );
};

export default Login;
