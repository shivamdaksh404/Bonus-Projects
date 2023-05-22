import React from 'react'
import style from './Home.module.css'

function Home() {
  return (
    <div className={style.mainContainer}>
    <div className={style.wrapperContainer}>

<h1>Welcome to Home Page </h1>
<button type='button' className='btn btn-danger'>Clear Task</button>
    </div>

    </div>
  )
}

export default Home