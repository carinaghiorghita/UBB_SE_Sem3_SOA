import React from 'react';
import BookService from '../../services/book.service';

export default class DefaultPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            book: JSON.parse(localStorage.getItem('currentBook')),
            clients: [],
        };
    }

    componentDidMount() {
        this.findClientsOfCar();
    }

    findClientsOfCar() {
        BookService.filterClients(this.state.id).then(clients => {
            this.setState({clients: clients.data});
        });
    }

    render() {
        const {clients} = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Book: {this.state.book.name}</h1>
                    <h4>Book description: {this.state.book.description}</h4>
                    <h4>Book price: {this.state.book.price}</h4>
                </div>
                <div><h5>Clients that bought this book so far:</h5></div>
                {clients.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) =>
                            <tr key={client}>
                                <th scope="row">{index + 1}</th>
                                <td>{client}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {clients.length === 0 &&
                    <div>No user has bought this item so far</div>
                }
            </div>
        );
    }

}
