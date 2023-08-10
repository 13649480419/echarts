package com.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsInfo {
    private Date publishTime;
    private String newsTitle;
    private String newsSummary;
    private String newsSource;
    private Integer newsCount;
}
