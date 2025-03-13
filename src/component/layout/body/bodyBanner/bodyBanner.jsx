import React, { useState, useEffect } from 'react';
import './bodyBanner.css';

export default function BodyBanner() {

	
  return (
	<div>
	  <section class="section_banner">
	<div class="container">
		<div class="row_banner">
			<div class="col-lg-3 col-sm-5 col-9 banner">			
				<img  class="lazyload loaded" src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner1.png?1686650273952" data-src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner1.png?1686650273952" alt="banner" data-was-processed="true"/>
				<div class="content">
					<a href="#" title="banner">
						{/* <span class="title1">Dola Restaurant</span> */}
						<span class="title2">Món ăn đa dạng</span>
					</a>
				</div>
			</div>
			<div class="col-lg-3 col-sm-5 col-9 banner">		
				<img  class="lazyload loaded" src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner2.png?1686650273952" data-src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner2.png?1686650273952" alt="Banner" data-was-processed="true"/>
				<div class="content">
					<a href="#" title="Banner">
						{/* <span class="title1">Dola Restaurant</span> */}
						<span class="title2">Hương vị đặc biệt</span>
					</a>
				</div>
			</div>
			<div class="col-lg-3 col-sm-5 col-9 banner">		
				<img  class="lazyload loaded" src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner3.png?1686650273952" data-src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner3.png?1686650273952" alt="Banner" data-was-processed="true"/>
				<div class="content">
					<a href="#" title="Banner">
						{/* <span class="title1">Dola Restaurant</span> */}
						<span class="title2">Công thức độc quyền</span>
					</a>
				</div>
			</div>
			<div class="col-lg-3 col-sm-5 col-9 banner">	
				<img  class="lazyload loaded" src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner4.png?1686650273952" data-src="//bizweb.dktcdn.net/100/469/097/themes/882205/assets/banner4.png?1686650273952" alt="" data-was-processed="true"/>
				<div class="content">
					<a href="#" title="">
						{/* <span class="title1">Dola Restaurant</span> */}
						<span class="title2">Đảm bảo chất lượng</span>
					</a>
				</div>
			</div>
		</div>
	</div>
		</section>
	</div>
  )
}


