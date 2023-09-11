// import React from "react";


// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//       return <h1>欢迎回来!</h1>;
//     }
//     return <h1>请先注册。</h1>;
// }

// function LoginButton(props){
//     const isLoggedIn = props.isLoggedIn;
//     let buttonName = "login";
//     if (isLoggedIn) {
//         buttonName = "logout";
//     }
//     return <button onClick={props.onClick}>{buttonName}</button>
// }

// function redHOC(WrapComponent){
//     return class Hoc extends React.Component{
//           render(){
//             return  <div style={{color:'red'}}>
//                 <WrapComponent />
//             </div>
//           }
//     }
// }

// class HomePage extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {isLoggedIn: false};
//     }

//     loginStateSet(isLoggedIn) {
//         if(isLoggedIn){
//             this.setState({isLoggedIn: false});
//             return;
//         }
//         this.setState({isLoggedIn: true});
//     }
     

//     render() {
//         const isLoggedIn = this.state.isLoggedIn;
//         return (
//             //代替空白的div
//             <React.Fragment>
//               <Greeting isLoggedIn={isLoggedIn} />
//               <LoginButton isLoggedIn={isLoggedIn} onClick={this.loginStateSet.bind(this, isLoggedIn)} />
//             </React.Fragment>
//           );      
//     }
// }
// export default redHOC(HomePage)


import React, { useState, useEffect , useRef} from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu, Col, Row  } from 'antd';
import service from '../../request';
const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('电影', '1', <AppstoreOutlined />),
  getItem('连续剧', '2', <AppstoreOutlined />),
];
const HomePage = () => {
  //const navigate = useNavigate()  跳转navigate(page)跳转是对应react的页面跳转。
  const [type,setType] = useState('2');
  const [tag,setTag] = useState(['3']);
  const [show,setShow] = useState("");
  let data  = useRef([{name:"default"}]);
  let error = useRef("");
  useEffect(() => {
    error.current = "";
    const path = "typeSearch/movie/type/" + 2 + "/?tag=" + 3;
    service.get(path, {}).then(
      //{}可以传参数
      // {
      //   params: {
      //     page: 3,
      //     per: 2,
      //   },
      //   headers: {},
      // }
      (resData)=>{
        data.current = resData.data.data;
        setShow("1");
      }
    ).catch(
      err => { error.current = err.message; }
    )
    }, []);
  
  const typeClick = (item)=>{
    if (type === item.key) {
      return;
    }
    console.log(item.key);
    error.current = "";
    const tagParam = tag.join("-");
    const path = "typeSearch/movie/type/" + item.key + "/?tag=" + tagParam;
    service.get(path, {}).then(
      //{}可以传参数
      // {
      //   params: {
      //     page: 3,
      //     per: 2,
      //   },
      //   headers: {},
      // }
      (resData)=>{
        data.current = resData.data.data;
        setType(item.key);
      }
    ).catch(
      err => { error.current = err.message; }
    )
  };

  // const itemClick = (item)=>{
  //   const isIn = type.some((value) => {
  //     return value === item.key;
  //   })
  //   if(!isIn){
  //     const newType = [...type]
  //     newType.push(item.key);
  //     setType(newType);
  //   }
  // };
  console.log(data.current);
  console.log(error.current);
  return (
    
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal" //垂直
          defaultSelectedKeys={['2']} //初始选中的菜单项 key 数组
          items={items}
          onClick={typeClick.bind(this)}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
          background: 'yellow',
        }}
      >
        <Row>
          <Col span={12}>1</Col>
          <Col span={12}>2</Col>
        </Row>
        <Row>
          <Col span={12}>3</Col>
          <Col span={12}>4</Col>
        </Row>
        <Row>
          <Col span={12}>5</Col>
          <Col span={12}>6</Col>
        </Row>
        <Row>
          <Col span={12}>7</Col>
          <Col span={12}>8</Col>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
      <div>{data.current[0].name}</div>
    </Layout>
  );
};

export default HomePage;