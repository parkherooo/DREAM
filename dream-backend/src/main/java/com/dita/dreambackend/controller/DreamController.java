package com.dita.dreambackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DreamController {

    @GetMapping("")
    public String index() {
        return "index";
    }

    @GetMapping("/app/data")
    public String test() {
        return "Hello Dream Backend";
    }
}
