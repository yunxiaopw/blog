import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Row, Col, List } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header/Index';
import Author from '../components/Author/Index';
import Advert from '../components/Advert/Index';
import Footer from '../components/Footer/Index';
import '../static/style/pages/index.css';
import axios from 'axios';

const Home = (list) => {

  const [myList, setMyList] = useState(list.list)

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item =>(
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
    </>
  );
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios('http://localhost:7001/default/getArticleList').then(
      (res) => {
        console.log(res.data)
        resolve(res.data)
      }
    )
  })
  return await promise;
}

export default Home
