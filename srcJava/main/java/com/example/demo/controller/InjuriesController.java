
package com.example.demo.controller;

import com.example.demo.DTO.InjuriesDTO;
import com.example.demo.model.Injuries;
import com.example.demo.model.Users;
import com.example.demo.service.InjuriesReposirory;
import com.example.demo.service.UsersCanHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/injuries")
@CrossOrigin
public class InjuriesController {

    @Autowired
    private UsersCanHelp usersCanHelp;
    @Autowired
    private InjuriesReposirory injuriesRepository;

    @GetMapping("/allInjuriess")
    public ResponseEntity<List<Injuries>> getInjuriess(){
        try {
            List<Injuries> injuries = injuriesRepository.findAll();
            return new ResponseEntity<>(injuries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/injuriesById/{id}")
    public ResponseEntity<Injuries> getInjuriesById(@PathVariable Long id) {
        try {
            Injuries injuries = injuriesRepository.findById(id).orElse(null);
            if (injuries == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(injuries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addInjuries")
    public ResponseEntity<Injuries> addInjuries(@RequestBody Injuries injuries) {
        try {
            Injuries newInjuries = injuriesRepository.save(injuries);
            return new ResponseEntity<>(newInjuries, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateInjuries/{id}")
    public ResponseEntity<Injuries> updateInjuries(@RequestBody Injuries injuries,@PathVariable Long id) {
        try {
            Injuries categories = injuriesRepository.findById(id).orElse(null);
            if(injuries.getId() != id)
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            if (categories == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            Injuries updatedInjuries = injuriesRepository.save(injuries);
            return new ResponseEntity<>(updatedInjuries, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteInjuries/{id}")
    public ResponseEntity<Injuries> deleteCourse(@PathVariable Long id) {
        try {
            Injuries injuries = injuriesRepository.findById(id).orElse(null);
            if(injuries == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            injuriesRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/findUsersByInjuries")
    public ResponseEntity<List<Users>> findUsersByInjuries(@RequestBody InjuriesDTO injuryDTO) {
        try {
            Injuries injury = new Injuries();
            injury.setId(injuryDTO.getId());
            injury.setName(injuryDTO.getName());
            injury.setSpecialization(injuryDTO.getSpecialization());
            String address = injuryDTO.getAddress();
            List<Users> users = usersCanHelp.findSpecialists(address, injury);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}