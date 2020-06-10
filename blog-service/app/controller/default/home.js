'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(){    
    this.ctx.body = 'api hi';
  }

  async getArticleList() {
    let sql = 'SELECT article.id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                 'article.view_count as view_count ,'+
                 'article.introduce_html as introduce_html ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                 'WHERE article.isTop = 0  AND article.type_id <> 99 '+
                 'ORDER BY article.id DESC'
    const resList = await this.app.mysql.query(sql)
    this.ctx.body = {list:resList}
  }

  async getArticleById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT Id,type_id,title,article_content,'+
    'introduce,view_count,part_count,article_content_html ,introduce_html,'+
    "FROM_UNIXTIME(addTime,'%Y-%m-%d' ) as addTime"+
    ' FROM article WHERE id='+id
    const result = result = await this.app.mysql.query(sql);
    this.ctx.body = {list:result}

  }

}

module.exports = HomeController;