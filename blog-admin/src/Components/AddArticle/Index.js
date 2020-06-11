import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import React, { useState, useEffect } from 'react';
import marked from 'marked';
import axios from 'axios'
import './index.css';
import servicePath from '../../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input;

const Index = (props) => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introduceMd, setIntroduceMd] = useState()            //简介的markdown内容
    const [introduceHtml, setIntroduceHtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别

    useEffect(() => {
        getTypeInfo()
    }, [])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }

    /**
     * 获取文字类别信息
     */
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                if (res.data.data == "没有登录") {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    const changeIntroduce = (e) => {
        setIntroduceMd(e.target.value);
        let html = marked(e.target.value);
        setIntroduceHtml(html);
    }

    const selectTypeHandler = (value) => {
        setSelectType(value);
    }

    const saveArticle = () => {
        if (selectedType === "请选择类型") {
            message.error('请选择文章类型');
            return;
        }
        if (!articleTitle) {
            message.error('文章标题不能为空');
            return;
        }
        if (!articleContent) {
            message.error('文章内容不能为空');
            return;
        }
        if (!introduceMd) {
            message.error('文章简介不能为空');
            return;
        }
        if (!showDate) {
            message.error('发布日期不能为空');
            return;
        }

        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introduceMd
        let dateText = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(dateText).getTime()) / 1000

        if (articleId == 0) {
            dataProps.view_count = 0;
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                }
            )
        }
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e => setArticleTitle(e.target.value)}
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                rows={30}
                                value={articleContent}
                                className="markdown-content"
                                placeholder="文章内容"
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                rows="4"
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            >
                            </TextArea>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introduceHtml }}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => { setShowDate(dateString) }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Index;