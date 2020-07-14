import React, { useEffect, useState } from "react"
import axios from 'axios'
import LoadingIndicator from "../components/LoadingIndicator"
import { Container, Row, Col } from "reactstrap"

function UserImages(props){
  const { userId } = props
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])

  useEffect(()=>{
    axios.get(`https://insta.nextacademy.com/api/v1/images/?userId=${userId}`)
      .then(result => {
        setImages(result.data)
        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  }, [userId])

  if (loading) {
    return <LoadingIndicator width="100px" height="100px" color="red" />
  }

  return(
    <>
    <Row>
      {
        images.map((image,index)=>{
          return (
            <Col sm="4" className='p-3 p-sm-0' key={`${userId}-images${index}`} >
              <img src={image} alt="user images" style={{objectFit:'cover'}} width="100%" height="250" className='p-1 mx-auto image-fluid'/>
            </Col>
          )
        })
      }        
    </Row>
    </>
  )
}
export default UserImages;