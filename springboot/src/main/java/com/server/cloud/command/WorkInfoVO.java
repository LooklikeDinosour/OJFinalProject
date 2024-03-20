package com.server.cloud.command;

import java.sql.Timestamp;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkInfoVO {

	
	private String work_num;
	private String work_filenum;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Timestamp work_date;
	private String work_division;
	@JsonFormat
	(shape = JsonFormat.Shape.STRING, pattern = "hh:mm", timezone = "Asia/Seoul")
	private Date work_time; // Time으로 바꾸면 정수꺼 에러남
	private String work_cpu;
	private String work_ram;
	private String work_hdd;
	private String work_status;
	private String work_note;
	private String work_estimate;
	private String server_id;
	private String eng_enid;
	private String pro_id;
	
    //작업세부목록시 필요
    private String eng_name;
    private String pro_name; //프로젝트명
    private String server_name; //서버 이름
    private String server_status;
	@Override
	public String toString() {
		return "WorkInfoVO [work_date=" + work_date + ", work_time=" + work_time + "]";
	}
    
    

	
	
}
