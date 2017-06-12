import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		this.props.fetchPost( this.props.match.params.id );
	}
	
	onDeleteClick() {
		this.props.deletePost( this.props.match.params.id, response => {
			this.props.history.push( '/' );
		} );
	}
	
	render() {
		if ( !this.props.post ) return <div>Loading...</div>
		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={ this.onDeleteClick.bind( this ) }
				>
					Delete Post
				</button>
				<h3>{ this.props.post.title }</h3>
				<h6>Categories: { this.props.post.categories }</h6>
				<p>{ this.props.post.content }</p>
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		post: state.posts[ownProps.match.params.id]
	};
}

export default connect( mapStateToProps, { fetchPost, deletePost } )( PostsShow );