import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header>
        <div className="collapse bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">关于我们</h4>
                <p className="text-muted">这是云南大学自建慕课——零基础学Python的作品展示网站.</p>
                <p className="text-muted">本课程是一门实践性很强的课程，既要掌握概念，又要动手编程。课程以在线开放课程的学习为主，见面讨论交流课为辅，突破了时空的界线，学生可以根据自身的时间和进度进行线上课程的学习，在学习的过程中，学生可以在线实时地与老师互动，与学员交流。同时，通过布置实训项目的方式，保障学生实践动手能力的培养，定期开展见面课，及时解决学生学习中遇到的问题，并督促学习进度。</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">联系我们</h4>
                <ul className="list-unstyled">
                  <li><a href="http://www.ynu.edu.cn" className="text-white">云南大学</a></li>
                  <li><a href="https://ynu.xuetangx.com/lms#/about/2170" className="text-white">零基础学编程——Python（2018春）</a></li>
                  <li><a href="https://ynuosa.org/" className="text-white">YNUOSA</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="http://www.ynu.edu.cn" className="navbar-brand d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              <strong>YNU</strong>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
