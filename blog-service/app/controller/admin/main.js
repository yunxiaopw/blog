'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {

    // 检测登录
    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'";
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            let openId = new Date().getTime();
            this.ctx.session.openId = { 'openId': openId };
            this.ctx.body = { 'data': '登录成功', "openId": openId }
        } else {
            this.ctx.body = { 'data': '登录失败' }
        }
    }

    //后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    // 添加文章
    async addArticle() {
        let tmpArticle = this.ctx.request.body //取得前端数据
        const result = await this.app.mysql.insert('article', tmpArticle) //存入数据库
        const insertSuccess = result.affectedRows === 1 //返回了一行说明成功
        const insertId = result.insertId

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    // 修改文章
    async updateArticle() {
        let tmpArticle = this.ctx.request.body //取得前端数据
        const result = await this.app.mysql.update('article', tmpArticle) //存入数据库
        const updateSuccess = result.affectedRows === 1 //返回了一行说明成功

        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    // 获取文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '

        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }
    }

    // 文章删除
    async delArticle() {
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }

    // 修改文章
    async getArticleById() {
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
}
module.exports = MainController;