import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    // console.log( value, text)
    const renderRating = (value) => {

        //---------First Method-------//
    return [1, 2, 3, 4, 5].map((rate,index) =>  ( 
        <span key={index} >
            <i className={
            value + 1 === rate + 0.5
            ? "fa-solid fa-star-half-stroke"
            : value >= rate
            ?" fa-solid fa-star" 
            : "fa-regular fa-star"
            } style={{ color }} ></i>
        </span>)
        )
    
    //---------Second Method-------//
        // return (
        //         <div className='rating'>
        //             <span>
        //                 <i class={value >= 1 ?"fa-solid fa-star":value>=0.5?"fa-solid fa-star-half-stroke":"fa-regular fa-star"} style={{color}}   ></i> 
        //             </span>
        //             <span>
        //                 <i class={value >= 2 ?"fa-solid fa-star":value>=1.5?"fa-solid fa-star-half-stroke":"fa-regular fa-star"}  style={{color}} ></i> 
        //             </span>
        //             <span>
        //                 <i class={value >= 3 ?"fa-solid fa-star":value>=2.5?"fa-solid fa-star-half-stroke":"fa-regular fa-star"}  style={{color}} ></i> 
        //             </span>
        //             <span>
        //                 <i class={value >= 4 ?"fa-solid fa-star":value>=3.5?"fa-solid fa-star-half-stroke":"fa-regular fa-star"}  style={{color}} ></i> 
        //             </span>
        //             <span>
        //                 <i class={value >= 5 ?"fa-solid fa-star":value>=4.5?"fa-solid fa-star-half-stroke":"fa-regular fa-star"}  style={{color}} ></i> 
        //             </span>
        //         </div>
        // )
    }
    
  return (

    <div className='rating'>
          {renderRating(value)}
          <span> {text && text} </span>
    </div>
  )
}
Rating.defaultProps ={
color:"#f8e825"
}
Rating.propTypes = {
    value:PropTypes.number.isRequired,
    text:PropTypes.string.isRequired,
    color:PropTypes.string
}
export default Rating