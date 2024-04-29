//-------------------------FINAL CODE----------------------------------------------------
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FetchAPI = () => {
    const [userData, setUserData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); 

    useEffect(() => {
        fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
            .then(response => response.json())
            .then(data => setUserData(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index); 
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null); 
    };

    return (
        <Container className="py-4" style={{ backgroundColor: '#f5f5f5' }}> 
            <Row xs={1} md={2} lg={3} className="g-4">
                {userData.map((user, index) => (
                    <Col key={user.login.uuid}>
                        <Card
                            className={`border border-dark ${hoveredIndex === index ? 'border-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{ height: hoveredIndex === index ? 'auto' : 'fit-content', 
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}} 
                        >
                            <Card.Body className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3">
                                    <img
                                        src={hoveredIndex === index ? user.picture.large : user.picture.medium}
                                        alt="User"
                                        className="w-100 border border-dark"
                                    />
                                </div>
                                <div>
                                    <Card.Title className="mb-1" style={{ fontWeight: 'bold' }}>
                                      {`${user.name.first} ${user.name.last}`}
                                    </Card.Title> 
                                    <Card.Text className="mb-2">{`Gender: ${user.gender}`}</Card.Text>
                                    <Card.Text>{`Phone: ${user.phone}`}</Card.Text>

                                    {hoveredIndex === index && (
                                        <div style={{ height: 'auto' }} >
                                            <p>{`Cell: ${user.cell}`}</p>
                                            <p>Email: {user.email}</p>
                                            <p>Address: {`${user.location.street.number}, 
                                                        ${user.location.street.name}, 
                                                        ${user.location.city}, 
                                                        ${user.location.state}, 
                                                        ${user.location.country}, 
                                                        ${user.location.postcode}`}
                                            </p>
                                            <p>Date Of Birth: {`${user.dob.date.substring(0, 10)}, 
                                                          (Age: ${user.dob.age})`}
                                            </p>
                                            <p>Nationality: {user.nat}</p>
                                            <p>Registered Since: {user.registered.age} years</p>
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FetchAPI;



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ TRIED TO SHOW MAP USING REACT MAP GL, But Errors on MouseOver ^^^^^^^^^^^^^^^^^^^^^^^^^^
// import React, { useState, useEffect } from 'react';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactMapGL, { Marker } from 'react-map-gl';

// const FetchAPI = () => {
//     const [userData, setUserData] = useState([]);
//     const [hoveredIndex, setHoveredIndex] = useState(null); 
//     const [viewport, setViewport] = useState({
//         width: '100%',
//         height: 400,
//         latitude: 0, 
//         longitude: 0, 
//         zoom: 2, 
//     });

//     useEffect(() => {
//         fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
//             .then(response => response.json())
//             .then(data => {
//                 setUserData(data.results);
//                 if (data.results.length > 0) {
//                     const user = data.results[0];
//                     setViewport(prevViewport => ({
//                         ...prevViewport,
//                         latitude: parseFloat(user.location.coordinates.latitude),
//                         longitude: parseFloat(user.location.coordinates.longitude),
//                     }));
//                 }
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     const handleMouseEnter = (index) => {
//         setHoveredIndex(index); 
//     };

//     const handleMouseLeave = () => {
//         setHoveredIndex(null); 
//     };

//     return (
//         <Container className="py-4">
//             <Row xs={1} md={2} lg={3} className="g-4">
//                 {userData.length > 0 && userData.map((user, index) => (
//                     <Col key={user.login.uuid}>
//                         <Card
//                             className={`border border-dark ${hoveredIndex === index ? 'border-2' : ''}`}
//                             onMouseEnter={() => handleMouseEnter(index)}
//                             onMouseLeave={handleMouseLeave}
//                             style={{ height: hoveredIndex === index ? 'auto' : 'fit-content', 
//                                     width: hoveredIndex === index ? 'auto' : 'fit-content' }}
//                         >
//                             <Card.Body className="d-flex align-items-center">
//                                 <div className="flex-shrink-0 me-3">
//                                     <img
//                                         src={hoveredIndex === index ? user.picture.large : user.picture.medium}
//                                         alt="User"
//                                         className="w-100 border border-dark"
//                                     />
//                                 </div>
//                                 <div>
//                                     <Card.Title className="mb-1">{`${user.name.first} ${user.name.last}`}</Card.Title>
//                                     <Card.Text className="mb-2">{`Gender: ${user.gender}`}</Card.Text>
//                                     <Card.Text>{`Phone: ${user.phone}`}</Card.Text>

//                                     {hoveredIndex === index && (
//                                         <div style={{ height: 'auto', width: 'auto' }}>
//                                             <ReactMapGL
//                                                 {...viewport}
//                                                 mapboxApiAccessToken={'pk.eyJ1IjoicHJhdmluMTA1MiIsImEiOiJjbHZrdzMwd3ExeXIzMmtuNTlyOWl6MWVyIn0._f17nxeR4nRzs_3xnCnStA'} // Replace with your Mapbox access token
//                                                 onViewportChange={setViewport}
//                                                 mapStyle="mapbox://styles/mapbox/streets-v11"
//                                             >
//                                                 <Marker
//                                                     latitude={parseFloat(user.location.coordinates.latitude)}
//                                                     longitude={parseFloat(user.location.coordinates.longitude)}
//                                                 >
//                                                     <div className="marker">📍</div>
//                                                 </Marker>
//                                             </ReactMapGL>
//                                             <p>{`Cell: ${user.cell}`}</p>
//                                             <p>Email: {user.email}</p>
//                                             <p>Address: {`${user.location.street.number}, 
//                                                         ${user.location.street.name}, 
//                                                         ${user.location.city}, 
//                                                         ${user.location.state}, 
//                                                         ${user.location.country}, 
//                                                         ${user.location.postcode}`}
//                                             </p>
//                                             <p>Date Of Birth: {`${user.dob.date.substring(0, 10)}, 
//                                                             (Age: ${user.dob.age})`}
//                                             </p>
//                                             <p>Nationality: {user.nat}</p>
//                                             <p>Registered Since: {user.registered.age} years</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default FetchAPI;