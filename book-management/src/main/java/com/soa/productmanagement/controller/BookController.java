package com.soa.productmanagement.controller;


import com.soa.productmanagement.intercomm.UserClient;
import com.soa.productmanagement.model.Order;
import com.soa.productmanagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BookController {

    @Autowired
    private UserClient userClient;

    @Autowired
    private BookService bookService;

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private Environment env;

    @Value("${spring.application.name}")
    private String serviceId;

    @GetMapping("/service/port")
    public String getPort() {
        return "Service is working at port : " + env.getProperty("local.server.port");
    }

    @GetMapping("/service/instances")
    public ResponseEntity<?> getInstances() {
        return ResponseEntity.ok(discoveryClient.getInstances(serviceId));
    }

    @GetMapping("/service/user/{userId}")
    public ResponseEntity<?> findTransactionsOfUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookService.findOrdersOfUser(userId));
    }

    @GetMapping("/service/all")
    public ResponseEntity<?> findAllBooks() {
        return ResponseEntity.ok(bookService.allBooks());
    }

    @GetMapping("/service/{bookId}")
    public ResponseEntity<?> findBookById(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.findBookById(bookId));
    }

    @PostMapping("/service/buy")
    public ResponseEntity<?> saveOrder(@RequestBody Order order) {
        order.setDateOfIssue(LocalDateTime.now());
        order.setBook(bookService.findBookById(order.getBook().getId()));
        return new ResponseEntity<>(bookService.saveOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/service/book/{bookId}")
    public ResponseEntity<?> findClientsOfBook(@PathVariable Long bookId) {
        List<Order> orders = bookService.findOrdersOfBook(bookId);
        if (CollectionUtils.isEmpty(orders)) {
            return ResponseEntity.notFound().build();
        }
        List<Long> userIdList = orders.parallelStream().map(Order::getUserId).collect(Collectors.toList());
        List<String> students = userClient.getUserNames(userIdList);
        return ResponseEntity.ok(students);
    }
}
