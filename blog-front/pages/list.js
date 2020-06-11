import React, { useState, useEffect } from 'react';
import { Row, Col, List, Breadcrumb } from 'antd';
import { CalendarOutlined,
          FolderOutlined,
          FireOutlined} from '@ant-design/icons';
import Header from '../components/Header/Index';
import Author from '../components/Author/Index';
import Advert from '../components/Advert/Index';
import Footer from '../components/Footer/Index';
import '../static/style/pages/index.css';
import servicePath from '../config/apiUrl';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

const MyList = (list) => {

  const [ myList,setMyList ] = useState(list.data);

  useEffect(()=>{
    setMyList(list.data)
  })

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">博客首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById+id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise;
}

export default MyList
