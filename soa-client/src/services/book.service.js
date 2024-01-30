import axios from 'axios';

let API_URL = 'http://localhost:8765/api/book/service/';

class BookService {

  createOrder(order){
    return axios.post(API_URL + 'buy', JSON.stringify(order),
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterOrders(userId){
    return axios.get(API_URL + 'user/'+ userId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterClients(bookId){
    return axios.get(API_URL + 'book/' + bookId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  findBookById(bookId){
    return axios.get(API_URL + bookId,
        {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  findAllBooks(){
    return axios.get(API_URL + 'all',
    {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }
}
export default new BookService();
