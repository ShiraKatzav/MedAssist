import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Typography, Container } from "@mui/material";
import { listOfSpecialistRequest, sendMail, deleteRequest } from "../redux/slicers/specialistRequestsSlicer";

function SpecailistsRequests() {
    const dispatch = useDispatch();
    const allRequests = useSelector((state) => state.specialistRequest?.allSpecialistRequests);
    const status = useSelector((state) => state.specialistRequest.status);
    const user = JSON.parse(localStorage.getItem('userLogin'));


    useEffect(() => {
        if (status === 'idle') {
            dispatch(listOfSpecialistRequest(user.id));
        }
    }, [dispatch, status, user]);

    
    
    const handleResponeYes = async (request) => {
        if (request.requesterEmail && request.requesterEmail !== " ") {
            const email = {
                recipient: request.requesterEmail,
                subject: "בקשתך בטיפול",
                msgBody: `באפשרותך ליצור קשר עם המתנדב שלנו ${user.email}בטלפון או במייל ${user.phone} `,
            };
            await dispatch(sendMail(email));

        } else {
            console.log("user didnt want email please arrive :", request.requesterEmail);
        }
        const response = await dispatch(deleteRequest(request.id));
        console.log("Response from delete:", response);
        alert("תודה על הענות לעזרה");
    }

    const handleResponeNo = async (request) => {
        if (request.requesterEmail && request.requesterEmail !== " ") {
            const email = {
                recipient: request.requesterEmail,
                subject: "אנחנו מצטערים",
                msgBody: "):המתנדב לא יכל לעזור",
            };

            await dispatch(sendMail(email));

        } else {

            console.log("user didnt want email please arrive :", request.requesterEmail);

        }

        const response = await dispatch(deleteRequest(request.id));
        console.log("Response from delete:", response);
        alert("תודה על הענות לעזרה");

    }



    if (status === 'loading') {
        return <p>טעינה...</p>;

    }
    return (
        <>
            <Container>
                <h1 style={{ fontWeight: 'bold', color: '#2c6e49', marginBottom: '5%', textAlign: 'center', marginLeft: '50%', marginTop: '3%' }}>
                    הבקשות  שלך
                </h1>
                {/* show all requests */}
                <Container style={{ marginLeft: '80%', padding: '20px', backgroundColor: '#f0f8f4', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '30px' }}>
                    {allRequests && allRequests.length > 0 ? (
                        allRequests.map((request) => (
                            <Card key={request.id} sx={{ padding: '15px', marginBottom: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Typography variant="h6" sx={{ color: '#2c6e49', fontWeight: 'bold' }}>
                                    שלום , מישהו זקוק לעזרתך. אם תוכל לעזור, לחץ כן. אם לא, לחץ לא:
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#2c6e49', marginBottom: '10px' }}>
                                    {"הוא גר ב: " + request.requesterAddress}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <Button
                                        onClick={() => handleResponeYes(request)}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#2c6e49',
                                            color: '#fff',
                                            padding: '8px 15px',
                                            '&:hover': { backgroundColor: '#4caf50' },
                                        }}
                                    >
                                        כן
                                    </Button>
                                    <Button
                                        onClick={() => handleResponeNo(request)}
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#2c6e49',
                                            color: '#2c6e49',
                                            padding: '8px 15px',
                                            '&:hover': { borderColor: '#4caf50', color: '#4caf50' },
                                        }}
                                    >
                                        לא
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ color: '#2c6e49', textAlign: 'center' }}>
                            לא נמצאו בקשות
                        </Typography>
                    )}
                </Container>
            </Container>
        </>
    );
}

export default SpecailistsRequests;
