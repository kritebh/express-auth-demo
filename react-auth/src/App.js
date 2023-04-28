import {useAuth0} from "@auth0/auth0-react"
import { useEffect } from "react";
import axios from "axios"
function App() {
  const {loginWithRedirect,logout,user,isAuthenticated,getAccessTokenSilently} = useAuth0()

  useEffect(()=>{
    getProtectedRoute()
  },[])

  const getProtectedRoute = async ()=>{
    try{
      const token = await getAccessTokenSilently()
      let res = await axios.get("http://localhost:8000/protected",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res.data)
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className="App">
      <button onClick={()=>loginWithRedirect()}>Login</button>
      {
        isAuthenticated ?
        <button onClick={logout}>Logout</button>
        :""
      }
      <h4>
      {
        JSON.stringify(user)
      }
      </h4>
    </div>
  );
}

export default App;
