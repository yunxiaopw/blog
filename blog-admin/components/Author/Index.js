import { Avatar,Divider } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import './index.css';

const Index = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={ 100 } src="" />
            </div>
            <div className="author-introduction">
                React实战技术博客系统
                <Divider>社交账号</Divider>
                <Avatar size={28}>  
                    <GithubOutlined />
                </Avatar>
            </div>
        </div>
    )
}

export default Index;