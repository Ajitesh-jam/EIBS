
'use client'
//import web3 from components/utils/web3.js

import  {useState}  from "react";

import Link from "next/link";

export const Card = (image, name,index ) => {


    return (
        <>

            <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                
                                    <div
                                        key={index}
                                        className="col-lg-3 col-md-6 col-sm-12 team-block"
                                    >
                                        <div
                                            className="team-block-one wow fadeInUp animated"
                                            data-wow-delay={`${index * 200}ms`}
                                            data-wow-duration="1500ms"
                                        >
                                            <div className="inner-box">
                                                <div className="image-box">
                                                    <figure className="image">
                                                        <img
                                                            style={{
                                                                width: "287px",
                                                                height: "220px",
                                                                overflow: "hidden", // Ensures no content spills outside
                                                            }} 
                                                            src={image}
                                                            alt={name}
                                                        />
                                                    </figure>
                                                   
                                                </div>
                                                <div className="lower-content">
                                                    <h3>
                                                        
                                                        {name}

                                                    </h3>
                                                    
                                                    <span className="designation">
                                                        Details: bfjebnf
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            </div>
                        </div>
            </section>


      </>
    )
  }
  
