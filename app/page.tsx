"use client";

import styles from './page.module.css'
import { islandInfo, getNearest2Times} from '../components/island/common'
import {Input, Row, Col, Select, Tag,InputNumber} from "antd";
import {useEffect, useState} from "react";




const islandOptions = islandInfo.map((info,index)=>({
    label:info.name,
    value:index,
}));


export default function Home() {
    const [currentIsland, setCurrentIsland] = useState(0);
    const [currentPower , setCurrentPower] = useState<number | null>(0);
    const [result, setResult] = useState([] as string[])
    useEffect(()=>{
        if(localStorage['currentIsland']){
            setCurrentIsland(+localStorage['currentIsland'])
        }
        if(localStorage['currentPower']){
            setCurrentPower(+localStorage['currentPower']);
        }

    },[]);

    useEffect(()=>{
            currentIsland && (localStorage['currentIsland'] = currentIsland)
        },
        [currentIsland]);
    useEffect(()=>{
        currentPower && (localStorage['currentPower'] = currentPower);
    },[currentPower])

    useEffect(()=>{
        if(currentPower){
            setResult(getNearest2Times(currentIsland, currentPower))
        }
    },[currentPower, currentIsland])
  return (
    <main className={styles.main}>
        <Row align={'middle'}>
            <Col span={6}>岛屿</Col>
            <Col span={6}><Select options={islandOptions} value={currentIsland} onSelect={v=>setCurrentIsland(v)}/></Col>
        </Row>
        <Row align={'middle'}>
            <Col span={6}>能量</Col>
            <Col span={6}><InputNumber<number> value={currentPower} onChange={v=>setCurrentPower(v)}/></Col>
        </Row>
        <Row>
            当前能量等级：{islandInfo[currentIsland].data.map(one=><Tag key={one}>{one}</Tag>)}
        </Row>
        <div>
            {result.map((one,index)=>(
                <div key={index} style={{marginBottom:10}}>{one}</div>
            ))}
        </div>
    </main>
  )
}
