import React from 'react';
import qs from 'querystring';
import { RouteComponentProps } from 'react-router-dom';
import { search } from '@services/index';
import './index.less'

interface IProps extends RouteComponentProps {
  MusicList: any
}

class SearchPage extends React.Component<IProps> {
  state = {
    search: '',
    searchType: '',
    pageNo: 0,
    searchResult: {}
  }

  shouldComponentUpdate = (props: any) => {
    let query = qs.parse(props.location.search.replace(/^\?/, ''))
    if(this.state.search !== query.s || this.state.searchType !== query.type){
      return true
    }
    return false
  }

  componentDidMount = async () => {
    let query = qs.parse(this.props.location.search.replace(/^\?/, ''))
    const res = await (await search({
      keywords: query.s as string,
      type: +query.type,
      offset: 0,
    })).data;
    console.log(res);
    this.setState({
      search: query.s,
      searchType: query.type,
    });
  }

  render() {
    return <div className="search-page">

    </div>
  }
}

export default SearchPage;