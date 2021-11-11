import React, { Fragment ,useState } from 'react';
import Navigation from './components/layouts/Navigation'
import Search from './components/users/Search';
import './App.css'
import axios from 'axios';
import Users from './components/users/Users';
import Alert from './components/layouts/Alert';
import aboutUs from './components/pages/aboutUs'
import {BrowserRouter as Router , Switch ,  Route } from 'react-router-dom'
import User from './components/users/User'
const App = ()=> 
{
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  // eslint-disable-next-line
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
  const [repos,setRepos]=useState([]);
  // eslint-disable-next-line
  
  //Search Github Users
  const searchUsers=async (text)=>{
    // console.log(text)
    setLoading(true);
    const res=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client    _secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    
    //this.setState({users:res.data.items , loading:false}) ;
    setUsers(res.data.items);
    // console.log(res.data);
    setLoading(false);
  }
  //get github users
  const getUser=async(username)=>{
    // console.log("reaching here")
    setLoading(true);
    const res=await axios.get(`https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    
    setUser(res.data);
    // console.log(res.data);
    
    setLoading(false);
  }
  //get users repos
  const getUserRepos=async(username)=>{
    setLoading(true);
    const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    // console.log(res.data)
    setRepos(res.data);
    //console.log(user);
    setLoading(false);
  }
  
  const clearUsers=()=>{
    //this.setState({users:[],loading:false});
    setLoading(false)
    setUsers([]);

  }
  const showAlert=(msg,type)=>
  {
      //this.setState({alert:{msg:msg,type:type}}); 
      setAlert({msg,type});
      setTimeout(()=>setAlert(null),2000);
  }
  //  async componentDidMount(){
  //    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //    this.setState({loading:true});
  //      const res=await axios.get(`https://api.github.com/users?client_id=$
  //      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
  //      this.setState({users:res.data , loading:false}) ;
  //  }
     
  //const {users,user,repos,loading} =this.state;
   return (
     <Router>
        <div >
          <Navigation title="Github Finder"/>
       
            <div className='container'>
              <Alert alert={alert}/>
                <Switch>
                  <Route exact path='/' render ={props=>(
                      <Fragment>
                          <Search 
                                searchUsers={searchUsers} 
                                  clearUsers={clearUsers} 
                                    showClear={users.length>0?true:false}
                                    setAlert={showAlert}
                                    />
                          <Users loading={loading} users={users}/>
       
                      </Fragment>
                  )}/>
                  <Route exact path ='/about' component={aboutUs}/>
                  <Route exact path='/user/:login' render={props=>(
                    <User { ...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading}/>
                  )}/>
                </Switch>
       
       

            </div>
       
        </div>
      </Router>
    );
  
}
export default App;