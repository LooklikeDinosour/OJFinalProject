package com.server.cloud.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {


	@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        System.out.println("===============JwtTuthorizationFilter실행됐습니다~===============>");

        // 헤더의 담긴 토큰이 유효성을 확인하고, 인증된 토큰이면 우리 서비스로 연결, 만료or위조인 경우 error메시지 반환
        
        String headers = request.getHeader("Authorization");
        // 헤더가 없거나 Bearer로 시작되지 않다면?

        String requestUri = request.getRequestURI();
        System.out.println(requestUri);
        if (requestUri.startsWith("/api/main/")) {
        	chain.doFilter(request, response);
            return;
        }
        
        if (headers == null || !headers.startsWith("Bearer ")) {
            response.setContentType("text/plain; charset=UTF-8;");
            response.sendError(403, "토큰 없음");
            return; // 함수종료 절대 해야됨
        }

        // 토큰의 유효성 검사
        try {
            boolean result = JWTService.validateToken(headers.substring(7) /*베어러 자른거 ㅋ*/);
            if (result) {// result==true면 정상토큰
                chain.doFilter(request, response);// 컨트롤러로 연결이 되는 함수
            } else {// 토큰이 만료됨
                // 처리
            }

        } catch (Exception e) {
            e.printStackTrace();
            // 토큰 위조나 만료겠죠~
            response.setContentType("text/plain; charset=UTF-8;");
            response.sendError(403, "토큰 위조");// 만료는 false가 나온당~
        }
    }
}
