const axios = require("axios")

const getUserInfo = async function(token){
    let res = await axios.get(`${process.env.BASE_URL}userinfo`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    
    return res
}


module.exports = {
    getUserInfo
}