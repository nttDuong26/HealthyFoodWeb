import React from 'react';
import './sectionBlog.css';
import Disk from './ASSETS/disk.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import monan from './ASSETS/monga.png';

export default function sectionBlog() {
  return (
    <div className = 'sectionBlog'> 
        <div className='sectionBlog-title'>
            <span>
                <img src= {Disk} alt="disk-logo" />
                    Cẩm nang sức khỏe
                <img src= {Disk} alt="disk-logo" />
            </span>
        </div>
        {/* <div className="sectionBlog-content">
            <div className="sectionBlog-cart">
                <Card sx={{ maxWidth: 345,  backgroundColor: 'black' }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="190"
                        image={monan}
                        alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" color = "#fff" >
                                Calo và chất dinh dưỡng để cung cấp năng lượng cho hoạt động thể thao
                            </Typography>
                            <Typography variant="caption" color="#707070" >
                                Việc nạp calo và các chất dinh dưỡng đóng vai trò vô cùng quan trọng đối với các hoạt động thể thao và sức khoẻ tổng thể của bạn. 
                                Điều này cũng giúp bạn tăng cường hiệu suất tập luyện, 
                                đồng thời nâng cao sức đề kháng của mình trước bệnh tật.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                            sx = {{color: "#d69c52"}}size="small">
                            _Xem thêm_
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <div className="sectionBlog-cart">
                <Card sx={{ maxWidth: 345,  backgroundColor: 'black' }}>
                    <CardActionArea>
                       
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" color = "#fff">
                                Calo và chất dinh dưỡng để cung cấp năng lượng cho hoạt động thể thao
                            </Typography>
                            <Typography variant="caption" color="#707070" >
                                Việc nạp calo và các chất dinh dưỡng đóng vai trò vô cùng quan trọng đối với các hoạt động thể thao và sức khoẻ tổng thể của bạn. 
                                Điều này cũng giúp bạn tăng cường hiệu suất tập luyện, 
                                đồng thời nâng cao sức đề kháng của mình trước bệnh tật.
                            </Typography>
                            <CardMedia
                            component="img"
                            height="190"
                            image={monan}
                            alt="green iguana"
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                            sx = {{color: "#d69c52"}}size="small">
                            _Xem thêm_
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <div className="sectionBlog-cart">
                <Card sx={{ maxWidth: 345,  backgroundColor: 'black' }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="190"
                        image={monan}
                        alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" color = "#fff">
                                Calo và chất dinh dưỡng để cung cấp năng lượng cho hoạt động thể thao
                            </Typography>
                            <Typography variant="caption" color="#707070" >
                                Việc nạp calo và các chất dinh dưỡng đóng vai trò vô cùng quan trọng đối với các hoạt động thể thao và sức khoẻ tổng thể của bạn. 
                                Điều này cũng giúp bạn tăng cường hiệu suất tập luyện, 
                                đồng thời nâng cao sức đề kháng của mình trước bệnh tật.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button sx = {{color: "#d69c52"}}
                                size="small">
                        _Xem thêm_
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div> */}
        <div className="sectionBlogContent">
        <div className="sectionBlog-content1"  style={{ width: '25%' }} >
            <div className="swiper-slide swiper-slide-next" style={{ width: '100%', marginRight: '30px' }}>
                <div class="item-blog">
                    <div class="block-thumb order-first">
                        <a class="thumb" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Calories là gì? Tìm hiểu khái niệm cùng nhà Táo nhé!">
                            <img width="425" height="255" class="lazyload loadedBlog" src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" data-src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" alt="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon" data-was-processed="true"/>
                        </a>
                    </div>
                    <div class="block-content">
                        <div class="time-post">
                            <span>Đăng bởi: Admin nhà Táo</span>
                        </div>
                        <h3>
                            <a class="line-clamp line-clamp-2" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Calories là gì? Tìm hiểu khái niệm cùng nhà Táo nhé!">Calories là gì? Tìm hiểu khái niệm cùng nhà Táo nhé!</a>
                        </h3>
                        <p class="justify line-clamp line-clamp-2">
                        Calories là một đơn vị đo năng lượng trong dinh dưỡng  &nbsp;
                        Mỗi thức ăn và đồ uống có một lượng calories nhất định...</p>
                        <a href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" class="xemthem" title="xem thêm">
                        <div class="button-block">
                            <span class="button-line-left"></span>
                            <span class="button-text">Xem Thêm</span>
                            <span class="button-line-right"></span>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="sectionBlog-content1"  style={{ width: '25%' }}>
            <div className="swiper-slide swiper-slide-next" style={{ width: '100%', marginRight: '30px' }}>
                <div class="item-blog">
                    <div class="block-content">
                        <div class="time-post">
                            <span>Đăng bởi: Admin nhà Táo</span>
                        </div>
                        <h3>
                            <a class="line-clamp line-clamp-2" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">Total Daily Energy Expenditure-TDEE?</a>
                        </h3>
                        <p class="justify line-clamp line-clamp-2">
                        TDEE (Total Daily Energy Expenditure) là tổng lượng năng lượng cần thiết mỗi ngày để duy trì tất cả các hoạt động của cơ thể  &nbsp;</p>
                        <a href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" class="xemthem" title="xem thêm">
                        <div class="button-block">
                        
                            <span class="button-line-left"></span>
                            <span class="button-text">Xem Thêm</span>
                            <span class="button-line-right"></span>
                        </div>
                        </a>
                    </div>
                    <div class="block-thumb order-first">
                        <a class="thumb" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">
                            <img width="425" height="255" class="lazyload loadedBlog2" src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" data-src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" alt="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon" data-was-processed="true"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="sectionBlog-content1"  style={{ width: '25%' }}>
            <div className="swiper-slide swiper-slide-next" style={{ width: '100%' }}>
                <div class="item-blog">
                    <div class="block-thumb order-first">
                        <a class="thumb" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">
                            <img width="425" height="255" class="lazyload loadedBlog" src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" data-src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" alt="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon" data-was-processed="true"/>
                        </a>
                    </div>
                    <div class="block-content">
                        <div class="time-post">
                            <span>Đăng bởi: Admin nhà Táo</span>
                        </div>
                        <h3>
                            <a class="line-clamp line-clamp-2" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">BMI (Body Mass Index)-Một khái niệm không mới! </a>
                        </h3>
                        <p class="justify line-clamp line-clamp-2">
                          BMI là một chỉ số đo lường tỷ lệ giữa cân nặng và chiều cao của một người. &nbsp;
                          BMI có thể cung cấp một cái nhìn tổng quan về tình trạng cơ thể...</p>
                        <a href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" class="xemthem" title="xem thêm">
                        <div class="button-block">
                            <span class="button-line-left"></span>
                            <span class="button-text">Xem Thêm</span>
                            <span class="button-line-right"></span>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>


        <div className="sectionBlogContent_Tablet">
        <div className="sectionBlog-content1">
            <div className="swiper-slide swiper-slide-next" style={{ width: '290px', marginRight: '30px' }}>
                <div class="item-blog">
                    <div class="block-thumb order-first">
                        <a class="thumb" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">
                            <img width="425" height="255" class="lazyload loadedBlog" src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" data-src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" alt="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon" data-was-processed="true"/>
                        </a>
                    </div>
                    <div class="block-content">
                        <div class="time-post">
                            <span>Đăng bởi: Admin nhà Táo</span>
                        </div>
                        <h3>
                            <a class="line-clamp line-clamp-2" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon</a>
                        </h3>
                        <p class="justify line-clamp line-clamp-2">
                            Mâm cơn ngon miệng và đầy đủ dinh dưỡng  &nbsp;
                            Thực phẩm tươi ngon - bước quan trọng giúp hoàn thiện công...</p>
                        <a href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" class="xemthem" title="xem thêm">
                        <div class="button-block">
                            <span class="button-line-left"></span>
                            <span class="button-text">Xem Thêm</span>
                            <span class="button-line-right"></span>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="sectionBlog-content1">
            <div className="swiper-slide swiper-slide-next" style={{ width: '290px' }}>
                <div class="item-blog">
                    <div class="block-content">
                        <div class="time-post">
                            <span>Đăng bởi: Admin nhà Táo</span>
                        </div>
                        <h3>
                            <a class="line-clamp line-clamp-2" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon</a>
                        </h3>
                        <p class="justify line-clamp line-clamp-2">
                            Mâm cơn ngon miệng và đầy đủ dinh dưỡng  &nbsp;
                            Thực phẩm tươi ngon - bước quan trọng giúp hoàn thiện công...</p>
                        <a href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" class="xemthem" title="xem thêm">
                        <div class="button-block">
                        
                            <span class="button-line-left"></span>
                            <span class="button-text">Xem Thêm</span>
                            <span class="button-line-right"></span>
                        </div>
                    
                        </a>
                    </div>
                    <div class="block-thumb order-first">
                        <a class="thumb" href="/he-lo-chia-khoa-vang-giup-thiet-lap-duoc-cong-thuc-nau-an-ngon" title="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon">
                            <img width="425" height="255" class="lazyload loadedBlog2" src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" data-src="https://bizweb.dktcdn.net/100/469/097/articles/kheo-leo-co-meo-nau-an-de-co-bua.jpg?v=1666608663653" alt="Hé lộ chìa khóa vàng giúp thiết lập được công thức nấu ăn ngon" data-was-processed="true"/>
                        </a>
                        </div>
                </div>
            </div>
        </div>

        </div>

      
    </div>
  )
}
