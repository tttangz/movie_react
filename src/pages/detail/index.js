import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from '../../request';
export default function Detail(){
    const location = useLocation();
    const { simpleData,detailData } = location.state;
    const navigate = useNavigate(); 
    const toMovieShow = (id,episode) => {
        const path = "s1/movieShow/id/" + id + "/?episode=" + episode;
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
            navigate('/movie',  {state: {id4url : resData.data.data}});
          }
        ).catch(
          (err) => { 
            console.log("function toMovieShow request error" + err.message);
          }
        )
    }
    return <div>
        <p>{simpleData.name}</p>
        <p>{detailData.introduction}</p>
        {()=>{
            for (let index = 0; index < simpleData.episodes; index++) {
                <span onClick={toMovieShow.bind(this,simpleData.id,index + 1)}>第<button>index + 1</button>集</span>
            }
        }}
    </div>
}