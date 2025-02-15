package com.example.demo.controller;

import com.example.demo.DTO.ContentCreationDTO;
import com.example.demo.model.ContentCreation;
import com.example.demo.service.ContentCreationRepository;
import com.example.demo.service.MapStruct;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestControllerAdvice
@RestController
@RequestMapping("api/contentCreation")
@CrossOrigin
public class ContentCreationController {
    private static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    @Autowired
    private MapStruct mapper;

    @Autowired
    private ContentCreationRepository contentCreationRepository;

    @GetMapping("/allContentCreations")
    public ResponseEntity<List<ContentCreationDTO>> getContentCreations() {
        try {
            List<ContentCreation> contentCreations = contentCreationRepository.findAll();
            if (contentCreations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            List<ContentCreationDTO> dtoList = mapper.contentCreationToContentCreationDTO(contentCreations);
            return new ResponseEntity<>(dtoList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/contentCreationById/{id}")
    public ResponseEntity<ContentCreation> getContentCreationById(@PathVariable Long id) {
        try {
            ContentCreation contentCreation = contentCreationRepository.findById(id).orElse(null);
            if (contentCreation == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(contentCreation, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("getDTO/{id}")
    public ResponseEntity<ContentCreationDTO> getContentCreationDTO(@PathVariable Long id) {
        try {
            ContentCreation contentCreation = contentCreationRepository.findById(id).orElse(null);
            if (contentCreation == null)
                return new ResponseEntity<>(mapper.contentCreationToContentCreationDTO(contentCreation), HttpStatus.OK);
            else
                return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addContentCreation")
    public ResponseEntity<ContentCreation> addContentCreation(@RequestBody ContentCreation contentCreation) {
        try {
            ContentCreation newContentCreation = contentCreationRepository.save(contentCreation);
            return new ResponseEntity<>(newContentCreation, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addContentCreationImage")
    public ResponseEntity<ContentCreationDTO> addContentCreationImage(@RequestPart("ContentCreation") String contentCreationJson, @RequestPart("file") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ContentCreation contentCreation = objectMapper.readValue(contentCreationJson, ContentCreation.class);
            String content = DIRECTORY_URL + file.getOriginalFilename();
            String contentType = file.getContentType();

            if (contentType != null) {
                if (contentType.startsWith("image/"))
                    contentCreation.setWhichFile("image");
                else if (contentType.startsWith("video/"))
                    contentCreation.setWhichFile("video");
            } else {
                contentCreation.setWhichFile(null);
            }

            Path filePath = Paths.get(content);
            Files.write(filePath, file.getBytes());
            contentCreation.setContent(content);
            ContentCreation savedContentCreation = contentCreationRepository.save(contentCreation);
            ContentCreationDTO newContentCreation = mapper.contentCreationToContentCreationDTO(contentCreationRepository.findById(savedContentCreation.getId()).orElse(null));

            return new ResponseEntity<>(newContentCreation, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/updateContentCreation/{id}")
    public ResponseEntity<ContentCreation> updateContentCreation(@RequestBody ContentCreation contentCreation, @PathVariable Long id) {
        try {
            ContentCreation categories = contentCreationRepository.findById(id).orElse(null);
            if (contentCreation.getId() != id)
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            if (categories == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            ContentCreation updatedContentCreation = contentCreationRepository.save(contentCreation);
            return new ResponseEntity<>(updatedContentCreation, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteContentCreation/{id}")
    public ResponseEntity<ContentCreation> deleteCourse(@PathVariable Long id) {
        try {
            ContentCreation contentCreation = contentCreationRepository.findById(id).orElse(null);
            if (contentCreation == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            contentCreationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}