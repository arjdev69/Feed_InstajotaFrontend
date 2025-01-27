import React, { Component } from 'react';
import './New.css';
import api from '../services/api';
import ReactLoading from 'react-loading';

const Load = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'5%'} width={'20%'} />
);
class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        active: true
    };

    handleSubmit = async e => {
        this.setState({ active: false });
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <section>
                <form id="new-post" onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />

                    <input type="text" name="author" placeholder="Autor do post"
                        onChange={this.handleChange}
                        value={this.state.author}
                    />

                    <input type="text" name="place" placeholder="Local do post"
                        onChange={this.handleChange}
                        value={this.state.place}
                    />

                    <input type="text" name="description" placeholder="Descrição do post"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />

                    <input type="text" name="hashtags" placeholder="Hashtags do post"
                        onChange={this.handleChange}
                        value={this.state.hashtags}
                    />
                    
                    {this.state.active ? <button type="submit">Enviar</button> : <Load id="load" type="bars" color="blue" /> }
                </form>
            </section>
        );
    }
}

export default New;