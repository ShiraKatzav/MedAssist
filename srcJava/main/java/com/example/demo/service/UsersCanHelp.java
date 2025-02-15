package com.example.demo.service;

import com.example.demo.model.Injuries;
import com.example.demo.model.Specialization;
import com.example.demo.model.Users;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UsersCanHelp {


    @Autowired
    private UsersRepository usersRepository;

    public List<Users> findSpecialists(String userAddress, Injuries injury) {
        List<Users> specialists = new ArrayList<>();
        List<Users> filteredSpecialists = new ArrayList<>();
        String[] correntAddress = userAddress.split(",");
        String address = (correntAddress.length >1) ? correntAddress[1] : correntAddress[0];


        if (injury != null) {
            Specialization specialization = injury.getSpecialization();
            if (specialization != null) {
                specialists = usersRepository.findBySpecialization(specialization);
                for (Users user : specialists) {

                    String[] devideAddress = user.getAddress().split(",");
                    if (devideAddress.length >= 2) {
                        if (address.contains(devideAddress[1])||devideAddress[1].contains(address)) {
                            filteredSpecialists.add(user);
                        }
                    } else {
                        if (address.contains(devideAddress[0])||devideAddress[0].contains(address)) {
                            filteredSpecialists.add(user);
                        }
                    }
                }

             if (filteredSpecialists.size() == 0) {
                 filteredSpecialists= specialists;
             }
            filteredSpecialists.sort(Comparator.comparing(user ->{
                try{
                   JSONObject distanceData=DistanceMatrix.getDistance(userAddress,user.getAddress());
                   JSONObject element=distanceData.getJSONArray("rows").getJSONObject(0).getJSONArray("elements").getJSONObject(0);
                   double distance=element.getJSONObject("distance").getDouble("value");

                   return distance;
                }
                catch(Exception e){
                    System.out.println(e.getMessage());
                    e.printStackTrace();
                    return Double.MAX_VALUE;
                }
            }));


            }
        }

            return filteredSpecialists; // מחזירים את המתמחים ממוינים לפי הקרבה

    }



}
