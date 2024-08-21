import { NavLink, useNavigate } from 'react-router-dom'
import classes from './HomeNavigation.module.css'
import { useContext, useEffect } from 'react';
import { context } from '../context/MyContextApp';

type Props = {}

function HomeNavigation({}: Props) {
  let navigate = useNavigate()
  const ctx = useContext(context);

  if (!ctx) {
      throw new Error('SomeComponent must be used within a MyContextApp');
  }

  const {user} = ctx

  useEffect(()=>{
    if(user && user.isAuthorize==false){
       navigate('/auth/login')
    }
  },[])
  return (
    <div className={classes.container}>
    <h1 >QUIZZIE</h1>
    <div className={classes.linkGroup}>
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'dashboard'}>Dashboard</NavLink> 
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'analytics'}>Analytics</NavLink> 
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'createquiz'}>Create Quiz</NavLink> 
    </div>
    <div>
    <hr/>
    <h2 className={classes.logout}>Logout</h2>
    </div>
    </div>
  )
}

export default HomeNavigation