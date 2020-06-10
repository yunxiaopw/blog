import React from 'react';
import './index.css';
import { Row,Col,Menu } from 'antd';
import { HomeOutlined,VideoCameraOutlined,SmileOutlined } from '@ant-design/icons';

const Index = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">程序攀</span>
                <span className="header-txt">车轮滚滚向前</span>
            </Col>
            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <HomeOutlined />
                        博客首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <VideoCameraOutlined />
                        视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        <SmileOutlined />
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Index;
