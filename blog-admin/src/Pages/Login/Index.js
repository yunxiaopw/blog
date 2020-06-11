import React, { useState } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import servicePath from '../../config/apiUrl';
import axios from 'axios';
import 'antd/dist/antd.css';
import './index.css';

const Index = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const checkLogin = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空');
            setTimeout(()=>{
                setIsLoading(false);
            },500);
            return;
        }
        if (!password) {
            message.error('密码不能为空');
            setTimeout(()=>{
                setIsLoading(false);
            },500);
            return;
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: "post",
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true  //前后端共享session
        }).then(
            res => {
                setIsLoading(false);
                if (res.data.data !== "登录成功") {
                    message.error("用户名或密码错误");
                    return;
                }
                props.history.push('/admin/index');
            }
        )

    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="程序攀博客登录系统" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="useName"
                        size="large"
                        placeholder="请输入你的用户名"
                        prefix={<UserOutlined />}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入你的密码"
                        prefix={<KeyOutlined />}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={checkLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Index
