import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 const container = document.getElementById('root');

        const data = {
            post: {
                id: 123,
                content:
                'Post Principal',
                user: 'Alejandro'
            },
            comments: [
                {
                    id: 0,
                    user: 'Usuario Prueba',
                    content: 'hola.'
                }
            ]
        };



        class Post extends React.Component {
            render() {
                return React.createElement(
                    'div',
                    {
                        className: 'post'
                    },
                    React.createElement(
                        'h2',
                        {
                            className: 'postAuthor',
                            id: this.props.id
                        },
                        this.props.user,
                        React.createElement(
                            'span',
                            {
                                className: 'postBody'
                            },
                            this.props.content
                        )
                    ),
                    this.props.children
                );
            }
        }

        Post.propTypes = {
            user: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
            id: React.PropTypes.number.isRequired
        };

        class Comment extends React.Component {
            render() {
                return React.createElement(
                    'div',
                    {
                        className: 'comment'
                    },
                    React.createElement(
                        'h2',
                        {
                            className: 'commentAuthor'
                        },
                        this.props.user,
                        React.createElement(
                            'span',
                            {
                                className: 'commentContent'
                            },
                            this.props.content
                        )
                    )
                );
            }
        }

        Comment.propTypes = {
            id: React.PropTypes.number.isRequired,
            content: React.PropTypes.string.isRequired,
            user: React.PropTypes.string.isRequired
        };

        class CreateComment extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    content: '',
                    user: ''
                };
                this.handleUserChange = this.handleUserChange.bind(this);
                this.handleTextChange = this.handleTextChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            handleUserChange(event) {
                this.setState({
                    user: event.target.value
                });
            }

            handleTextChange(event) {
                this.setState({
                    content: event.target.value
                });
            }

            handleSubmit(event) {
                event.preventDefault();
                this.props.onCommentSubmit({
                    user: this.state.user.trim(),
                    content: this.state.content.trim()
                });
                this.setState({
                    user: '',
                    text: ''
                });
            }

            render() {
                return React.createElement(
                    'form',
                    {
                        className: 'createComment',
                        onSubmit: this.handleSubmit
                    },
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Your name',
                        value: this.state.user,
                        onChange: this.handleUserChange
                    }),
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Thoughts ?',
                        onChange: this.handleTextChange
                    }),
                    React.createElement('input', {
                        type: 'submit',
                        value: 'Post'
                    })
                );
            }

        }

        CreateComment.propTypes = {
            content: React.PropTypes.string
        };


        class CommentBox extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    comments: this.props.comments
                };
                this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
            }
            handleCommentSubmit(comment) {
                const comments = this.state.comments;
                comment.id = Date.now();
                const newComments = comments.concat([comment]);
                this.setState({
                    comments: newComments
                });
            }
            render() {
                return React.createElement(
                    'div',
                    {
                        className: 'commentBox'
                    },
                    React.createElement(Post, {
                        id: this.props.post.id,
                        content: this.props.post.content,
                        user: this.props.post.user
                    }),
                    this.state.comments.map(function (comment) {
                        return React.createElement(Comment, {
                            key: comment.id,
                            id: comment.id,
                            content: comment.content,
                            user: comment.user
                        });
                    }),
                    React.createElement(CreateComment, {
                        onCommentSubmit: this.handleCommentSubmit
                    })
                );
            }
        }





        const App = React.createElement(CreateComment)

        ReactDOM.render(
            React.createElement(CommentBox,{
                comments: data.comments,
                post:data.post
            }),
            container
        );