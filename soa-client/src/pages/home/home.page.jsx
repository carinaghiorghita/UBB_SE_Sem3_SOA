import React from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';
import BookService from "../../services/book.service";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User()
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data
            });
        });

        this.getAllBooks();
    }

    getAllBooks() {
        this.setState({
            books: {loading: true}
        });

        BookService.findAllBooks().then(books => {
            this.setState({books: books.data});
        });
    }

    buy(book) {
        if (!this.state.currentUser) {
            this.setState({errorMessage: 'To buy a book, you should sign in.'});
            return;
        }

        localStorage.setItem('currentBook', JSON.stringify(book));
        this.props.history.push('/payment/' + book.id);
    }

    detail(book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        this.props.history.push('/detail/' + book.id);
    }

    render() {
        const {books, infoMessage, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                {infoMessage &&
                    <div className="alert alert-success">
                        <strong>Successfull! </strong>{infoMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {errorMessage &&
                    <div className="alert alert-danger">
                        <strong>Error! </strong>{errorMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {books.loading && <em> Loading books...</em>}
                {books.length &&
                    <div style={{marginTop: 50}}>
                        <h2 style={{marginBottom: 60}}>Welcome to our website! Please choose your desired book from
                            our list:</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Author</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Price</th>
                                <th scope="col">Details</th>
                                <th scope="col">Discount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.map((book, index) =>
                                <tr key={book.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>${book.price}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => this.detail(book)}>Detail
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.buy(book)}>Buy
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }

}
