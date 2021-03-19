import * as React from 'react';
import { getNewCD } from '@services/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import './index.less'

SwiperCore.use([Navigation]);

interface NewCDItem {
  artist: {
    topicPerson: number,
    followed: boolean,
    name: string,
    id: number,
  },
  picUrl: string,
  name: string,
  id: number,
}

export default class NewCD extends React.Component {
  state = {
    newCD: [],
  }
  componentDidMount = async () => {
    const res = await (await getNewCD()).data
    this.setState({
      newCD: res.weekData.slice(0, 10),
    })
  }
  render() {
    return <div className="new-cd">
      <div className="v-hd2">
        <a href="/discover/album" className="tit">新碟上架</a>
        <span className="more">
          <a href="/discover/album">更多</a>
          <i className="cor">&nbsp;</i>
        </span>
      </div>
      <div className="new-content">
        <div className="inner">
          <div className="my-prev-el"></div>
          <Swiper
            className="wrap"
            loop
            observer
            observeParents
            navigation={{
              nextEl: '.my-prev-el',
              prevEl: '.my-next-el',
            }}
            slidesPerView={5}
            slidesPerGroup={5}
          >
            {
              this.state.newCD.map((item: NewCDItem, index) => {
                return <SwiperSlide className="item" key={index}>
                  <div className="u-cover">
                    <img className="j-img" src={`${item.picUrl}?param=100y100`} />
                    <a title={item.name} href={`/album?id=${item.id}`} className="msk"></a>
                    <a className="icon-play" title="播放"></a>
                  </div>
                  <p className="f-thide">
                    <a title={item.name} href={`/album?id=${item.id}`} className="tit">{item.name}</a>
                  </p>
                  <p className="tit f-thide" title={item.artist.name}>
                    <a className="s-fc3" href={`/artist?id=${item.artist.id}`}>{item.artist.name}</a>
                  </p>
                </SwiperSlide>
              })
            }
          </Swiper>
          <div className="my-next-el"></div>
        </div>
      </div>
    </div>
  }
}