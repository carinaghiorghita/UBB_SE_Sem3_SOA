package com.soa.productmanagement.service;


import com.soa.productmanagement.model.Book;
import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.repository.BookRepository;
import com.soa.productmanagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book findBookById(Long bookId) {
        return bookRepository.findById(bookId).orElse(null);
    }

    @Override
    public List<Order> findOrdersOfUser(Long userId) {
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public List<Order> findOrdersOfBook(Long bookId) {
        return orderRepository.findAllByBookId(bookId);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
