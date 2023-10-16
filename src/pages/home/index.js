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
import PopBox from '../../utils/popBox';
const { Header, Content, Footer } = Layout;
const movieTags = {
  radioBox:[
    [{id:"3",name:"电影"},{id:"4",name:"连续剧"}]
  ],
  checkBox:[{id:"23",name:"战斗"},{id:"19",name:"热血"},{id:"25",name:"异世界"}]
};
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
  getItem('非动画', '1', <AppstoreOutlined />),
  getItem('动画', '2', <AppstoreOutlined />),
];
const HomePage = () => {
  //const navigate = useNavigate()  跳转navigate(page)跳转是对应react的页面跳转。
  const [type,setType] = useState('2');
  const [tag,setTag] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let data = useRef([]);
  let dataShow = useRef([]);
  //const tagCheckedRef = useRef({tagCheckedList:[]});
  // useEffect(()=>{
  //   //TODO
  //   console.log(tagCheckedRef.current.tagCheckedList);
  //   data.current = data.current.filter(item=>{
  //     return item.tag.includes(tagCheckedRef.current);
  //   });
  //   setTag(tagCheckedRef.current.tagCheckedList)
  // },[tagCheckedRef.current]);

  const radioClick = (id,index)=>{
    let tempTag;
    const nowRadioBox = movieTags.radioBox[index];
    let unCheckedId = [];
    nowRadioBox.forEach((item)=>{
      if(item.id !== id){
        unCheckedId.push(item.id);
      }
    });
    //已经有了则去掉，没有则添加（toggle）
    if(tag.includes(id)) {
      tempTag = tag.filter(item =>{
        return item !== id;
      });
    } else {
      tempTag = [...tag];
      tempTag.push(id);
      tempTag = tempTag.filter((tagId)=>{
        return !unCheckedId.includes(tagId);
      });
    }
    dataShow.current = dataFilter(tempTag);
    setTag(tempTag);
  }

  const checkClick = (id)=>{
    let tempTag;
    if(tag.includes(id)) {
      tempTag = tag.filter(item =>{
        return item !== id;
      });
    } else {
      tempTag = [...tag];
      tempTag.push(id);
    }
    dataShow.current = dataFilter(tempTag);
    setTag(tempTag);
  }

  //给当前页面加载的数据按照tag过滤
  const dataFilter = (tempTag) =>{
    if(tempTag.length === 0){
      return data.current;
    }

    return data.current.filter(item=>{
      if(item.tag === "null"){
        return true;
      }
      const itemTags = JSON.parse(item.tag);
      return tempTag.every((val) => itemTags.includes(val));
    });
  }
  useEffect(() => {
    const path = "typeSearch/movie/type/" + type;
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
        dataShow.current = data.current = resData.data.data;
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
        dataShow.current = dataFilter(tag);
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
  for (let i = 0; i < dataShow.current.length; i++) {
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
      <PopBox tags={movieTags} tagChecked={tag} radioClick={radioClick} checkClick={checkClick} />
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