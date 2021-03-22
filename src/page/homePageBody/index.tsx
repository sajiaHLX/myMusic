import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { getHomePageBanner } from '@services/index';
import { HomePageBannerType } from '@utils/types';
import LeftBody from './leftBody';
import "swiper/components/navigation/navigation.less";
import "swiper/components/pagination/pagination.less";
import "swiper/swiper.scss";
import './index.less';

SwiperCore.use([Pagination, Autoplay, Navigation]);

export default class PageBody extends React.Component {
  state = {
    bannerList: [],
  }
  componentDidMount = async () => {
    const res = await (await getHomePageBanner()).data;
    this.setState({
      bannerList: res.banners,
    });
  }
  render() {
    const { bannerList } = this.state;
    return <div className="home-page-body">
      <div className="banner-wrap">
        <Swiper
          className="swiper-container"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          pagination={{ clickable: true }}
          observer
          observeParents
          navigation
        >
          {bannerList.map((item: HomePageBannerType, index) => {
            return <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage: `url("${item.imageUrl}?imageView&blur=40x20")`,
                backgroundSize: '6000px',
                backgroundPosition: 'center center',
              }}
              key={String(item.targetId + index)}
              onClick={() => {
                console.log(item.url, item.targetId, item, '123');
              }}
            >
              <div className="slide-wrap">
                <img src={item.imageUrl} alt={item.typeTitle} />
              </div>
            </SwiperSlide>
          })}
        </Swiper>
      </div>
      <div className="center">
        <div className="content">
          <div className="left-body">
            <LeftBody />
          </div>
        </div>
      </div>
    </div>;
  }
}