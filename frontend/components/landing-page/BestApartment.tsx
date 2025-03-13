import React from 'react'
import CardApartment from '../apartment/CardApartment'

const BestApartment = () => {
    return (
        <div className='px-20'>
            <div className='flex justify-between flex-wrap'>
                <CardApartment />
                <CardApartment />
                <CardApartment />
            </div>
        </div>
    )
}

export default BestApartment
