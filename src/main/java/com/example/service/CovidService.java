package com.example.service;

import com.example.pojo.ConfirmedValue;
import com.example.pojo.Covid;

import java.util.List;

public interface CovidService {
    Double getDead();

    List<Covid> getAdd();

    List<List<Double>> getCount();
}
