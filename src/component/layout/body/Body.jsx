import BodyBanner from './bodyBanner/bodyBanner.jsx';
import FeaturePoduct from './FeaturedProducts/FeaturedProducts.jsx';
import Mymenu from './Mymenu/Mymenu.jsx';
import SectionBlog from './sectionBlog/sectionBlog.jsx';
import SectionNum from './sectionNum/sectionNum.jsx';
import SectionAbout from '../SectionAbout/SectionAbout.jsx';
import ProductCategories from '../body/ProductCategories/ProductCategories.jsx';
import React from 'react';
import Title from '../title/title.jsx';
import Banner from '../Banner/Banner.jsx';
import './Body.css';



export default function Body() {
  return (
    <div>
        <div>
        <div className="title-head">
            <Title />
        </div>
        <div className = 'banner-container'>

                <Banner/>
        </div>
        
        </div>
        <SectionAbout/>
        <ProductCategories/>
        <Mymenu/>
        {/* <FeaturePoduct/> */}
        <BodyBanner/>
        <SectionNum/>
        <SectionBlog/>
      
    </div>
  )
}
