import React, { useState, useEffect } from 'react';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, VideoCameraOutlined, SmileOutlined } from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../../config/apiUrl'
import './index.css';

const Index = () => {
    const [navArray,setNavArray] = useState([]);
    const [key,setKey] = useState("0");
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                res =>{
                    return res.data.data;
                }
            )
            setNavArray(result)
        }
        fetchData();
    },[]);

    const handleClick = e => {
        if(e.key==0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key);
            setKey(e.key)
        }
        
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">程序攀</span>
                    <span className="header-txt">车轮滚滚向前</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" defaultSelectedKeys={key} onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            博客首页
                        </Menu.Item>
                        <Menu.Item key="1">
                            <VideoCameraOutlined />
                            视频教程
                        </Menu.Item>
                        <Menu.Item key="2">
                            <SmileOutlined />
                            生活拍档
                    </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Index;
