package com.example.demo.service;


import com.example.demo.DTO.ContentCreationDTO;
import com.example.demo.model.ContentCreation;
import com.example.demo.model.Injuries;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Base64;
import java.util.List;
import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Mapper(componentModel = "spring")
public interface MapStruct {
    List<ContentCreationDTO> contentCreationToContentCreationDTO(List<ContentCreation> contentCreation);
   default ContentCreationDTO contentCreationToContentCreationDTO(ContentCreation contentCreation) throws IOException {


       ContentCreationDTO contentCreationDTO = new ContentCreationDTO();
       contentCreationDTO.setId(contentCreation.getId());
       contentCreationDTO.setDate(contentCreation.getDate());
       contentCreationDTO.setMyUser(contentCreation.getMyUser());
       contentCreationDTO.setTitle(contentCreation.getTitle());
       contentCreationDTO.setWhichFile(contentCreation.getWhichFile());
       boolean isImage=isImageFile(contentCreation.getContent());
       if(isImage) {
           Path filePath = Paths.get(contentCreation.getContent());
           //contentCreationDTO.setImage(Files.readAllBytes(filePath));
           byte[] fileBytes = Files.readAllBytes(filePath);
           String base64Image = Base64.getEncoder().encodeToString(fileBytes);
           contentCreationDTO.setContent(base64Image);
       }
       else
           contentCreationDTO.setContent(contentCreation.getContent());
       return contentCreationDTO;

   }

    default boolean isImageFile(String fileName) {
       if(fileName!=null&&fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
            return true;
        }
        return false;
    }
}
