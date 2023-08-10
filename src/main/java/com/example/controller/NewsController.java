package com.example.controller;

import com.example.pojo.Count;
import com.example.pojo.NewsInfo;
import com.example.service.NewsService;
import com.example.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin
@RestController
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping("/news")
    public Result getNewCount(){
        List<NewsInfo> list = newsService.getNewsCount();
        return Result.success(list);
    }
    @GetMapping("/days")
    public Result getDayCount(){
        List<NewsInfo> list = newsService.getDayCount();
        return Result.success(list);
    }

    @GetMapping("/count")
    public Result getCount(){
        List<Count> list = newsService.getCount();
        return Result.success(list);
    }
}
