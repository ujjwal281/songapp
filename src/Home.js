import React from 'react'
import { Card } from 'react-bootstrap'

const Home = () => {
  return (
    <div className='container text-center p-2'>
       <div className="row p-1" >
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
        </div>

        <div className="row p-1">
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
        </div>

        <div className="row p-1">
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
          </div>
          
          <div className="row p-1">
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
          </div>
          
          <div className="row p-1">
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
            <div className="col"><Card/></div>
        </div>
    </div>
  )
}

export default Home
