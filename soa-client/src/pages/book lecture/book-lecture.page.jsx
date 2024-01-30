import React from 'react';

export default class BookLecturePage extends React.Component {

    state = {
        books: [
            {name: "Anna Karenina", author: "Leo Tolstoy", date: "09.02.2023 18:00", link: "localhost:8080/chat"}
        ],
    };

    render() {
        const meetings = this.state;
        return (
            <div className="col-md-12">
                <div className="jumbotron">
                    <h1 className="display-4">Book Lecture Club</h1>
                    <h4>Welcome to the book lecture club. Here you can interact with other people at the same time.
                        Check the table below to see the links for book meetings</h4>
                </div>
                <div><h5>Click the link to open the chat:</h5></div>
                {meetings.books.length > 0 &&
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Book name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date</th>
                            <th scope="col">Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {meetings.books.map((book, index) =>
                            <tr key={book}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.date}</td>
                                <td><a href="http://localhost:8080/chat" target="_blank">Go to chat</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                {meetings.books.length === 0 &&
                    <div>No meetings scheduled so far</div>
                }
            </div>
        );
    }

}
