package com.server.cloud.security;

import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.JWTVerifier;

import io.jsonwebtoken.SignatureAlgorithm;


public class JWTService {

//	 public static String getEnvironmentVariable(String variableName) {
//		    String value = System.getenv(variableName);
//
//		    System.out.println(variableName);
//
//		    if (value == null) {
//		        // 환경 변수가 존재하지 않는 경우 또는 값이 비어 있는 경우에 대한 처리를 여기에 추가할 수 있습니다.
//		        // 예를 들어, 기본값을 설정하거나 예외를 throw할 수 있습니다.
//		        throw new IllegalArgumentException("환경 변수 " + variableName + "가 설정되지 않았습니다.");
//		    }
//		    return value;
//		}
//	 
//	 static String secret = getEnvironmentVariable("secret_key");
	
	static String secret = "ojijoGood!!";
	
//	@Value("${jwt_secret_key}")
//	private static String secret;


	
	//토큰생성
		public static String createToken(MyUserDetails userDetails) {
			//알고리즘 생성
			Algorithm alg= Algorithm.HMAC256(secret);
			
			
	

			//만료시간
			long expire=System.currentTimeMillis()+360000000;//1시간뒤 토큰 만료시간은 
			//토큰생성
			Builder builder=JWT.create().withSubject(userDetails.getUsername())//주제
										.withIssuedAt(new Date())//발행일 
										.withExpiresAt(new Date(expire))//만료시간
										.withIssuer("baek")//발행자
										.withClaim("role", userDetails.getRole()); //+공개클래임 클레임은 페이로드에 적히는 이름을 말한다.
										
			return builder.sign(alg);//빌더 객체 생성
			
		}
		
		//토큰의 유효성 확인
		public static  boolean validateToken(String token) throws JWTVerificationException{//throws JWTVerificationException을 해야됨!그래야 실패를 알수있음
			
			Algorithm alg= Algorithm.HMAC256(secret);//생성한거 비교해보면 됨~
			
			JWTVerifier verifier= JWT.require(alg).build();//token을 검증할 객체


			
			verifier.verify(token);//토큰검사 - 만료기간 or 토큰위조가 발생하면 throws처리 된다.
			
			return true;//토큰검사 - 검증성공시 true,실패시 false
			
			
		}
		
	 
	 
}
