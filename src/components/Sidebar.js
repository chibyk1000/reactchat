import {useState, useRef, useEffect} from 'react'
import { Disclosure } from '@headlessui/react'
import { FaBars } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setCollapse } from '../store/appSlice'
import { auth } from '../firebase.config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../firebase.config'
import { setCurrentFriend } from '../store/friendSlice'
const Sidebar = () => {
  const [name, setName] = useState('')
  const [display, setDisplay] = useState(false)
  const [friend, setFriend] = useState([])
  const [friends, setFriends] = useState([])
  const friendRef = useRef()
  const dispatch = useDispatch()
const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth)
navigate('/')
  }
  const { collapse } = useSelector((state) => state.appSlice)
  const { user } = useSelector((state) => state.userSlice)


  const handleCollapse = () => {
   
    dispatch(setCollapse(!collapse))

  }

  const handleChange = async (e) => {
    setName(e.target.value)
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    
const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

  // doc.data() is never undefined for query doc snapshots
  if (doc.data()) {
    
    setFriend([doc.data()])
    setDisplay(true)
  }
});
    // console.log(name)
  }

  const getData = async () => {
    try {
      if (Object.keys(user).length > 0) {
     
        const unsub = onSnapshot(doc(db, "friends", user.email), (doc) => {
          // console.log("Current data: ", doc.data().friends);
          setFriends(doc.data().friends)
          });
      }


    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {

    getData()

    },[user])

  const handleAddFriends = async(event) => {
    event.preventDefault()
    try {
 
const newFriendRef = doc(db, "friends", user.email);
      await updateDoc(newFriendRef, {
        friends: arrayUnion(friendRef.current.value),
      });
      setDisplay(false)
      getData()
     
    } catch (error) {
      
    }
  }


  return (
    <div>
      <Disclosure defaultOpen>
        <Disclosure.Button
          className="absolute top-4 right-4 hover:text-white focus:outline-none focus:ring-2 focus:ring-white hover:bg-gray-900 p-2 group peer rounded-md focus:ring-inset"
          onClick={handleCollapse}
        >
          <FaBars className="text-2xl" />
        </Disclosure.Button>

        <Disclosure.Panel>
          <div className="bg-black h-screen md:block w-1/2 lg:w-60 fixed lg:left-0 px-2">
            <div className="border-b border-white text-white py-3 pl-2 h-[11rem]">
              <section className="flex justify-between ">
                <p className="text-2xl uppercase font-bold">Chats</p>

                <button className="bg-rose-900  px-3" onClick={handleLogout}>
                  Log out
                </button>
              </section>

              <div className=" flex justify-start py-1 w-full  gap-3 items-center bg-rose-900 rounded-md cusor-pointer hover:shadow-lg my-3">
                <a href="" className="w-10 block">
                  <img src="logo512.png" alt="" className="w-full" />
                </a>
                <p className="text-white text-1xl ">{user.name}</p>
              </div>

              <form action="">
                <input
                  type="text"
                  placeholder="search for friends"
                  className="pl-3 outline-none rounded-lg placeholder:text-red-600 py-2 text-red-600 "
                  onChange={handleChange}
                />
              </form>
            </div>
            <section className="overflow-scroll friends_list">
              {display ? (
                <>
                
                
                
                {

                  friend.map((person) => {
                    return (
                      
                      <form className="p-2 mx-3    rounded-md cusor-pointer hover:shadow-lg my-3" onSubmit={handleAddFriends}>
                        <a href="" className=" flex gap-3 items-center">
                          <img src="logo512.png" alt="" className="w-10 " />
                          <p className="text-white text-1xl font-bold ">{ person.name}</p>
                        </a>
                        <input type="hidden" value={person.name} ref={friendRef} />
                        <button className="bg-rose-700 text-white px-2 py-1 rounded mt-1 hover:bg-white hover:text-rose-900" type='submit'>
                          Add Friend
                        </button>
                      </form>
                    )
                  })
                }
                </>
              ) : (
              
                  <>
                  
                  {
                    
                      friends.map(fri => {
                
                    return( 
                      
                <button className="p-2 mx-3   hover:bg-rose-900 rounded-md cusor-pointer hover:shadow-lg my-3 w-[90%]" onClick={()=> dispatch(setCurrentFriend(fri))}>
                  <a  className=" flex gap-3 items-center">
                    <img src="logo512.png" alt="" className="w-10 " />
                          <p className="text-white text-1xl font-bold ">{ fri }</p>
                  </a>
             
                </button> 
                    )
                  })}
                  </>
              )}
            </section>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default 
Sidebar