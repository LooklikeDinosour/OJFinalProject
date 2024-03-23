package com.server.cloud.s3;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectsResponse;
import software.amazon.awssdk.services.s3.model.ListBucketsRequest;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
@Slf4j
@Component
@RequiredArgsConstructor
public class S3Service {

	
	@Value("${aws_access_key_id}")
	private String aws_access_key_id;

	@Value("${aws_secret_access_key}")
	private String aws_secret_access_key;

	@Value("${aws_bucket_name}")
	private String bucketName;

	private final S3Client s3;
	
	public void getBuketList() {
		
		ListBucketsRequest listBucketsRequest = ListBucketsRequest.builder().build();
		ListBucketsResponse listBucketsResponse = s3.listBuckets(listBucketsRequest);
		listBucketsResponse.buckets().stream().forEach(x -> System.out.println(x.name()));

	}
	
	public String putS3Object(String originName, byte[] originData) {
		// TODO Auto-generated method stub
		log.info("originName = {}", originName);
		//System.out.println(originName);
		try {
			Map<String, String>metaData=new HashMap<>();
			metaData.put("x-amz-meta-myVal", "test");
			PutObjectRequest putOb=PutObjectRequest.builder()
					.bucket(bucketName)
					.key(originName)
					.metadata(metaData)
					.build();
			
			PutObjectResponse response=s3.putObject(putOb, RequestBody.fromBytes(originData));
			String objectURI = "https://" + bucketName + ".s3.amazonaws.com/" + originName;
			return objectURI;
		} catch (Exception e) {
			e.printStackTrace();
		    return null;
		}
	}
	

	public void deleteBucketObjects(String name) {

		// Upload three sample objects to the specfied Amazon S3 bucket.
		ArrayList<ObjectIdentifier> keys = new ArrayList<>();

		System.out.println("==================>" + bucketName);
		System.out.println("==================>" + name);
		//삭제할 객체
		ObjectIdentifier objectId= ObjectIdentifier.builder()
				.key(name)
				.build();

		keys.add(objectId);

		// Delete multiple objects in one request.
		Delete del = Delete.builder()
				.objects(keys)
				.build();

		try {
			DeleteObjectsRequest multiObjectDeleteRequest = DeleteObjectsRequest.builder()
					.bucket(bucketName)
					.delete(del)
					.build();
			
			DeleteObjectsResponse result= s3.deleteObjects(multiObjectDeleteRequest);
			System.out.println("Multiple objects are deleted!");
			System.out.println(result.sdkHttpResponse().statusCode());
		} catch (S3Exception e) {
			System.err.println(e.awsErrorDetails().errorMessage());
			// System.exit(1);
		}
	}
	
}
