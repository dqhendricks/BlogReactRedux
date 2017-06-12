import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	
	renderField( field ) {
		const className = `form-group${ field.meta.touched && field.meta.error ? ' has-danger' : '' }`;
		
		return(
			<div className={ className }>
				<label>{ field.label }</label>
				<input className="form-control" type="text" { ...field.input } />
				<div className="text-help">{ field.meta.touched ? field.meta.error : '' }</div>
			</div>
		);
	}
	
	onSubmit( values ) {
		this.props.createPost( values, response => {
			// "response" contains the resolved server response
			this.props.history.push( '/' );
		} );
	}
	
	render() {
		return (
			<form onSubmit={ this.props.handleSubmit( this.onSubmit.bind( this ) ) }>
				<Field
					name="title"
					component={ this.renderField }
					label="Title"
				/>
				<Field
					name="categories"
					component={ this.renderField }
					label="Categories"
				/>
				<Field
					name="content"
					component={ this.renderField }
					label="Content"
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link className="btn btn-primary" to="/" style={ { marginLeft: "5px" } }>Cancel</Link>
			</form>
		);
	}
}

function validate( values ) {
	const errors = {};
	// naming errors properties after field name provides error message to field's component for display
	if ( !values.title ) errors.title = 'You must enter a title.';
	if ( !values.categories ) errors.categories = 'You must enter categories.';
	if ( !values.content ) errors.content = 'You must enter content.';
	return errors;
}

export default reduxForm( {
	form: 'PostsNewForm', // form state namespace
	validate // wires up validation
} )(
	connect( null, { createPost } )( PostsNew )
);