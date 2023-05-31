import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


export default function Home() {

  const [search,setSearch]=useState('');
  const [foodItems,setFoodItems]=useState([]);
  const [foodCat,setFoodCat]=useState([])
  

  const loadData= async()=>{
    
    let response=await fetch("http://localhost:5000/api/foodData",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      } 
      
    });
   
    response=await response.json();
    // console.log(json);
    setFoodItems(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }

  useEffect(()=>{loadData()},[])

  return (
    <div className='home'>
        <div><Navbar/></div>
        <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{zIndex:"10"}}>
            <div className="d-flex justify-content-centre">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/1000×1000/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)",maxHeight:"500px",maxWidth:"100%" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/1000×1000/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)",maxHeight:"500px",maxWidth:"100%"  }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/1000×1000/?biryani" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)",maxHeight:"500px",maxWidth:"100%"  }} />
          </div>


        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
       <div className='container'>
       {
         foodCat!==[] 
         ? foodCat.map((cat)=>{
          return(
            <div className='row'>
            <div key={cat._id} className='fs-3 m-3'>
              {cat.CategoryName}
              </div>
              <hr />
              {
                foodItems!==[] ? 
                foodItems.filter((items)=>
                  (items.CategoryName===cat.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase()))
                ).map(result=>{
                  return(
                    <div key={result._id} className='col-12 col-md-6 col-lg-3'>
                      <Card foodItem={result} options={result.options[0]}/>
                    </div>
                  )
                }) : <div>No food items for this category </div>
              }
              </div>
          )
         }) : <div>No data found </div>
       }
        
       </div>
        <div><Footer/></div>
    </div>
  )
}
