import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './index.less'

class MyToast extends React.Component {
  render() {
    return <div className="allToast"><p>请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》</p></div>
  }
}

function AllToast() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  setTimeout(() => {
    unmountComponentAtNode(div);
  }, 1500)
  render(<div>
    <MyToast></MyToast>
  </div >, div)
}

export default AllToast;