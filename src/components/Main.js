import {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from '../firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Main = () => {
const dispatch = useDispatch()
  const { collapse } = useSelector((state) => state.appSlice);
  const [sendermsg, setsenderMsg] = useState([])
  const [recievermsg, setrecieverMsg] = useState([])
  const { user } = useSelector((state) => state.userSlice);
  const { currentFriend } = useSelector((state) => state.friendSlice);
  const msgRef = useRef()
  useEffect(() => {

    onAuthStateChanged(auth, async(user) => {
      if (user) {
 
        const citiesRef = collection(db, "users");
        const q = query(citiesRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
dispatch(setUser(doc.data()))
},[]);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
   
  }, [])

  useEffect(() => {

    const getmessage = async()=>{
    const allmsg = collection(db, "message");
    const q = query(allmsg, where("sender", "==", user.name));
  
      const querySnapshot = await getDocs(q);
     
      const msgs = []
    querySnapshot.forEach((doc) => {
      if (doc.data().sender === user.name && doc.data().receiver === currentFriend) {
       
        msgs.push(doc.data());
     }
 
    
   
   
  }, [])
  setsenderMsg(msgs)
     
      
      
    };
    getmessage()
  })
  

  useEffect(() => {
    const getmsg2 = async() => {
      const allmsg = collection(db, "message");
      const qs = query(allmsg, where("receiver", "==", user.name));
      const querySnapshot2 = await getDocs(qs);

      const msgs2 = []

querySnapshot2.forEach((doc) => {
  if (doc.data().receiver === user.name && doc.data().sender === currentFriend) {
    console.log(doc.data())
    msgs2.push(doc.data())
        }
        
        
      }, [])
      setrecieverMsg(msgs2)
    }
    getmsg2() 
  })

console.log(recievermsg)
  const handleSendMsg = async(event)=>{
    try {
      event.preventDefault()
      
      
         const docRef = await addDoc(collection(db, "message"), {
           sender: user.name,
           receiver: currentFriend,
           msg: msgRef.current.value
         });
  msgRef.current.value= ""

} catch (err) {
  console.log(err);
}
  }

  return (
    <div className={collapse? "w-full ml-0": "main transition-all ease-in-out duration-700"}>
      <nav className="border-b-2 border-white pl-5 h-[5rem]">
        <div>
          <a href="" className="w-10 block">
            <img src="logo512.png" alt="" className="w-full" />
          </a>
          <p>{ currentFriend}</p>
        </div>
      </nav>
      <div className="h-full area">
        <div className="chat_area px-5 py-4 overflow-y-auto ">
          {
            sendermsg.map((msg) => {
              
              if (msg.sender === user.name) {
                return (
                  <div className="flex mb-3">
                    <p className="text-white bg-rose-900 max-w-[20rem] rounded-br-2xl rounded-bl-2xl p-2 rounded-tr-2xl">
              {  msg.msg}
                    </p>
                  </div>
                );
              } 
            
              
            })
          }
         
          {
            recievermsg.map((msgs2) => {
              return (
                      <div className="flex my-3 ">
                    <p className="text-rose-900 bg-white max-w-[20rem] rounded-tl-2xl rounded-bl-2xl p-2 rounded-tr-2xl ml-auto ">
                 {msgs2.msg}
                    </p>
                  </div>
              )
            })
}
        

        </div>
        <form action="" className="px-2" onSubmit={handleSendMsg} >
          <input
            type="text"
            placeholder="Enter message here"
            className="w-full h-10 pl-5 outline-none"
            ref={msgRef}
          />
          <button type='submit'></button>
        </form>
      </div>
    </div>
  );
}

export default Main