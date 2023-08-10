package com.example.controller;

import com.example.pojo.ConfirmedValue;
import com.example.pojo.Covid;
import com.example.service.CovidService;
import com.example.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class CovidController {
    @Autowired
    private CovidService covidService;

    @GetMapping("/dead")
    public Result getDead(){
        Double dead = covidService.getDead();
        return Result.success(dead);
    }

    @GetMapping("/add")
    public Result getAdd(){
        List<Covid> list = covidService.getAdd();
        return Result.success(list);
    }

    @GetMapping("/confirmed")
    public Result getCount(){
        List<List<Double>> list = covidService.getCount();
        return Result.success(list);
    }
}
