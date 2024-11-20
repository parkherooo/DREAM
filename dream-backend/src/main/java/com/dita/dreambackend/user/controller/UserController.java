package com.dita.dreambackend.user.controller;

import com.dita.dreambackend.user.dto.UserDTO;
import com.dita.dreambackend.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @Operation(summary = "Get data", description = "Returns a greeting message with the provided name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the greeting"),
            @ApiResponse(responseCode = "400", description = "Invalid input parameter")
    })

    @PostMapping("/SignUp")
    public String getUser(@RequestBody UserDTO userDTO) {
        System.out.println("UserDTO: " + userDTO);
        return "index";
    }
}
