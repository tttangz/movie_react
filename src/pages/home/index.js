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
import { Layout, Menu, Col, Row, FloatButton  } from 'antd';
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
  getItem('动画', '1', <AppstoreOutlined />),
  getItem('非动画', '2', <AppstoreOutlined />),
];
const HomePage = () => {
  //const navigate = useNavigate()  跳转navigate(page)跳转是对应react的页面跳转。
  const [type,setType] = useState('1');
  const [tag,setTag] = useState(['3']);
  const [isControlShow, setControlShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let data = useRef([]);
  useEffect(() => {
    const path = "typeSearch/movie/type/" + 1;
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
        setIsLoading(false);
      }
    ).catch(
      (err) => { 
        console.log(err.message)
      }
    )
    }, []);
  
  const typeClick = (item)=>{
    if (type === item.key) {
      return;
    }
    const tagParam = tag.join("-");
    const path = "typeSearch/movie/type/" + item.key
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
      (err) => { 
        console.log(err.message)
      }
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

  const cols = [];
  for (let i = 0; i < data.current.length; i++) {
    cols.push(
      <Col key={i.toString()} span={6} style={{border:"solid 1px", height:"200px"}}>
        <div>{data.current[i].name}</div>
      </Col>,
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout className="layout">
      <FloatButton onClick={()=>{setControlShow(true)}} />
      <div style={{
          display: isControlShow ? 'block' : 'none',
          width: "80%",
          height: "60%",
          position: "absolute",
          top: "50%",
          left: "50%", 
          transform: "translate(-50%,-50%)",
        }}
        onBlur={()=>{setControlShow(false)}}  
      >


      </div>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal" //垂直
          defaultSelectedKeys={['1']} //初始选中的菜单项 key 数组
          items={items}
          onClick={typeClick.bind(this)}
        />
      </Header>
      <Content>
        <Row gutter={[32,32]}>
          {cols}
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomePage;