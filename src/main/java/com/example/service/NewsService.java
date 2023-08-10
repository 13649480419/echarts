package com.example.service;

import com.example.pojo.Count;
import com.example.pojo.NewsInfo;

import java.util.List;

public interface NewsService {
    List<NewsInfo> getNewsCount();

    List<NewsInfo> getDayCount();

    List<Count> getCount();
}
