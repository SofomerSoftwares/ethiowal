import React from 'react';
import { Link } from "react-router-dom";


function About() {

  return (
<>
{/* About Section Start */}
    <section className="overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              <span className="mb-4 block text-lg font-semibold text-primary">
                Why Choose Us
              </span>
              <h2
                className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]"
              >
                Make your customers happy by giving services.
              </h2>
              <p className="mb-5 text-base text-body-color dark:text-dark-6">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less.
              </p>
              <p className="mb-8 text-base text-body-color dark:text-dark-6">
                A domain name is one of the first steps to establishing your
                brand. Secure a consistent brand image with a domain name that
                matches your business.
              </p>
              <Link to={"/"}
                
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
     {/* -- ====== About Section End  */}
     </>
  )
  
}

export default About