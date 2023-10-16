import {React, useRef , useState, useEffect } from 'react';
import { FloatButton  } from 'antd';


function PopBox(props){
    const [isControlShow, setControlShow] = useState(false);
    const boxDiv = useRef(null);
    const radioClick = props.radioClick;
    const checkClick = props.checkClick;
    const tagChecked = props.tagChecked;
    const radioBox = props.tags.radioBox;
    const checkBox = props.tags.checkBox;
    useEffect(()=>{
        boxDiv.current.focus();
    })

    // useImperativeHandle(tagCheckedRef, () => {
    //     // return返回的值就可以被父组件获取到,没返回的值就获取不到
    //     return {
    //         tagCheckedList:tagChecked
    //     }
    //   })
    
    // const tagClick = (id,e)=>{
    //     console.log(id)
    //     if(tagChecked.includes(id)) {
    //         setTagChecked(tagChecked.filter(item =>{
    //             return item !== id;
    //         }))
    //     } else {
    //         const tempTagChecked = [...tagChecked];
    //         tempTagChecked.push(id);
    //         setTagChecked(tempTagChecked);
    //     }
    // }
    let radioIndex= -1;
    const radioDiv =  radioBox.map(itemP=>{
        let checked = false;
        radioIndex ++;
        return <div key={'div'+radioIndex}>
            <p>●</p>
            {itemP.map(item=>{
                let isInclude = false;
                if (!checked) {
                    isInclude = tagChecked.includes(item.id);
                }
                if(isInclude){
                    checked = true;
                }
                return <div style={{zIndex:1001,display:"inline",width:"20px",height:"20px",border:"solid 1px",margin:"3px",background: isInclude?"blue":"white",}} key={item.id} onClick={radioClick.bind(this,item.id,radioIndex)}>{item.name}</div>
                
           })}
        </div>
    });

    const checkDiv =  <div>
        <p>■</p>
        {checkBox.map(item=>{
        return <div style={{zIndex:1001,display:"inline",width:"20px",height:"20px",border:"solid 1px",margin:"3px",background: tagChecked.includes(item.id)?"blue":"white",}} key={item.id} onClick={checkClick.bind(this,item.id)}>{item.name}</div>
        })}
    </div>
	

    return <>
    <div tabIndex="-1"  style={{
        display: isControlShow ? 'block' : 'none',
        width: "80%",
        height: "60%",
        position: "absolute",
        top: "50%",
        left: "50%", 
        transform: "translate(-50%,-50%)",
        background: "rgba(222,222,222,0.4)",
        zIndex: 1000,
      }} ref={boxDiv}
      onBlur={()=>{setControlShow(false)}}  
    >
        {radioDiv}
        {checkDiv}
    </div>
    <FloatButton onClick={()=>{setControlShow(true)}} />
    </>
}

//export default forwardRef(PopBox)
export default PopBox
