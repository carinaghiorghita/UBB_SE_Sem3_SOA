package com.soa.productmanagement.service;



import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.model.Book;

import java.util.List;

public interface BookService {

    List<Book> allBooks();

    Book findBookById(Long bookId);

    List<Order> findOrdersOfUser(Long userId);

    List<Order> findOrdersOfBook(Long bookId);

    Order saveOrder(Order order);
}
