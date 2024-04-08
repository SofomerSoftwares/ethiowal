import React from 'react'
import img1 from '../assets/icons/delivery-van.svg';
import img2 from '../assets/icons/money-back.svg';
import img3 from '../assets/icons/service-hours.svg';


function brand() {

  
  return (
     <div class="container py-16">
        <div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={img1} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">Free Shipping</h4>
                    <p class="text-gray-500 text-sm">Order over $200</p>
                </div>
            </div>
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={img2} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">Money Rturns</h4>
                    <p class="text-gray-500 text-sm">30 days money returs</p>
                </div>
            </div>
            <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                <img src={img3} alt="Delivery" class="w-12 h-12 object-contain"/>
                <div>
                    <h4 class="font-medium capitalize text-lg">24/7 Support</h4>
                    <p class="text-gray-500 text-sm">Customer support</p>
                </div>
            </div>
        </div>
    </div>
  
  )
}

export default brand