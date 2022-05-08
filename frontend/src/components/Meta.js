import React from 'react'
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
return (
    <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <meta name='description' content={description}/>
        <meta name='keyword' content={keywords}/>
    </Helmet>
)
}
Meta.defaultProps = {
    title: 'Welcome To SpaceShop',
    description: 'Wesell the best products for cheap',
    keywords: 'electtonics, buy electronics, courses,self-learning'
}
export default Meta