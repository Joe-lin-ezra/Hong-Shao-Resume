package com.backend.server.securities.xss;

import org.apache.commons.io.IOUtils;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
public class XSSFilter{
//public class XSSFilter implements Filter {

//  @Override
//  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//          throws IOException, ServletException {
//
//    XSSRequestWrapper wrappedRequest = new XSSRequestWrapper((HttpServletRequest) request);
//
//    String body = IOUtils.toString(wrappedRequest.getReader());
//
//    if (!body.isBlank()) {
//      body = XSSUtils.stripXSS(body);
//      wrappedRequest.resetInputStream(body.getBytes());
//    }
//    chain.doFilter(wrappedRequest, response);
//  }
//  // other methods

}
