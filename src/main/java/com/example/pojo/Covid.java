package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Covid {
    private String provinceCode;
    private String provinceName;
    private String cityCode;
    private String cityName;
    private Integer confirmedAdd;
    private Integer confirmedCount;
    private Integer curedCount;
    private Integer deadCount;
    private Date updateTime;
    private Integer addCount;
}
