import React from 'react'
import '../styles/container.css'

function Container(props) {
  return ( 
    <div className='display-container'>
      {props.productList.map((prod, index) => (
          <div key={index} className='container-body'>
            <div className='row'>
              <div className='column-left'>
                <h2>{prod['product_name']}</h2>
              </div>
              <div className='column-right'>
                <h4 className='view-button'>View</h4>
              </div>
            </div>

            <p className='department-text'>{prod['department']}</p>
            <p className='text-handler'>Color <span>{prod['color']}</span></p>
            <p className='text-handler'>Material <span>{prod['material']}</span></p>
            <p className='text-handler'>Price <span>{prod['price']}</span></p>
            <p className='text-handler'>Promotion Code <span>{prod['promo_code']}</span></p>
          </div>
        ))}
    </div>
  )
}

export default Container
